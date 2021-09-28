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
import { createMedicalRecord } from "aws";
import { CreateMedicalRecordInput, MedicalRecord } from "aws/API";
import { LocalStorage } from "rc_agents/storage";
import {
  setCreateMedicalRecordSuccessful,
  setCreatingMedicalRecord
} from "ic-redux/actions/agents/actionCreator";
import { store } from "util/useRedux";
import { MedicalRecordInput } from "rc_agents/model";
import { Storage } from "@aws-amplify/storage";
import { v4 as uuidv4 } from "uuid";

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
      const medicalRecordInput: MedicalRecordInput =
        facts[BeliefKeys.PATIENT]?.[PatientAttributes.MEDICAL_RECORD_TO_CREATE];

      if (medicalRecordInput) {
        // Indicator of whether create is successful
        let createSuccessful = false;
        let medicalRecord: MedicalRecord | undefined;

        // Ensure that device is online
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Store file to S3 bucket and insert a record to DynamoDB
          const insertResult = await insertMedicalRecord(medicalRecordInput);
          if (insertResult) {
            createSuccessful = true;
            medicalRecord = insertResult;
          }
        }

        if (createSuccessful && medicalRecord) {
          // Dispatch to front end that create is successful
          store.dispatch(setCreateMedicalRecordSuccessful(true));

          // Add new medical record into the existing list of medical records
          let existingMedicalRecords = store.getState().agents.medicalRecords;
          if (!existingMedicalRecords) {
            existingMedicalRecords = [];
          }
          existingMedicalRecords.unshift(medicalRecord);

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

/**
 * Uploads medical record file to S3 bucket and inserts a record into DynamoDB
 * @param medicalRecordInput medical record input
 * @returns medical record created if both upload and insert are successful, null otherwise.
 */
export const insertMedicalRecord = async (
  medicalRecordInput: MedicalRecordInput
): Promise<MedicalRecord | null> => {
  // Indicator of whether medical record is successfully created
  let createSuccessful = false;
  let medicalRecord: MedicalRecord | undefined;

  // Retrieves locally stored clinicianID
  const clinicianID = await LocalStorage.getClinicianID();

  if (clinicianID) {
    const medicalRecordFile = medicalRecordInput.file;

    // Generates unique ID as part of file key to prevent overwriting another file with the same name
    const fileID = `${medicalRecordFile.name}_${uuidv4()}`;
    // Upload file to S3 bucket
    await Storage.put(fileID, medicalRecordFile, {
      contentType: medicalRecordFile.type,
      level: "private"
    })
      .then(async () => {
        // File is successfully uploaded - create a record in DynamoDB
        const input: CreateMedicalRecordInput = {
          title: medicalRecordInput.title,
          patientID: medicalRecordInput.patientID,
          clinicianID: clinicianID,
          fileKey: fileID
        };
        try {
          const createResponse = await createMedicalRecord(input);
          if (createResponse.data.createMedicalRecord) {
            medicalRecord = createResponse.data.createMedicalRecord;
            createSuccessful = true;
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(error);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
  }

  if (createSuccessful && medicalRecord) {
    // Stores medical record locally
    await LocalStorage.setPatientMedicalRecords([medicalRecord]);
    return medicalRecord;
  }

  return null;
};

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
