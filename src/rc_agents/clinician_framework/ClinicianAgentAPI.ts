import { Belief } from "agents-framework";
// eslint-disable-next-line no-restricted-imports
import AgentAPI from "agents-framework/AgentAPI";
import { ClinicianAgentManagement } from "./ClinicianAgentManagement";
import { ClinicianAgent } from "./ClinicianAgent";

/**
 * Class representing an end point for the agent system
 */
export class ClinicianAgentAPI extends AgentAPI {
  constructor() {
    super(new ClinicianAgentManagement());
  }

  /**
   * Get all the registered agents
   */
  override getAgents(): ClinicianAgent[] | undefined {
    if (this.system instanceof ClinicianAgentManagement) {
      return this.system.getAgents();
    }
  }

  /**
   * Add fact to the system
   * @param {Belief} fact - fact to be inserted
   * @param {Boolean} broadcast - whether to broadcast or not
   * @param {Boolean} updateDb - whether the local beliefs and facts should be written to database
   */
  override addFact(
    fact: Belief,
    broadcast: boolean = true,
    updateDb: boolean = false
  ): void {
    if (this.system instanceof ClinicianAgentManagement) {
      this.system.addFact(fact, broadcast, updateDb);
    }
  }

  /**
   * Merge incoming facts into current facts.
   * This happen when an existing user signs in.
   * @param {Belief} facts
   */
  mergeFacts(facts: Belief): void {
    if (this.system instanceof ClinicianAgentManagement) {
      this.system.mergeFacts(facts);
    }
  }

  /**
   * Gets keys of beliefs/facts that should be stored
   * @returns an array of keys
   */
  getStorableKeys(): string[] | undefined {
    if (this.system instanceof ClinicianAgentManagement) {
      return this.system.getStorableKeys();
    }
  }
}

export const agentAPI = new ClinicianAgentAPI();
