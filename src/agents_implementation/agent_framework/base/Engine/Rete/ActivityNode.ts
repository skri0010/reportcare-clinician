import Node from "./Node";
import Activity from "../../Activity";

/**
 * Activity Node for the Rete Algorithm
 */
class ActivityNode extends Node {
  private activity: Activity;

  private parent: Node;

  /**
   * Constructor for the Activity Node
   * @param {Activity} activity - activity that agent can perform
   * @param {Node} parent - parent of the current node
   */
  constructor(activity: Activity, parent: Node) {
    super(activity.getID());
    this.activity = activity;
    this.parent = parent;
  }

  /**
   * Get the activity corresponding to current activity node
   */
  getActivity(): Activity {
    return this.activity;
  }

  /**
   * Get the parent of the activiy node
   */
  getParent(): Node {
    return this.parent;
  }

  /**
   * Get the identifier for the current node
   */
  getID(): string | null {
    return this.id;
  }
}

export default ActivityNode;
