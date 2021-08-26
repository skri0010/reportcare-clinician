import { Belief, Actionframe, Engine } from "rc_agents/framework";
import agentAPI from "rc_agents/clinician_framework/ClinicianAgentAPI";
import Agent from "rc_agents/framework/base/Agent";
import { getClinicianProtectedInfo } from "aws";
import { AppAttributes, BeliefKeys } from "./index";
import { CommonAttributes } from "../framework/Enums";
import { Storage } from "../storage";
import { ClinicianProtectedInfo } from "aws/API";

/**
 * Class representing the Agent
 */
class ClinicianAgent extends Agent {
  private initialized: boolean;

  constructor(id: string, actionFrames: Actionframe[], beliefs: Belief[]) {
    super(id, actionFrames, beliefs);
    this.initialized = false;
  }

  /**
   * Get agent initialized boolean
   */
  getInitialized(): boolean {
    return this.initialized;
  }

  /**
   * Set agent initialized boolean
   */
  setInitialized(initialized: boolean): void {
    this.initialized = initialized;
  }

  /**
   * Initiate the agent
   * @param {Belief[]} beliefs - beliefs of the agents
   * @param {Actionframe[]} actionFrames - actionframes of the agents
   */
  override async initAgent(
    beliefs: Belief[],
    actionFrames: Actionframe[]
  ): Promise<void> {
    // Set Inference Engine
    this.engine = new Engine(actionFrames);

    // Register Agent in the system
    // Note: agentManager might be undefined on first attempt, set to retry every 0.5s
    const timer = setInterval(() => {
      try {
        agentAPI.registerAgent(this);
        this.setInitialized(true);
        clearInterval(timer);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(`${this.id} ${e}`);
      }
    }, 500);

    // Set Beliefs
    this.setBeliefs(beliefs);

    await this.inference();
  }

  /**
   * Set beliefs of the agent
   * @param {Belief[]} beliefs - Initial beliefs of the agent
   */
  override async setBeliefs(beliefs: Belief[]): Promise<void> {
    let beliefsSet = false;
    let protectedInfo: ClinicianProtectedInfo | null | undefined;

    try {
      // Retrieves local clinician
      const localClinician = await Storage.getClinician();
      if (localClinician) {
        // Device is online
        if (agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          const query = await getClinicianProtectedInfo({
            clinicianID: localClinician.clinicianID
          });
          if (query.data && query.data.getClinicianProtectedInfo) {
            const result = query.data.getClinicianProtectedInfo;
            protectedInfo = result;

            // Updates local storage
            localClinician.protectedInfo = result;
            await Storage.setClinician(localClinician);
          }
        } else {
          protectedInfo = localClinician.protectedInfo;
        }
      }

      // Initializes agent's beliefs using the retrieved states in protected info
      if (protectedInfo && this.id in protectedInfo) {
        const beliefJSON = protectedInfo[this.id as keyof typeof protectedInfo];
        if (beliefJSON) {
          const parsedBelief = JSON.parse(beliefJSON.toString());
          if (Object.entries(parsedBelief).length > 0) {
            this.beliefs = parsedBelief;
            beliefsSet = true;
          }
        }
      }

      if (!beliefsSet) {
        for (let i = 0; i < beliefs.length; i += 1) {
          this.addBelief(beliefs[i]);
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  /**
   * Merge incoming beliefs into current beliefs.
   * This happen when an existing user signs in.
   * @param {Belief} beliefs
   */
  mergeBeliefs(beliefs: Belief): void {
    Object.entries(beliefs).forEach(([key, innerObj]) => {
      // Non existing keys
      if (!(key in this.beliefs)) {
        this.beliefs[key] = innerObj;
      } else {
        // Replace current LastActivity if it is null
        Object.entries(innerObj).forEach(([attribute, value]) => {
          if (
            attribute === CommonAttributes.LAST_ACTIVITY &&
            !this.beliefs[key][attribute]
          ) {
            this.beliefs[key][attribute] = value;
          }
        });
      }
    });
  }
}

export default ClinicianAgent;
