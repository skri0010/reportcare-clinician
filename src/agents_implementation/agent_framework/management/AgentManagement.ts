import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeviceEventEmitter } from "react-native";
import Agent from "../base/Agent";
import Belief from "../base/Belief";
import { Fact } from "../model";

/**
 * Class for managment of active agents
 */
class AgentManagement {
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
    const dbFacts = await AsyncStorage.getItem("Facts");
    if (dbFacts && Object.entries(JSON.parse(dbFacts)).length > 0) {
      this.facts = JSON.parse(dbFacts);
    } else {
      this.facts = {};
    }
  }

  /**
   * Register the agent in the system
   * @param {Agent} agent - agent to be registered
   */
  registerAgent(agent: Agent) {
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
  unregisterAgent(agentID: string) {
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
   */
  async addFact(fact: Belief, broadcast = true) {
    try {
      if (!(fact.getKey() in this.facts)) {
        this.facts[fact.getKey()] = {};
      }
      this.facts[fact.getKey()][fact.getAttribute()] = fact.getValue();

      const existingFacts = await AsyncStorage.getItem("Facts");
      if (
        existingFacts &&
        Object.entries(JSON.parse(existingFacts)).length > 0
      ) {
        await AsyncStorage.mergeItem("Facts", JSON.stringify(this.facts));
      } else {
        await AsyncStorage.setItem("Facts", JSON.stringify(this.facts));
      }

      if (broadcast) {
        DeviceEventEmitter.emit("env", fact);
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  /**
   * Get all the facts
   * @return {{ [k: string]: { [k: string]: unknown } }} facts or state of the environment
   */
  getFacts(): Fact {
    return this.facts;
  }
}

const agentManager = new AgentManagement();

export default agentManager;
