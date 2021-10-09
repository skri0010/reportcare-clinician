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
  setCreatingMedicalRecord,
  setPatientDetails
} from "ic-redux/actions/agents/actionCreator";
import { store } from "util/useRedux";
import { ClinicianRecordInput } from "rc_agents/model";
import { uploadPDF } from "util/pdfUtilities";
import { LocalStorage } from "rc_agents/storage";

/**
 * Represents the activity for creating a patient's medical record.
 * This happens in Procedure App-Medical Records Device Configuration (MRDC) - P-RB.
 * Triggered directly when clinician uploads patient's medical record.
 */
class CreateMedicalRecord extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.CREATE_MEDICAL_RECORD);
  }

  /**
   * Performs the activity
   * @param {Agent} agent current agent
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
        // Ensure that device is online
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Upload the file
          const newMedicalRecord = await uploadPDF({
            recordInput: medicalRecordInput,
            recordType: "Medical"
          });

          if (newMedicalRecord) {
            // Add new medical record into the existing list of medical records in patient details
            const existingPatientDetails =
              store.getState().agents.patientDetails;
            if (existingPatientDetails) {
              const existingMedicalRecords =
                existingPatientDetails.medicalRecords;
              existingMedicalRecords.unshift(newMedicalRecord);
              existingPatientDetails.medicalRecords = existingMedicalRecords;

              // Dispatch updated patient details
              store.dispatch(setPatientDetails(existingPatientDetails));
            }

            // Remove medical record input from facts
            agentAPI.addFact(
              new Belief(
                BeliefKeys.PATIENT,
                PatientAttributes.MEDICAL_RECORD_TO_CREATE,
                null
              ),
              false
            );

            // End the procedure
            agentAPI.addFact(
              new Belief(
                BeliefKeys.PROCEDURE,
                ProcedureAttributes.MRDC,
                ProcedureConst.INACTIVE
              ),
              true,
              true
            );

            // Dispatch to front end that create is successful
            store.dispatch(setCreateMedicalRecordSuccessful(true));

            // Stores record locally
            await LocalStorage.setMedicalRecord(newMedicalRecord);
          }
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
          ProcedureAttributes.MRDC,
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
  ProcedureAttributes.MRDC,
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
