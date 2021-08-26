import {
  Actionframe,
  Agent,
  Belief,
  Communicate,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  CommonAttributes,
  Performative,
  ProcedureConst
} from "rc_agents/framework/Enums";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";

/**
 * Class to represent the activity for requesting the display of alert history
 * This happens in Procedure HF Outcome Trends (HF-OTP-II)
 */
class RequestDisplayAlertHistory extends Communicate {
  constructor() {
    super(
      ActionFrameIDs.DTA.REQUEST_DISPLAY_ALERT_HISTORY,
      Performative.REQUEST,
      //   Belief to trigger the UXSA action frame of DisplayAlertHistory
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.PATIENT_ALERT_HISTORY_RETRIEVED,
        true
      ),
      [AgentIDs.UXSA]
    );
  }

  /**
   * Perform this activity
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
  ActionFrameIDs.DTA.RETRIEVE_ALERT_HISTORY
);
const rule3 = new ResettablePrecondition(
  AgentIDs.DTA,
  PatientAttributes.PATIENT_ALERT_HISTORY_RETRIEVED,
  true
);

// Actionframe
export const af_RequestDisplayAlertHistory = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_DISPLAY_ALERT_HISTORY}`,
  [rule1, rule2],
  new RequestDisplayAlertHistory()
);
