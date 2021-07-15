import Actionframe from "../../../../agent_framework/base/Actionframe";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Communicate from "../../../../agent_framework/base/Communicate";
import Precondition from "../../../../agent_framework/base/Precondition";
import Performative from "../../../../agent_framework/const/Performative";
import ProcedureConst from "../../../../agent_framework/const/ProcedureConst";

/**
 * The class represents the activity for requesting storage for baseline.
 * This comes from Day-1 Scenario or Procedure ADC (App Device Configuration).
 */
class RequestStore extends Communicate {
  /**
   * Constructor for the RequestStore class
   */
  constructor() {
    super(
      "RequestStore",
      Performative.REQUEST,
      new Belief("Clinician", "baselineUpdated", true),
      ["DTA"]
    );
  }

  /**
   * Perform the activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    try {
      super.doActivity(agent);

      // Update Beliefs
      agent.addBelief(new Belief(agent.getID(), "lastActivity", this.getID()));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// rules or preconditions for activating the RequestStore class
const rule1 = new Precondition("APS", "lastActivity", "AssociateData");
const rule2 = new Precondition("Procedure", "ADC", ProcedureConst.ACTIVE);

// Actionframe of the RequestStore class
const af_RequestStore = new Actionframe(
  "AF_RequestStore",
  [rule1, rule2],
  new RequestStore()
);

export default af_RequestStore;
