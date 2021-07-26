import Actionframe from "../../../../agent_framework/base/Actionframe";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Communicate from "../../../../agent_framework/base/Communicate";
import Precondition from "../../../../agent_framework/base/Precondition";
import Performative from "../../../../agent_framework/const/Performative";
import ProcedureConst from "../../../../agent_framework/const/ProcedureConst";

/**
 * The class represents the activity for requesting retrieval of all patients specific to a role.
 * This happens in Procedure HF Outcome Trends (HF-OTP-I).
 */
class RequestRetrieveAll extends Communicate {
  /**
   * Constructor for the RequestRetrieveAll class
   */
  constructor() {
    super(
      "RequestRetrieveAll",
      Performative.REQUEST,
      new Belief("Patient", "retrieveAll", true),
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

// Rules or preconditions for activating the RequestRetrieveAll class
const rule1 = new Precondition("Procedure", "HF-OTP-I", ProcedureConst.ACTIVE);
const rule2 = new Precondition("UXSA", "lastActivity", "RetrieveRole");

// Actionframe of the RequestRetrieveAll class
const af_RequestRetrieveAll = new Actionframe(
  "AF_RequestRetrieveAll",
  [rule1, rule2],
  new RequestRetrieveAll()
);

export default af_RequestRetrieveAll;
