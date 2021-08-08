/**
 * Base class for all nodes
 */
class Node {
  protected id: string | null;

  protected children: Node[];

  protected active: boolean;

  /**
   * Constructor for the Node class
   * @param {string} id - identifier for the current node
   */
  constructor(id: string | null = null) {
    this.id = id;
    this.children = [];
    this.active = false;
  }

  /**
   * Get the identifier of the current node
   */
  getID(): string | null {
    return this.id;
  }

  /**
   * Set the child nodes of the current node
   * @param {Node} node - child node of the current node
   */
  setChildNode(node: Node): void {
    this.children.push(node);
  }

  /**
   * Get the child nodes of the current node
   */
  getChildren(): Node[] {
    return this.children;
  }

  /**
   * Set the active state of the current node
   * @param {Boolean} state - state of the node (active or inactive)
   */
  setActive(state: boolean): void {
    this.active = state;
  }

  /**
   * Check the state or activity of the current ndoe
   */
  isActive(): boolean {
    return this.active;
  }
}

export default Node;
