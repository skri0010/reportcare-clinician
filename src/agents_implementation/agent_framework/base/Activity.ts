import { ActivityStatus } from "../AgentEnums";
import Agent from "./Agent";

/**
 * Class representing the activity
 */
class Activity {
  protected id: string;

  private status: ActivityStatus;

  /**
   * Constructor of the Activity class
   * @param {string} id - identifier of the activity
   */
  constructor(id: string) {
    this.id = id;
    this.status = ActivityStatus.INACTIVE;
  }

  /**
   * Get the identifier of the activity
   */
  getID(): string {
    return this.id;
  }

  /**
   * Get the status or state of the activity
   */
  getStatus(): ActivityStatus {
    return this.status;
  }

  /**
   * Perform or initiate the activity
   * @param {Agent} agent - the agent performing this activity
   */
  async doActivity(agent: Agent): Promise<void> {
    // eslint-disable-next-line no-console
    console.log(`${agent.getID()} is starting activity: ${this.getID()} ...`);
  }
}

export default Activity;
