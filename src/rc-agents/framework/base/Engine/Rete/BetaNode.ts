import ActivityNode from "./ActivityNode";
import AlphaNode from "./AlphaNode";
import Node from "./Node";

/**
 * Beta Node for the Rete Algorithm
 */
class BetaNode extends Node {
  private leftParent: Node;

  private rightParent: Node;

  private activities: ActivityNode[];

  /**
   * Constructor for the Beta Node
   * @param {Node} leftParent - left parent of the beta node
   * @param {Node} rightParent - right parent of the beta node
   */
  constructor(leftParent: Node, rightParent: Node) {
    super(`${leftParent.getID()}_${rightParent.getID()}`);
    this.leftParent = leftParent;
    this.rightParent = rightParent;
    this.active = this.leftParent.isActive() && this.rightParent.isActive();
    this.children = [];
    this.activities = [];
  }

  /**
   * Get the child nodes of the current node
   */
  getChildren(): Node[] {
    return this.children;
  }

  /**
   * Add activity node to the current node
   * @param {ActivityNode} activity - corresponding activity
   */
  addActivity(activity: ActivityNode): void {
    this.activities.push(activity);
  }

  /**
   * Get the activities corresponding to the current node
   */
  getActivities(): ActivityNode[] {
    return this.activities;
  }

  /**
   * Get the left parent of the current Beta Node
   */
  getLeftParent(): Node {
    return this.leftParent;
  }

  /**
   * Get the right parent of the current Beta Node
   */
  getRightParent(): Node {
    return this.rightParent;
  }

  /**
   * Check the state or activity of the current node
   */
  isActive(): boolean {
    this.active = this.leftParent.isActive() && this.rightParent.isActive();
    return this.active;
  }

  /**
   * Set the left parent of the current Beta Node
   * @param {AlphaNode} parent - one of two parent nodes (left) of the Beta Node
   */
  setLeftParent(parent: AlphaNode): void {
    this.leftParent = parent;
  }

  /**
   * Set the right parent of the current Beta Node
   * @param {AlphaNode} parent - one of two parent nodes (right) for the Beta Node
   */
  setRightParent(parent: AlphaNode): void {
    this.rightParent = parent;
  }
}

export default BetaNode;
