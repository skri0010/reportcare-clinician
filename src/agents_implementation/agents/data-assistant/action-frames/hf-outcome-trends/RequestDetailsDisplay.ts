import Actionframe from "../../../../agent_framework/base/Actionframe";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Communicate from "../../../../agent_framework/base/Communicate";
import Precondition from "../../../../agent_framework/base/Precondition";
import {
  AgentIDs,
  BeliefKeys,
  CommonAttributes,
  PatientAttributes,
  Performative,
  ProcedureAttributes,
  ProcedureConst
} from "../../../../agent_framework/AgentEnums";

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
      // Triggesr VisualizeParameters action frame of UXSA
      new Belief(BeliefKeys.PATIENT, PatientAttributes.DETAILS_RETRIEVED, true),
      [AgentIDs.UXSA]
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
      agent.addBelief(
        new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Rules or preconditions for activating the RequestDetailsDisplay class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_II,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.DTA,
  CommonAttributes.LAST_ACTIVITY,
  "RetrievePatientDetails"
);

// Actionframe of the RequestDetailsDisplay class
const af_RequestDetailsDisplay = new Actionframe(
  "AF_RequestDetailsDisplay",
  [rule1, rule2],
  new RequestDetailsDisplay()
);

export default af_RequestDetailsDisplay;
