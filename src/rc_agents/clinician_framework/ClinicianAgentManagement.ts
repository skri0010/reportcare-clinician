import { Belief, Fact } from "agents-framework";
import { getClinicianProtectedInfo, updateClinicianProtectedInfo } from "aws";
import {
  UpdateClinicianProtectedInfoInput,
  ClinicianProtectedInfo
} from "aws/API";
import { AgentIDs, AppAttributes, BeliefKeys } from "./index";
import { LocalStorage } from "rc_agents/storage";
import AgentManagement from "agents-framework/management/AgentManagement";
import { ClinicianAgent } from "./ClinicianAgent";
import cloneDeep from "lodash/cloneDeep";

/**
 * Base class for management of active clinician agents.
 */
export class ClinicianAgentManagement extends AgentManagement {
  // List of attributes that should be stored in the cloud database
  private storableAttributes: string[] = [];

  // List of keys that should be stored in the cloud database
  // All inner attributes of each key listed will be stored
  // NOTE: Currently used to prevent intermediate information from being stored due to race conditions
  private storableKeys: string[] = [BeliefKeys.APP, BeliefKeys.PROCEDURE];

  /**
   * Gets keys of beliefs/facts that should be stored
   * @returns an array of keys
   */
  getStorableKeys(): string[] {
    return this.storableKeys;
  }

