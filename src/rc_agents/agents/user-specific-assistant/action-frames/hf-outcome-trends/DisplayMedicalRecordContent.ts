import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import {
  ActionFrameIDs,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { store } from "util/useRedux";
import {
  setFetchingMedicalRecordContent,
  setMedicalRecordContent
} from "ic-redux/actions/agents/patientActionCreator";

/**
 * Class to represent the activity for displaying patient's medical record content
 * This happens in Procedure HF Outcome Trends (HF-OTP-III)
 */
class DisplayMedicalRecordContent extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_MEDICAL_RECORD_CONTENT);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    // Get retrieved medical record content from facts
    const medicalRecordContentURL: string =
      agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
        PatientAttributes.MEDICAL_RECORD_CONTENT
      ];

    if (medicalRecordContentURL) {
      // Dispatch medical record content to store
      store.dispatch(setMedicalRecordContent(medicalRecordContentURL));

      // Update Facts
      // Remove medical record content from facts
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PATIENT,
          PatientAttributes.MEDICAL_RECORD_CONTENT,
          null
        ),
        false
      );

      // End the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.HF_OTP_III,
          ProcedureConst.INACTIVE
        ),
        true,
        true
      );
    }

    // Dispatch to store to indicate that fetching has ended
    store.dispatch(setFetchingMedicalRecordContent(false));
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
  PatientAttributes.MEDICAL_RECORD_CONTENT_RETRIEVED,
  true
);

// Actionframe
export const af_DisplayMedicalRecordContent = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_MEDICAL_RECORD_CONTENT}`,
  [rule1, rule2],
  new DisplayMedicalRecordContent()
);
