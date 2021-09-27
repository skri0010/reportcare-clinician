import { Agent, Belief, Actionframe, Engine, Fact } from "agents-framework";
import { getClinicianProtectedInfo } from "aws";
import { AppAttributes, BeliefKeys } from "./index";
import { CommonAttributes } from "agents-framework/Enums";
import { Storage } from "../storage";
import { ClinicianProtectedInfo } from "aws/API";
// eslint-disable-next-line no-restricted-imports
import AgentAPI from "agents-framework/AgentAPI";
import cloneDeep from "lodash/cloneDeep";
import { ClinicianAgentAPI } from "./ClinicianAgentAPI";

/**
 * Class representing the Agent
 */
export class ClinicianAgent extends Agent {
  private initialized: boolean;

  // To indicate that action of the agent has been completed,
  // i.e. beliefs can be updated to the cloud database
  private actionCompleted: boolean;

  // List of attributes that should be stored in the cloud database
  // Used when certain beliefs should be excluded from being stored
  // NOTE: Currently unused since all beliefs are stored
  private storableAttributes: string[] = [CommonAttributes.LAST_ACTIVITY];

  constructor(
    id: string,
    actionFrames: Actionframe[],
    beliefs: Belief[],
    agentAPI: AgentAPI,
    storableAttributes?: string[]
  ) {
    super(id, actionFrames, beliefs, agentAPI);
    this.initialized = false;
    this.actionCompleted = true;
    if (storableAttributes) {
      this.storableAttributes =
        this.storableAttributes.concat(storableAttributes);
    }
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
   * Get agent actionCompleted boolean
   */
  getActionCompleted(): boolean {
    return this.actionCompleted;
  }

  /**
   * Set agent actionCompleted boolean
   */
  setActionCompleted(actionCompleted: boolean): void {
    this.actionCompleted = actionCompleted;
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
        this.agentAPI.registerAgent(this);
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
        if (this.agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
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
   * Gets beliefs that should be stored in the cloud database
   * NOTE: Currently unused since all beliefs are stored
   * @returns storableBeliefs
   */
  getStorableBeliefs(): Fact {
    // Create a copy of current state of beliefs
    const storableBeliefs = cloneDeep(this.beliefs);

    // Gets storable keys from agentAPI
    let storableKeys: string[] | undefined;
    if (this.agentAPI instanceof ClinicianAgentAPI) {
      storableKeys = this.agentAPI.getStorableKeys();
    }

    // Removes attributes that don't exist in the list of storable attributes
    Object.entries(storableBeliefs).forEach(([key, innerObj]) => {
      // Excludes all attributes of keys that exist in storable keys
      if (!storableKeys || !storableKeys.includes(key)) {
        Object.keys(innerObj).forEach((attribute) => {
          if (!this.storableAttributes.includes(attribute)) {
            delete storableBeliefs[key][attribute];
          }
        });
      }
    });

    return storableBeliefs;
  }

  /**
   * Overrode existing inference to include checking of current running activity with returned available actions.
   */
  override async inference(): Promise<void> {
    const result = await this.engine.traverseNetwork(this);

    for (let i = 0; i < result.length; i += 1) {
      let activityExists = false;
      // Check if activity is already running
      if (
        this.currentActivity &&
        this.currentActivity.getID() === result[i].getID()
      ) {
        activityExists = true;
      } else {
        // Check if activity already exists in the list
        for (let j = 0; j < this.availableActions.length; j += 1) {
          if (this.availableActions[j].getID() === result[i].getID()) {
            activityExists = true;
            break;
          }
        }
      }
      if (!activityExists) {
        this.availableActions.push(result[i]);
      }
    }

    if (this.availableActions.length > 0) {
      await this.startActivity();
    }
  }

  /**
   * Overrode existing startActivity to include tracking of current activity and whether it has been completed
   */
  override async startActivity(): Promise<void> {
    if (this.availableActions.length > 0) {
      // If working, do activity and set belief for last activity
      this.working = true;
      this.setActionCompleted(false); // Updates indicator that an activity is ongoing

      // Performs activity
      this.currentActivity = this.availableActions.shift()!; // Updates current activity
      const activity = this.currentActivity.getActivity();
      await activity.doActivity(this);

      // Updates last activity in the current state of belief
      this.addBelief(
        new Belief(
          this.getID(),
          CommonAttributes.LAST_ACTIVITY,
          activity.getID()
        )
      );

      // Updates indicator that activity is completed
      this.setActionCompleted(true);
    } else {
      // No activity to perform
      this.currentActivity = undefined;
    }
    this.working = false;

    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift()!;
      this.addBelief(message.getContent());
    }

    // Do Inference
    await this.inference();
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
