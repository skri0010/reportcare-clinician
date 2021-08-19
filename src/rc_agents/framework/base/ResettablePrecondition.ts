import { CompOperator } from "../Enums";
import Precondition from "./Precondition";

/**
 * This extension of precondition is used for reset on doActivity()
 * The value must be a boolean
 */
class ResettablePrecondition extends Precondition {
  /**
   * Constructor for ResettablePrecondition
   * @param {string} key - key or id of the agent or object
   * @param {string} attribute - attribute belonging to agent or object
   * @param {any} value - value of attribute of an agent or object
   * @param {CompOperator} operator - constant value representing type of operator
   */

  private resetValue: boolean;

  constructor(
    key: string,
    attribute: string,
    value: boolean,
    operator: CompOperator = CompOperator.EQUAL
  ) {
    super(key, attribute, value, operator);
    this.resetValue = !value;
  }

  getResetValue(): boolean {
    return this.resetValue;
  }
}

export default ResettablePrecondition;
