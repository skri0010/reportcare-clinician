import {
  Actionframe,
  Agent,
  Belief,
  Communicate,
  Precondition
} from "rc-agents/framework";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  CommonAttributes,
  PatientAttributes,
  Performative,
  ProcedureAttributes,
  ProcedureConst
} from "rc-agents/framework/AgentEnums";

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
      ActionFrameIDs.DTA.REQUEST_DETAILS_DISPLAY,
      Performative.REQUEST,
      // Triggers VisualizeParameters action frame of UXSA
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
      await super.doActivity(agent);

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
  ActionFrameIDs.DTA.RETRIEVE_PATIENT_DETAILS
);

// Actionframe of the RequestDetailsDisplay class
const af_RequestDetailsDisplay = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_DETAILS_DISPLAY}`,
  [rule1, rule2],
  new RequestDetailsDisplay()
);

export default af_RequestDetailsDisplay;
