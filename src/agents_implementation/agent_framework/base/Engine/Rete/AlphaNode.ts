import Precondition from "../../Precondition";
import ActivityNode from "./ActivityNode";
import Node from "./Node";
import ObjNode from "./ObjNode";

/**
 * Alpha Node for the Rete Algorithm
 */
class AlphaNode extends Node {
  private parent: ObjNode;

  private rule: Precondition;

  private activities: ActivityNode[];

  /**
   * Constructor for the Alpha Node
   * @param {Precondition} rule - rule or precondition corresponding to current node
   * @param {ObjNode} parent - parent of the current node
   */
  constructor(rule: Precondition, parent: ObjNode) {
    super(`${parent.getID()}_${rule.getAttribute()}_${rule.getValue()}`);
    this.parent = parent;
    this.rule = rule;
    this.children = [];
    this.activities = [];
  }

  /**
   * Get the parent of the alpha node
   */
  getParent(): ObjNode {
    return this.parent;
  }

  /**
   * Set the parent node of the current node
   * @param {ObjNode} parent - parent node
   */
  setParent(parent: ObjNode): void {
    this.parent = parent;
  }

  /**
   * Get the rule belonging to the current node
   */
  getRule(): Precondition {
    return this.rule;
  }

  /**
   * Function for matching the rule
   * @param {Precondition} params - precondition or rule
   */
  matchRule(params: Precondition): boolean {
    if (
      this.rule.getAttribute() === params.getAttribute() &&
      this.rule.getValue() === params.getValue() &&
      this.rule.getOperator() === params.getOperator()
    ) {
      return true;
    }
    return false;
  }

  /**
   * Add activity node to the array of activities
   * @param {ActivityNode} activity - activity node
   */
  addActivity(activity: ActivityNode): void {
    this.activities.push(activity);
  }

  /**
   * Get the activity nodes corresponding to current node
   */
  getActivities(): ActivityNode[] {
    return this.activities;
  }
}

export default AlphaNode;
