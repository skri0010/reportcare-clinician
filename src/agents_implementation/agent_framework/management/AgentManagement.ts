import { DeviceEventEmitter } from "react-native";
import Agent from "../base/Agent";
import Belief from "../base/Belief";
import { Fact } from "../model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getClinicianProtectedInfo, updateClinicianProtectedInfo } from "aws";
import { ClinicianProtectedInfo } from "aws/API";

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
   * Retrieve saved state of facts from the database(AsyncStorage)
   */
  async factFromDB(): Promise<void> {
    // const dbFacts = await AsyncStorage.getItem("Facts");
    try {
      const clinicianID = await AsyncStorage.getItem("clinicianID");
      if (clinicianID) {
        const result = await getClinicianProtectedInfo({
          clinicianID: clinicianID
        });
        const protectedInfo = result.data.getClinicianProtectedInfo;
        if (protectedInfo) {
          const dbFacts = protectedInfo.facts;
          if (dbFacts && Object.entries(JSON.parse(dbFacts)).length > 0) {
            this.facts = JSON.parse(dbFacts);
          } else {
            this.facts = {};
          }
        }
      }
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
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
    const clinicianID = await AsyncStorage.getItem("clinicianID");
    if (clinicianID) {
      const clinicianProtectedInfo = await getClinicianProtectedInfo({
        clinicianID: clinicianID
      });
      const protectedInfo =
        clinicianProtectedInfo.data.getClinicianProtectedInfo;
      if (protectedInfo) {
        // Make a copy
        const updatedProtectedInfo = JSON.parse(
          JSON.stringify(protectedInfo)
        ) as ClinicianProtectedInfo;
        updatedProtectedInfo.facts = JSON.stringify(this.facts);
        this.agents.forEach((agent) => {
          switch (agent.getID()) {
            case "APS": {
              updatedProtectedInfo.APS = JSON.stringify(agent.getBeliefs());
              break;
            }
            case "DTA": {
              updatedProtectedInfo.DTA = JSON.stringify(agent.getBeliefs());
              break;
            }
            case "UXSA": {
              updatedProtectedInfo.UXSA = JSON.stringify(agent.getBeliefs());
              break;
            }
            default: {
              break;
            }
          }
        });
        await updateClinicianProtectedInfo(updatedProtectedInfo);
      }
    }
  }

  /**
   * Triggers the initialization of agents.
   */
  // eslint-disable-next-line class-methods-use-this
  abstract startAgents(): void;
}

export default AgentManagement;
