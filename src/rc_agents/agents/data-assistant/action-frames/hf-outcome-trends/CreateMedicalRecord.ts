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
  setRetryLaterTimeout,
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
import { agentNWA } from "rc_agents/agents";
import { MedicalRecordInput } from "rc_agents/model";
import { Storage } from "@aws-amplify/storage";

/**
 * Class to represent an activity for creating a patient's medical record.
 * This happens in Procedure HF Outcome Trends (HF-OTP-II).
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
      // Get medical record input from facts
      const medicalRecordInput: MedicalRecordInput =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.MEDICAL_RECORD_TO_CREATE
        ];
      // Get online status from facts
      const isOnline =
        agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      if (medicalRecordInput) {
        // Indicator of whether create is successful
        let createSuccessful = false;

        // Device is online
        if (isOnline) {
          // Store file to S3 bucket and insert a record to DynamoDB
          createSuccessful = await insertMedicalRecord(medicalRecordInput);
        }
        // Device is offline: store medical record locally
        else if (!isOnline) {
          // TODO: store into local storage
          createSuccessful = true;

          // Notifies NWA of the medical record to sync
          agentNWA.addBelief(
            new Belief(
              BeliefKeys.APP,
              AppAttributes.SYNC_CREATE_MEDICAL_RECORDS,
              true
            )
          );
        }

        if (createSuccessful) {
          // Dispatch to front end that create is successful
          store.dispatch(setCreateMedicalRecordSuccessful(true));
        }
      }
      // Dispatch to front end that create has been completed
      store.dispatch(setCreatingMedicalRecord(false));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // Set to retry later
      setRetryLaterTimeout(() => {
        agent.addBelief(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.CREATE_MEDICAL_RECORD,
            true
          )
        );
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PROCEDURE,
            ProcedureAttributes.HF_OTP_II,
            ProcedureConst.ACTIVE
          )
        );
      });

      // Update Facts
      // End the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.HF_OTP_II,
          ProcedureConst.INACTIVE
        ),
        true,
        true
      );
      // Dispatch to front end that create has been completed
      store.dispatch(setCreatingMedicalRecord(false));
    }
  }
}

/**
 * Uploads medical record file to S3 bucket and inserts a record into DynamoDB
 * @param medicalRecordInput medical record input
 * @returns true if both upload and insert are successful, false otherwise.
 */
export const insertMedicalRecord = async (
  medicalRecordInput: MedicalRecordInput
): Promise<boolean> => {
  // Indicator of whether medical record is successfully created
  let createSuccessful = false;
  let medicalRecord: MedicalRecord | undefined;

  const medicalRecordFile = medicalRecordInput.file;
  // Store file to S3 bucket
  await Storage.put(medicalRecordFile.name, medicalRecordFile, {
    contentType: medicalRecordFile.type,
    level: "private"
  })
    .then(async () => {
      // File is successfully pushed to S3 bucket - create a record in DynamoDB
      const input: CreateMedicalRecordInput = {
        title: medicalRecordInput.title,
        patientID: medicalRecordInput.patientID,
        fileKey: medicalRecordFile.name
      };
      const createResponse = await createMedicalRecord(input);
      if (createResponse.data.createMedicalRecord) {
        createSuccessful = true;
        medicalRecord = createResponse.data.createMedicalRecord;
      }
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });

  if (createSuccessful && medicalRecord) {
    // Stores medical record locally
    await LocalStorage.setPatientMedicalRecord(medicalRecord);
  }
  return createSuccessful;
};

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_II,
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