  /**
   * Overrode existing factFromDB to retrieve facts from cloud database
   */
  override async factFromDB(): Promise<void> {
    let factsSet = false;
    let protectedInfo: ClinicianProtectedInfo | null | undefined;

    try {
      // Retrieves local clinician
      const localClinician = await LocalStorage.getClinician();
      if (localClinician) {
        // Device is online
        if (this.facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          const result = await getClinicianProtectedInfo({
            clinicianID: localClinician.clinicianID
          });
          if (result.data.getClinicianProtectedInfo) {
            protectedInfo = result.data.getClinicianProtectedInfo;

            // Updates local storage
            localClinician.protectedInfo = protectedInfo;
            await LocalStorage.setClinician(localClinician);
          }
        } else {
          // Device is offline
          protectedInfo = localClinician.protectedInfo;
        }

        if (protectedInfo) {
          const dbFacts = protectedInfo.facts;
          if (dbFacts && Object.entries(JSON.parse(dbFacts)).length > 0) {
            this.facts = JSON.parse(dbFacts);
            factsSet = true;
          }
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
   * Get all the registered agents
   */
  override getAgents(): ClinicianAgent[] {
    const registeredAgents: ClinicianAgent[] = [];
    this.agents.forEach((agent) => {
      if (agent instanceof ClinicianAgent) {
        registeredAgents.push(agent);
      }
    });
    return registeredAgents;
  }

  /**
   * Add fact to system
   * @param {Belief} fact - fact(belief) to be inserted
   * @param {Boolean} broadcast - whether fact is to be broadcasted
   * @param {Boolean} updateDb - whether the local beliefs and facts should be written to database
   */
  override async addFact(
    fact: Belief,
    broadcast: boolean = true,
    updateDb: boolean = false
  ): Promise<void> {
    try {
      super.addFact(fact, broadcast);
      this.facts = cloneDeep(this.facts); // Necessary to prevent obtaining cached value

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
        // Insert fact if it does not exist
        this.facts[key] = innerObj;
      } else {
        // Replace with fact if it exists
        Object.entries(innerObj).forEach(([attribute, value]) => {
          this.facts[key][attribute] = value;
        });
      }
    });
  }

  /**
   * Gets facts that should be stored in the cloud database
   * @returns storableFacts
   */
  getStorableFacts(): Fact {
    // Create a copy of current state of facts
    const storableFacts = cloneDeep(this.facts);

    // Removes attributes that don't exist in the list of storable attributes
    Object.entries(storableFacts).forEach(([key, innerObj]) => {
      // Excludes all attributes of keys that exist in storable keys
      if (!this.storableKeys.includes(key)) {
        Object.keys(innerObj).forEach((attribute) => {
          if (!this.storableAttributes.includes(attribute)) {
            delete storableFacts[key][attribute];
          }
        });
      }
    });

    return storableFacts;
  }

  /**
   * Triggers update of all local beliefs and facts to the database.
   * Usually called at the end of a series of agents' actions.
   */
  async updateDbStates(): Promise<void> {
    // Ensures that all agents have completed their actions before updating
    // Retry every 3s
    const timer = setInterval(async () => {
      const agentIDMap: { [id: string]: boolean } = {};
      // Map expected agent ids to false
      Object.values(AgentIDs).forEach((id: string) => {
        agentIDMap[id] = false;
      });
      // Update agent id map
      const registeredAgents = this.getAgents();
      if (registeredAgents) {
        registeredAgents.forEach((agent) => {
          agentIDMap[agent.getID()] = agent.getActionCompleted();
        });
      }
      // Ensure all agents have completed their actions
      const actionsCompleted = !Object.values(agentIDMap).includes(false);
      if (actionsCompleted) {
        await this.updateProtectedInfo();
        clearInterval(timer);
      } else {
        // eslint-disable-next-line no-console
        console.log("One or more agents have not completed their actions");
      }
    }, 3000);
  }

  /**
   * Collects and updates ClinicianProtectedInfo in the cloud database
   * NOTE: Currently stores "storableFacts" and all beliefs of each agent.
   * Replace "getBeliefs()" with "getStorableBeliefs()" to exclude certain beliefs from the agents.
   * @param protectedInfo
   * @param localClinician
   */
  async updateProtectedInfo(): Promise<void> {
    // Retrieves locally stored clinician
    const localClinician = await LocalStorage.getClinician();
    if (localClinician) {
      const isOnline = this.facts[BeliefKeys.APP]?.[AppAttributes.ONLINE];
      let protectedInfo: ClinicianProtectedInfo | undefined;

      // Retrieves protected info
      if (isOnline) {
        // Device is online - get online data
        const clinicianProtectedInfo = await getClinicianProtectedInfo({
          clinicianID: localClinician.clinicianID
        });
        if (clinicianProtectedInfo.data.getClinicianProtectedInfo) {
          protectedInfo = clinicianProtectedInfo.data.getClinicianProtectedInfo;
          localClinician.protectedInfo = protectedInfo;
        }
      } else if (localClinician.protectedInfo) {
        // Device is offline - use local data
        protectedInfo = localClinician.protectedInfo;
      }

      if (protectedInfo) {
        // Construct protectedInfo to be updated
        const updatedProtectedInfo: UpdateClinicianProtectedInfoInput = {
          clinicianID: localClinician.clinicianID,
          facts: JSON.stringify(this.getStorableFacts()), // Only stores certain facts
          APS: protectedInfo.APS,
          DTA: protectedInfo.DTA,
          UXSA: protectedInfo.UXSA,
          NWA: protectedInfo.NWA,
          ALA: protectedInfo.ALA,
          MHA: protectedInfo.MHA,
          CAM: protectedInfo.CAM,
          _version: protectedInfo._version
        };

        // Updates protectedInfo with latest storable beliefs of each agent
        this.getAgents().forEach((agent) => {
          const beliefsToUpdate = JSON.stringify(agent.getBeliefs());

          switch (agent.getID()) {
            case AgentIDs.APS: {
              updatedProtectedInfo[AgentIDs.APS] = beliefsToUpdate;
              if (localClinician.protectedInfo) {
                localClinician.protectedInfo[AgentIDs.APS] = beliefsToUpdate;
              }
              break;
            }
            case AgentIDs.DTA: {
              updatedProtectedInfo[AgentIDs.DTA] = beliefsToUpdate;
              if (localClinician.protectedInfo) {
                localClinician.protectedInfo[AgentIDs.DTA] = beliefsToUpdate;
              }
              break;
            }
            case AgentIDs.UXSA: {
              updatedProtectedInfo[AgentIDs.UXSA] = beliefsToUpdate;
              if (localClinician.protectedInfo) {
                localClinician.protectedInfo[AgentIDs.UXSA] = beliefsToUpdate;
              }
              break;
            }
            case AgentIDs.NWA: {
              updatedProtectedInfo[AgentIDs.NWA] = beliefsToUpdate;
              if (localClinician.protectedInfo) {
                localClinician.protectedInfo[AgentIDs.NWA] = beliefsToUpdate;
              }
              break;
            }
            case AgentIDs.ALA: {
              updatedProtectedInfo[AgentIDs.ALA] = beliefsToUpdate;
              if (localClinician.protectedInfo) {
                localClinician.protectedInfo[AgentIDs.ALA] = beliefsToUpdate;
              }
              break;
            }
            case AgentIDs.MHA: {
              updatedProtectedInfo[AgentIDs.MHA] = beliefsToUpdate;
              if (localClinician.protectedInfo) {
                localClinician.protectedInfo[AgentIDs.MHA] = beliefsToUpdate;
              }
              break;
            }
            case AgentIDs.CAM: {
              updatedProtectedInfo[AgentIDs.CAM] = beliefsToUpdate;
              if (localClinician.protectedInfo) {
                localClinician.protectedInfo[AgentIDs.CAM] = beliefsToUpdate;
              }
              break;
            }
            default: {
              break;
            }
          }
        });

        if (isOnline) {
          // Device is online - store ClinicianProtectedInfo on cloud database
          await updateClinicianProtectedInfo(updatedProtectedInfo);
        } else {
          // Device is offline - notify NWA for syncing
          const agentNWA = this.getAgent(AgentIDs.NWA);
          if (agentNWA) {
            agentNWA.addBelief(
              new Belief(
                BeliefKeys.APP,
                AppAttributes.SYNC_PROTECTED_INFO,
                true
              )
            );
          }
        }

        // Updates local storage
        await LocalStorage.setClinician(localClinician);
      }
    }
  }
}
