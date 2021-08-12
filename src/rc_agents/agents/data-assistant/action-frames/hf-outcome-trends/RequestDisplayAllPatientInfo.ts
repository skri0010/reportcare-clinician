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
 * Class to represent the activity for requesting display of retrieved patients' info.
 * This happens in Procedure HF Outcome Trends (HF-OTP-I).
 */
class RequestDisplayAllPatientInfo extends Communicate {
  constructor() {
    // Triggers DisplayAllPatientInfo of UXSA agent
    super(
      ActionFrameIDs.DTA.REQUEST_DISPLAY_ALL_PATIENT_INFO,
      Performative.REQUEST,
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.ALL_PATIENT_INFO_RETRIEVED,
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
  ActionFrameIDs.DTA.RETRIEVE_ALL_PATIENT_INFO_BY_ROLE
);
const rule3 = new ResettablePrecondition(
  AgentIDs.DTA,
  PatientAttributes.ALL_PATIENT_INFO_RETRIEVED,
  true
);

// Actionframe
export const af_RequestDisplayAllPatientInfo = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_DISPLAY_ALL_PATIENT_INFO}`,
  [rule1, rule2],
  new RequestDisplayAllPatientInfo()
);
