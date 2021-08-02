import { DeviceEventEmitter } from "react-native";
import Agent from "../base/Agent";
import Belief from "../base/Belief";
import { Fact } from "../model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getClinicianProtectedInfo, updateClinicianProtectedInfo } from "aws";
import {
  UpdateClinicianProtectedInfoInput,
  ClinicianProtectedInfo,
  ClinicianInfo
} from "aws/API";
import {
  ActionFrameIDs,
  AgentIDs,
  AppAttributes,
  AsyncStorageKeys,
  BeliefKeys,
  CommonAttributes
} from "../AgentEnums";

/**
 * Base class for management of active agents.
 */
abstract class AgentManagement {
  private agents: Agent[];

  private facts: Fact;

  /**
   * Constructor for the Agent Management System
   */
  constructor() {
    this.agents = [];
    this.facts = {};
    this.factFromDB();
  }

  /**
   * Retrieve saved state of facts from the database
   */
  async factFromDB(): Promise<void> {
    let factsSet = false;
    let protectedInfo: ClinicianProtectedInfo | null | undefined;

    try {
      // Retrieves local clinician
      const localClinicianStr = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN
      );
      if (localClinicianStr) {
        const localClinician: ClinicianInfo = JSON.parse(localClinicianStr);

        // Device is online
        if (this.facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          const result = await getClinicianProtectedInfo({
            clinicianID: localClinician.clinicianID
          });
          if (result.data.getClinicianProtectedInfo) {
            protectedInfo = result.data.getClinicianProtectedInfo;

            // Updates local storage
            localClinician.protectedInfo = protectedInfo;

            await AsyncStorage.mergeItem(
              AsyncStorageKeys.CLINICIAN,
              JSON.stringify(localClinician)
            );
          }
        } else {
          // Device is offline
          protectedInfo = localClinician.protectedInfo;
        }
      }

      if (protectedInfo) {
        const dbFacts = protectedInfo.facts;
        if (dbFacts && Object.entries(JSON.parse(dbFacts)).length > 0) {
          this.facts = JSON.parse(dbFacts);
          factsSet = true;
        }
      }

      if (!factsSet) {
        this.facts = {};
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  /**
   * Register the agent in the system
   * @param {Agent} agent - agent to be registered
   */
  registerAgent(agent: Agent): void {
    this.agents.push(agent);
  }

  /**
   * Get the specified agent
   * @param {string} agentID - identifier of the agent
   * @return {Agent} return the specified Agent class
   */
  getAgent(agentID: string): Agent | null {
    for (let i = 0; i < this.agents.length; i += 1) {
      if (this.agents[i].getID() === agentID) {
        return this.agents[i];
      }
    }
    return null;
  }

  /**
   * Unregister specified agent from the system
   * @param {string} agentID - identifier of the agent
   */
  unregisterAgent(agentID: string): void {
    for (let i = 0; i < this.agents.length; i += 1) {
      if (this.agents[i].getID() === agentID) {
        this.agents.splice(i, 1);
        break;
      }
    }
  }

  /**
   * Get all the registered agents
   */
  getAgents(): Agent[] {
    return this.agents;
  }

  /**
   * Add fact to system
   * @param {Belief} fact - fact(belief) to be inserted
   * @param {Boolean} broadcast - whether fact is to be broadcasted
   * @param {Boolean} updateDb - whether the local beliefs and facts should be written to database
   */
  async addFact(
    fact: Belief,
    broadcast: boolean = true,
    updateDb: boolean = false
  ): Promise<void> {
    try {
      // Clears intermediate attributes and values of actions
      if (fact.getValue() === null && fact.getKey() in this.facts) {
        delete this.facts[fact.getKey()][fact.getAttribute()];
      } else {
        if (!(fact.getKey() in this.facts)) {
          this.facts[fact.getKey()] = {};
        }
        this.facts[fact.getKey()][fact.getAttribute()] = fact.getValue();

        if (broadcast) {
          DeviceEventEmitter.emit("env", fact);
        }
      }

      if (updateDb) {
        await this.updateDbStates();
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  /**
   * Merge incoming facts into current facts.
   * This happen when an existing user signs in.
   * @param {Belief} facts
   */
  mergeFacts(facts: Belief): void {
    Object.entries(facts).forEach(([key, innerObj]) => {
      if (!(key in this.facts)) {
        this.facts[key] = innerObj;
      } else {
        Object.entries(innerObj).forEach(([attribute, value]) => {
          this.facts[key][attribute] = value;
        });
      }
    });
  }

  /**
   * Get all the facts
   * @return {{ [k: string]: { [k: string]: unknown } }} facts or state of the environment
   */
  getFacts(): Fact {
    return this.facts;
  }

  /**
   * Writes all local beliefs and facts to the database.
   * Usually called at the end of a series of agents' actions.
   */
  async updateDbStates(): Promise<void> {
    const isOnline: boolean | null =
      this.facts[BeliefKeys.APP]?.[AppAttributes.ONLINE];
    let protectedInfo: ClinicianProtectedInfo | null | undefined;

    const localClinicianStr = await AsyncStorage.getItem(
      AsyncStorageKeys.CLINICIAN
    );
    if (localClinicianStr) {
      const localClinician = JSON.parse(localClinicianStr);

      // Device is online
      if (isOnline) {
        const clinicianProtectedInfo = await getClinicianProtectedInfo({
          clinicianID: localClinician.clinicianID
        });
        protectedInfo = clinicianProtectedInfo.data.getClinicianProtectedInfo;
      } else {
        // Device is offline
        protectedInfo = localClinician.protectedInfo;
      }

      if (protectedInfo) {
        const updatedProtectedInfo: UpdateClinicianProtectedInfoInput = {
          id: protectedInfo.id!,
          clinicianID: localClinician.clinicianID,
          facts: protectedInfo.facts,
          APS: protectedInfo.APS,
          DTA: protectedInfo.DTA,
          UXSA: protectedInfo.UXSA,
          NWA: protectedInfo.NWA,
          ALA: protectedInfo.ALA,
          MHA: protectedInfo.MHA,
          owner: localClinician.clinicianID,
          _version: protectedInfo._version
        };

        // Updates facts and beliefs of each agent
        updatedProtectedInfo.facts = JSON.stringify(this.facts);

        // JH-TODO: Document what's going on here
        this.agents.forEach((agent) => {
          switch (agent.getID()) {
            case AgentIDs.APS: {
              const updatedBeliefs = JSON.stringify(agent.getBeliefs());
              updatedProtectedInfo[AgentIDs.APS] = updatedBeliefs;
              localClinician.protectedInfo[AgentIDs.APS] = updatedBeliefs;
              break;
            }
            case AgentIDs.DTA: {
              // LS-TODO: Temporary fix for duplicated RetrievePatientDetails and RetrieveAlertInfo action frames
              const currentBeliefs: Fact = agent.getBeliefs();
              switch (
                currentBeliefs[AgentIDs.DTA][CommonAttributes.LAST_ACTIVITY]
              ) {
                case ActionFrameIDs.DTA.RETRIEVE_PATIENT_DETAILS:
                  currentBeliefs[AgentIDs.DTA][CommonAttributes.LAST_ACTIVITY] =
                    ActionFrameIDs.DTA.REQUEST_DETAILS_DISPLAY;
                  break;
                case ActionFrameIDs.DTA.RETRIEVE_ALERT_INFOS:
                  currentBeliefs[AgentIDs.DTA][CommonAttributes.LAST_ACTIVITY] =
                    ActionFrameIDs.DTA.REQUEST_ALERTS_DISPLAY;
                  break;
                default:
                  break;
              }
              const updatedBeliefs = JSON.stringify(currentBeliefs);
              updatedProtectedInfo[AgentIDs.DTA] = updatedBeliefs;
              localClinician.protectedInfo[AgentIDs.DTA] = updatedBeliefs;
              break;
            }
            case AgentIDs.UXSA: {
              // LS-TODO: Temporary fix for duplicated RetrieveRole action frame
              const currentBeliefs: Fact = agent.getBeliefs();
              if (
                currentBeliefs[AgentIDs.UXSA][
                  CommonAttributes.LAST_ACTIVITY
                ] === ActionFrameIDs.UXSA.RETRIEVE_ROLE
              ) {
                currentBeliefs[AgentIDs.UXSA][CommonAttributes.LAST_ACTIVITY] =
                  ActionFrameIDs.UXSA.REQUEST_RETRIEVE_ALL;
              }
              const updatedBeliefs = JSON.stringify(currentBeliefs);
              updatedProtectedInfo[AgentIDs.UXSA] = updatedBeliefs;
              localClinician.protectedInfo[AgentIDs.UXSA] = updatedBeliefs;
              break;
            }
            case AgentIDs.NWA: {
              const updatedBeliefs = JSON.stringify(agent.getBeliefs());
              updatedProtectedInfo[AgentIDs.NWA] = updatedBeliefs;
              localClinician.protectedInfo[AgentIDs.NWA] = updatedBeliefs;
              break;
            }
            case AgentIDs.ALA: {
              const updatedBeliefs = JSON.stringify(agent.getBeliefs());
              updatedProtectedInfo[AgentIDs.ALA] = updatedBeliefs;
              localClinician.protectedInfo[AgentIDs.ALA] = updatedBeliefs;
              break;
            }
            case AgentIDs.MHA: {
              const updatedBeliefs = JSON.stringify(agent.getBeliefs());
              updatedProtectedInfo[AgentIDs.MHA] = updatedBeliefs;
              localClinician.protectedInfo[AgentIDs.MHA] = updatedBeliefs;
              break;
            }
            default: {
              break;
            }
          }
        });

        if (isOnline) {
          await updateClinicianProtectedInfo(updatedProtectedInfo);
        } else {
          const agentNWA = this.getAgent(AgentIDs.NWA);
          if (agentNWA) {
            agentNWA.addBelief(
              new Belief(
                BeliefKeys.APP,
                AppAttributes.PENDING_PROTECTED_INFO_SYNC,
                true
              )
            );
          }
        }

        // Updates local storage
        await AsyncStorage.mergeItem(
          AsyncStorageKeys.CLINICIAN,
          JSON.stringify(localClinician)
        );
      }
    }
  }

  /**
   * Triggers the initialization of agents.
   */
  abstract startAgents(): void;
}

export default AgentManagement;
