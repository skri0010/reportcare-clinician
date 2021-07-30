import Actionframe from "../../../../agent_framework/base/Actionframe";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Communicate from "../../../../agent_framework/base/Communicate";
import Precondition from "../../../../agent_framework/base/Precondition";
import Performative from "../../../../agent_framework/const/Performative";
import ProcedureConst from "../../../../agent_framework/const/ProcedureConst";

/**
 * Class to represent the activity for requesting display of retrieved patient's details.
 * This happens in Procedure HF Outcome Trends (HF-OTP-II).
 */
class RequestDetailsDisplay extends Communicate {
  /**
   * Constructor for the RequestDetailsDisplay class
   */
  constructor() {
    super(
      "RequestDetailsDisplay",
      Performative.REQUEST,
      new Belief("Patient", "detailsRetrieved", true),
      ["UXSA"]
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

// Rules or preconditions for activating the RequestDetailsDisplay class
const rule1 = new Precondition("Procedure", "HF-OTP-II", ProcedureConst.ACTIVE);
const rule2 = new Precondition("DTA", "lastActivity", "RetrievePatientDetails");

// Actionframe of the RequestDetailsDisplay class
const af_RequestDetailsDisplay = new Actionframe(
  "AF_RequestDetailsDisplay",
  [rule1, rule2],
  new RequestDetailsDisplay()
);

export default af_RequestDetailsDisplay;
