/**
 * Class representing the Belief
 */
class Belief {
  private key: string;

  private attribute: string;

  private value: unknown;

  /**
   * Constructor of the Belief class
   * @param {string} key - key (agent or object) of the belief
   * @param {string} attribute - attribute of the agent or object
   * @param {any} value - value of the attribute of agent or object
   */
  constructor(key: string, attribute: string, value: unknown) {
    this.key = key;
    this.attribute = attribute;
    this.value = value;
  }

  /**
   * Get the key or object corresponding of the belief
   */
  getKey(): string {
    return this.key;
  }

  /**
   * Get the attribute of the belief
   */
  getAttribute(): string {
    return this.attribute;
  }

  /**
   * Get the value of the belief
   */
  getValue(): unknown {
    return this.value;
  }

  /**
   * Set the value of the belief
   * @param {any} value - value to assign
   */
  setValue(value: unknown): void {
    this.value = value;
  }
}

export default Belief;
