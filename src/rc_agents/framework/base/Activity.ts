import { ActivityStatus } from "../../AgentEnums";
import Agent from "./Agent";
import Belief from "./Belief";
import ResettablePrecondition from "./ResettablePrecondition";

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
   * Reset a resettable precondition by flipping its value and adding a belief.
   * @param {Agent} agent - the agent performing this activity
   * @param {reset} ResettablePrecondition - specialised preconditions to reset
   */
  private static resetPrecondition(
    agent: Agent,
    reset: ResettablePrecondition[]
  ): void {
    reset.forEach((resettablePrecondition) => {
      agent.addBelief(
        new Belief(
          resettablePrecondition.getKey(),
          resettablePrecondition.getAttribute(),
          resettablePrecondition.getResetValue()
        )
      );
    });
  }

  /**
   * Perform or initiate the activity
   * @param {Agent} agent - the agent performing this activity
   * @param {reset} ResettablePrecondition - specialised preconditions to reset
   */
  async doActivity(
    agent: Agent,
    reset?: ResettablePrecondition[]
  ): Promise<void> {
    // Reset preconditions
    if (reset) {
      Activity.resetPrecondition(agent, reset);
    }
    // eslint-disable-next-line no-console
    console.log(`${agent.getID()} is starting activity: ${this.getID()} ...`);
  }
}

export default Activity;
