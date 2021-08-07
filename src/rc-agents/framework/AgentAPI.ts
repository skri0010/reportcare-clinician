import { Platform } from "react-native";
import Belief from "./base/Belief";
import AgentManagement from "./management/AgentManagement";
import WebAgentManagement from "./management/WebAgentManagement";
import MobileAgentManagement from "./management/MobileAgentManagement";
import { Fact } from "../model";
import Agent from "./base/Agent";

/**
 * Class representing an end point for the agent system
 */
class AgentAPI {
  private system: AgentManagement;

  constructor() {
    if (Platform.OS === "web") {
      this.system = new WebAgentManagement();
    } else {
      this.system = new MobileAgentManagement();
    }
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
  getAgents(): Agent[] {
    return this.system.getAgents();
  }

  /**
   * Start all the agents
   */
  startAgents(): void {
    return this.system.startAgents();
  }

  /**
   * Add fact to the system
   * @param {Belief} fact - fact to be inserted
   * @param {Boolean} broadcast - whether to broadcast or not
   * @param {Boolean} updateDb - whether the local beliefs and facts should be written to database
   */
  addFact(
    fact: Belief,
    broadcast: boolean = true,
    updateDb: boolean = false
  ): void {
    this.system.addFact(fact, broadcast, updateDb);
  }

  /**
   * Merge incoming facts into current facts.
   * This happen when an existing user signs in.
   * @param {Belief} facts
   */
  mergeFacts(facts: Belief): void {
    this.system.mergeFacts(facts);
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
