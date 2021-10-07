import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import {
  setCreateMedicalRecordSuccessful,
  setCreatingMedicalRecord
} from "ic-redux/actions/agents/actionCreator";
import { store } from "util/useRedux";
import { ClinicianRecordInput } from "rc_agents/model";
import { uploadPDF } from "util/pdfUtilities";
import { ClinicianRecord } from "aws/API";

/**
 * Class to represent an activity for creating a patient's medical record.
 * This happens in Procedure HF Outcome Trends (HF-OTP-III).
 */
class CreateMedicalRecord extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.CREATE_MEDICAL_RECORD);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    // Reset preconditions
    await super.doActivity(agent, [rule2]);

    try {
      const facts = agentAPI.getFacts();
      // Get medical record input from facts
      const medicalRecordInput: ClinicianRecordInput =
        facts[BeliefKeys.PATIENT]?.[PatientAttributes.MEDICAL_RECORD_TO_CREATE];

      if (medicalRecordInput) {
        let newMedicalRecord: ClinicianRecord | undefined;

        // Ensure that device is online
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Upload the file
          newMedicalRecord = await uploadPDF({
            recordInput: medicalRecordInput,
            recordType: "Medical"
          });
        }

        if (newMedicalRecord) {
          // Dispatch to front end that create is successful
          store.dispatch(setCreateMedicalRecordSuccessful(true));

          // Add new medical record into the existing list of medical records
          let existingMedicalRecords = store.getState().agents.medicalRecords;
          if (!existingMedicalRecords) {
            existingMedicalRecords = [];
          }
          existingMedicalRecords.unshift(newMedicalRecord);

          // Update Facts
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.MEDICAL_RECORDS,
              existingMedicalRecords
            ),
            false
          );
          // Trigger request to dispatch medical records to UXSA for frontend display
          agent.addBelief(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.MEDICAL_RECORDS_RETRIEVED,
              true
            )
          );
          // Remove medical record input from facts
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.MEDICAL_RECORD_TO_CREATE,
              null
            ),
            false
          );
        }
      }
      // Dispatch to front end that create has ended
      store.dispatch(setCreatingMedicalRecord(false));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

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
      // Dispatch to front end that create has ended
      store.dispatch(setCreatingMedicalRecord(false));
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
  PatientAttributes.CREATE_MEDICAL_RECORD,
  true
);

// Actionframe
export const af_CreateMedicalRecord = new Actionframe(
  `AF_${ActionFrameIDs.DTA.CREATE_MEDICAL_RECORD}`,
  [rule1, rule2],
  new CreateMedicalRecord()
);
