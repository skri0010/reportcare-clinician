import {
  Actionframe,
  Agent,
  Belief,
  Communicate,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import { Performative, ProcedureConst } from "agents-framework/Enums";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";

/**
 * Class to represent the activity for requesting the display of patient's medical records
 * This happens in Procedure HF Outcome Trends (HF-OTP-III)
 */
class RequestDisplayMedicalRecords extends Communicate {
  constructor() {
    super(
      ActionFrameIDs.DTA.REQUEST_DISPLAY_MEDICAL_RECORDS,
      Performative.REQUEST,
      //   Belief to trigger the UXSA action frame of DisplayMedicalRecords
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.MEDICAL_RECORDS_RETRIEVED,
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
      await super.doActivity(agent, [rule2]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_III,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.MEDICAL_RECORDS_RETRIEVED,
  true
);

// Actionframe
export const af_RequestDisplayMedicalRecords = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_DISPLAY_MEDICAL_RECORDS}`,
  [rule1, rule2],
  new RequestDisplayMedicalRecords()
);
