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
  setFetchingMedicalRecords,
  setMedicalRecords
} from "ic-redux/actions/agents/patientActionCreator";
import { MedicalRecord } from "aws/API";

/**
 * Class to represent the activity for displaying patient's medical records
 * This happens in Procedure HF Outcome Trends (HF-OTP-III)
 */
class DisplayMedicalRecords extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_MEDICAL_RECORDS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    // Get retrieved medical records from facts
    const medicalRecords: MedicalRecord[] =
      agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
        PatientAttributes.MEDICAL_RECORDS
      ];

    if (medicalRecords) {
      // Dispatch medical records to store
      store.dispatch(setMedicalRecords(medicalRecords));

      // Update Facts
      // Remove item
      agentAPI.addFact(
        new Belief(BeliefKeys.PATIENT, PatientAttributes.MEDICAL_RECORDS, null),
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
    store.dispatch(setFetchingMedicalRecords(false));
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
export const af_DisplayMedicalRecords = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_MEDICAL_RECORDS}`,
  [rule1, rule2],
  new DisplayMedicalRecords()
);
