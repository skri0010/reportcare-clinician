import { DeviceEventEmitter } from "react-native";
import Agent from "../base/Agent";
import Belief from "../base/Belief";
import { Fact } from "../index";

/**
 * Base class for management of active agents.
 */
abstract class AgentManagement {
  protected agents: Agent[];

  protected facts: Fact;

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
  abstract factFromDB(): Promise<void>;

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

   */
  async addFact(fact: Belief, broadcast: boolean = true): Promise<void> {
    try {
      const key = fact.getKey();
      const value = fact.getValue();
      const attribute = fact.getAttribute();

      if (value === null && key in this.facts) {
        // Clears intermediate attributes and values of actions from current facts
        delete this.facts[key][attribute];
      } else {
        // Add new fact
        if (!(key in this.facts)) {
          this.facts[key] = {};
        }
        this.facts[key][attribute] = value;

        if (broadcast) {
          DeviceEventEmitter.emit("env", fact);
        }
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }

  /**
   * Get all the facts
   * @return {Fact} facts or state of the environment
   */
  getFacts(): Fact {
    return this.facts;
  }
}

export default AgentManagement;
