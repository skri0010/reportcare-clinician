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
import { createIcdCrtRecord, StorageFolderPath } from "aws";
import { CreateIcdCrtRecordInput, IcdCrtRecord } from "aws/API";
import { LocalStorage } from "rc_agents/storage";
import {
  setCreateIcdCrtRecordSuccessful,
  setCreatingIcdCrtRecord,
  setPatientDetails
} from "ic-redux/actions/agents/actionCreator";
import { store } from "util/useRedux";
import { IcdCrtRecordInput } from "rc_agents/model";
import { Storage } from "@aws-amplify/storage";
import { v4 as uuidv4 } from "uuid";

/**
 * Represents the activity for creating a patient's ICD/CRT record.
 * This happens in Procedure App-Medical Records Device Configuration (MRDC) - P-RB.
 * Triggered directly when clinician uploads patient's ICD/CRT record.
 */
class CreateIcdCrtRecord extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.CREATE_ICDCRT_RECORD);
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
      // Get ICD/CRT record input from facts
      const icdCrtRecordInput: IcdCrtRecordInput =
        facts[BeliefKeys.PATIENT]?.[PatientAttributes.ICDCRT_RECORD_TO_CREATE];

      if (icdCrtRecordInput) {
        // Indicator of whether create is successful
        let createSuccessful = false;
        let icdCrtRecord: IcdCrtRecord | undefined;

        // Ensure that device is online
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Store file to S3 bucket and insert a record to DynamoDB
          const insertResult = await insertIcdCrtRecord(icdCrtRecordInput);
          if (insertResult) {
            createSuccessful = true;
            icdCrtRecord = insertResult;
          }
        }

        if (createSuccessful && icdCrtRecord) {
          // Dispatch to front end that create is successful
          store.dispatch(setCreateIcdCrtRecordSuccessful(true));

          // Add new ICD/CRT record into the existing list of ICD/CRT records in patient details
          const existingPatientDetails = store.getState().agents.patientDetails;
          if (existingPatientDetails) {
            const existingIcdCrtRecords = existingPatientDetails.icdCrtRecords;
            existingIcdCrtRecords.unshift(icdCrtRecord);
            existingPatientDetails.icdCrtRecords = existingIcdCrtRecords;

            // Dispatch updated patient details
            store.dispatch(setPatientDetails(existingPatientDetails));
          }

          // Remove ICD/CRT record input from facts
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.ICDCRT_RECORD_TO_CREATE,
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
        }
      }
      // Dispatch to front end that create has ended
      store.dispatch(setCreatingIcdCrtRecord(false));
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
      store.dispatch(setCreatingIcdCrtRecord(false));
    }
  }
}

/**
 * Uploads ICD/CRT record file to S3 bucket and inserts a record into DynamoDB
 * @param icdCrtRecordInput ICD/CRT record input
 * @returns ICD/CRT record created if both upload and insert are successful, null otherwise.
 */
export const insertIcdCrtRecord = async (
  icdCrtRecordInput: IcdCrtRecordInput
): Promise<IcdCrtRecord | null> => {
  // Indicator of whether ICD/CRT record is successfully created
  let createSuccessful = false;
  let icdCrtRecord: IcdCrtRecord | undefined;

  // Retrieves locally stored clinicianID
  const clinicianID = await LocalStorage.getClinicianID();

  if (clinicianID) {
    const icdCrtRecordFile = icdCrtRecordInput.file;

    // Generates unique ID as part of file key to prevent overwriting another file with the same name
    const fileID = `${icdCrtRecordFile.name}_${uuidv4()}`;

    // Upload file to S3 bucket
    await Storage.put(
      `${StorageFolderPath.ICDCRT_RECORDS}${fileID}`,
      icdCrtRecordFile,
      {
        contentType: icdCrtRecordFile.type,
        level: "protected"
      }
    )
      .then(async () => {
        // File is successfully uploaded - create a record in DynamoDB
        const input: CreateIcdCrtRecordInput = {
          title: icdCrtRecordInput.title,
          patientID: icdCrtRecordInput.patientID,
          dateTime: icdCrtRecordInput.dateTime,
          clinicianID: clinicianID,
          fileKey: fileID
        };
        try {
          const createResponse = await createIcdCrtRecord(input);
          if (createResponse.data.createIcdCrtRecord) {
            icdCrtRecord = createResponse.data.createIcdCrtRecord;
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

  if (createSuccessful && icdCrtRecord) {
    // Stores ICD/CRT record locally
    await LocalStorage.setPatientIcdCrtRecord(icdCrtRecord);
    return icdCrtRecord;
  }

  return null;
};

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.MRDC,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.CREATE_ICDCRT_RECORD,
  true
);

// Actionframe
export const af_CreateIcdCrtRecord = new Actionframe(
  `AF_${ActionFrameIDs.DTA.CREATE_ICDCRT_RECORD}`,
  [rule1, rule2],
  new CreateIcdCrtRecord()
);
