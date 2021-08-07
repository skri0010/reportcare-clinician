import { CompOperator } from "../../AgentEnums";

/**
 * Class representing the rule or precondition
 */
class Precondition {
  private key: string;

  private attribute: string;

  private value: unknown;

  private operator: CompOperator;

  /**
   * Constructor for the Precondition Class
   * @param {string} key - key or id of the agent or object
   * @param {string} attribute - attribute belonging to agent or object
   * @param {any} value - value of attribute of an agent or object
   * @param {CompOperator} operator - constant value representing type of operator
   */
  constructor(
    key: string,
    attribute: string,
    value: any,
    operator: CompOperator = CompOperator.EQUAL
  ) {
    this.key = key;
    this.attribute = attribute;
    this.value = value;
    this.operator = operator;
  }

  /**
   * Get the key(agent or object) of the precondition
   */
  getKey(): string {
    return this.key;
  }

  /**
   * Get the attribute of the precondition
   */
  getAttribute(): string {
    return this.attribute;
  }

  /**
   * Get the value of the precondition
   */
  getValue(): unknown {
    return this.value;
  }

  /**
   * Get the operator for the precondition
   */
  getOperator(): CompOperator {
    return this.operator;
  }

  /**
   * Compare the rule with passing params
   * @param {string} obj - object or key
   * @param {string} attr - string representing the attribute
   * @param {any} value - value representing the attribute
   * @return {Boolean} returns true if matched else false
   */
  compare(obj: string, attr: string, value: any): boolean {
    if (this.getKey() === obj && this.getAttribute() === attr) {
      switch (this.operator) {
        // Note: More than 2 operators have been declared in CompOperator enum, these 2 are the ones currently in use.
        case CompOperator.NOT_EQUAL: {
          return value !== this.getValue();
        }
        case CompOperator.EQUAL: {
          return value === this.getValue();
        }
        default: {
          return false;
        }
      }
    } else {
      return false;
    }
  }
}

export default Precondition;
