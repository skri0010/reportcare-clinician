import {
  Actionframe,
  Agent,
  Belief,
  Communicate,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import {
  CommonAttributes,
  Performative,
  ProcedureConst
} from "agents-framework/Enums";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";

/**
 * Class to represent the activity for requesting the display of patient's ICD/CRT record content
 * This happens in Procedure HF Outcome Trends (HF-OTP-IV)
 */
class RequestDisplayIcdCrtRecordContent extends Communicate {
  constructor() {
    super(
      ActionFrameIDs.DTA.REQUEST_DISPLAY_ICDCRT_RECORD_CONTENT,
      Performative.REQUEST,
      //   Belief to trigger the UXSA action frame of DisplayIcdCrtRecordContent
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.ICDCRT_RECORD_CONTENT_RETRIEVED,
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
  ProcedureAttributes.HF_OTP_IV,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.DTA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.DTA.RETRIEVE_ICDCRT_RECORD_CONTENT
);
const rule3 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.ICDCRT_RECORD_CONTENT_RETRIEVED,
  true
);

// Actionframe
export const af_RequestDisplayIcdCrtRecordContent = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_DISPLAY_ICDCRT_RECORD_CONTENT}`,
  [rule1, rule2, rule3],
  new RequestDisplayIcdCrtRecordContent()
);
