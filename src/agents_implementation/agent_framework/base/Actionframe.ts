import AframeStatus from "../const/AframeStatus";
import Activity from "./Activity";
import Precondition from "./Precondition";

/**
 * Class representing the action frame
 */
class Actionframe {
  private id: string;

  private preconditions: Precondition[];

  private activity: Activity;

  private status: AframeStatus;

  /**
   * Constructor of the Action Frame
   * @param {string} id - identifier for the action frame
   * @param {Precondition[]} preconditions - array of rules for activating the action frame
   * @param {Activity} activity - activity corresponding to action frame
   */
  constructor(id: string, preconditions: Precondition[], activity: Activity) {
    this.id = id;
    this.preconditions = preconditions;
    this.activity = activity;
    this.status = AframeStatus.INACTIVE;
  }

  /**
   * Get the identifier of the Actionframe class
   */
  getID(): string {
    return this.id;
  }

  /**
   * Get the rules or preconditions of Actionframe class
   */
  getPreconditions(): Precondition[] {
    return this.preconditions;
  }

  /**
   * Get the activity of the Actionframe class
   */
  getActivity(): Activity {
    return this.activity;
  }

  /**
   * Get the status of the Actionframe class
   */
  getStatus(): AframeStatus {
    return this.status;
  }
}

export default Actionframe;
