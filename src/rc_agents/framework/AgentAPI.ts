import Belief from "./base/Belief";
import AgentManagement from "./management/AgentManagement";
import { Fact } from "./index";
import Agent from "./base/Agent";

/**
 * Class representing an end point for the agent system
 */
class AgentAPI {
  protected system: AgentManagement;

  constructor(agentManagement: AgentManagement) {
    this.system = agentManagement;
  }

  /**
   * Register the agent in the system
   * @param {Agent} agent - agent to be registered
   */
  registerAgent(agent: Agent): void {
    this.system.registerAgent(agent);
  }

  /**
   * Get all the registered agents
   */
  getAgents(): Agent[] | undefined {
    return this.system.getAgents();
  }

  /**
   * Add fact to the system
   * @param {Belief} fact - fact to be inserted
   * @param {Boolean} broadcast - whether to broadcast or not
   */
  addFact(fact: Belief, broadcast: boolean = true): void {
    this.system.addFact(fact, broadcast);
  }

  /**
   * Get all the facts available
   */
  getFacts(): Fact {
    return this.system.getFacts();
  }
}

export default AgentAPI;
