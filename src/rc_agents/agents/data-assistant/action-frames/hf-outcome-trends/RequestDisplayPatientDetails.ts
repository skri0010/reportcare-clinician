import {
  Actionframe,
  Agent,
  Belief,
  Communicate,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  CommonAttributes,
  PatientAttributes,
  Performative,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";

/**
 * Class to represent the activity for requesting display of retrieved patient's details.
 * This happens in Procedure HF Outcome Trends (HF-OTP-II).
 */
class RequestDisplayPatientDetails extends Communicate {
  constructor() {
    // Triggers VisualizeParameters action frame of UXSA
    super(
      ActionFrameIDs.DTA.REQUEST_DISPLAY_PATIENT_DETAILS,
      Performative.REQUEST,
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.PATIENT_DETAILS_RETRIEVED,
        true
      ),
      [AgentIDs.UXSA]
    );
  }

  /**
   * Perform the activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    try {
      // Reset preconditions
      await super.doActivity(agent, [rule3]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions
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
const rule3 = new ResettablePrecondition(
  AgentIDs.DTA,
  PatientAttributes.PATIENT_DETAILS_RETRIEVED,
  true
);

// Actionframe
export const af_RequestDisplayPatientDetails = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_DISPLAY_PATIENT_DETAILS}`,
  [rule1, rule2],
  new RequestDisplayPatientDetails()
);
