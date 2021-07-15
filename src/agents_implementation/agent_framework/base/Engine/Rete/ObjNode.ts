import Node from "./Node";

/**
 * Object node class for all nodes
 */
class ObjNode extends Node {
  private object: string | null;

  /**
   * Constructor for the Object Node
   * @param {string} object - identifier for the object node
   */
  constructor(object: string | null = null) {
    super(object);
    this.object = object;
    this.active = false;
    this.children = [];
  }

  /**
   * Get the id of the node
   */
  getObject(): string | null {
    return this.object;
  }
}

export default ObjNode;
