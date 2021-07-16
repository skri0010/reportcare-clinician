/* eslint-disable import/no-duplicates */
import Belief from "./base/Belief";
import AgentManagement from "./management/AgentManagement";
import agentManager from "./management/AgentManagement";
import { Fact } from "./model";

/**
 * Class representing an end point for the agent system
 */
class AgentAPI {
  private system: typeof AgentManagement;

  constructor() {
    this.system = agentManager;
  }

  /**
   * Add fact to the system
   * @param {Belief} fact - fact to be inserted
   * @param {Boolean} broadcast - whether to broadcast or not
   */
  addFact(fact: Belief, broadcast = true): void {
    this.system.addFact(fact, broadcast);
  }

  /**
   * Get all the facts available
   */
  getFacts(): Fact {
    return this.system.getFacts();
  }
}

const agentAPI = new AgentAPI();

export default agentAPI;
