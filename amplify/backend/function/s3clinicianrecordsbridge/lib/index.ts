import {
  createClinicianRecord,
  deleteClinicianRecord,
  updateClinicianRecord
} from "./typed-api/mutations";
import { getClinicianRecord } from "./typed-api/queries";
import {
  getPresignedUploadUrl,
  getPresignedDownloadUrl,
  deleteObject
} from "./s3Commands";
import {
  ExpectedEvent,
  QueryEvent,
  S3Level,
  S3Prefixes,
  VerifiedArgumentsType,
  RecordType
} from "./types";
import { createNewEventResponse, EventResponse, prettify } from "./api/shared";

/* Amplify Params - DO NOT EDIT
	API_REPORTCARE_GRAPHQLAPIENDPOINTOUTPUT
	API_REPORTCARE_GRAPHQLAPIIDOUTPUT
  STORAGE_S3CLINICIANRECORDS_BUCKETNAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const DELETE_GRACE_PERIOD = 2 * 24 * 60 * 60 * 1000;

export const handler = async (event: ExpectedEvent): Promise<Object> => {
  let eventResponse = createNewEventResponse();

  // Query
  if (event.typeName === "Query") {
    eventResponse = await handleQuery(event);
  }

  return eventResponse;
};

const handleQuery = async (queryEvent: QueryEvent): Promise<EventResponse> => {
  let eventResponse = createNewEventResponse();

  try {
    // Check field name and arguments
    if (
      queryEvent.fieldName === "queryS3ClinicianRecordsBridge" &&
      queryEvent.arguments
    ) {
      const { recordType, operation, patientID, documentID, documentTitle } =
        queryEvent.arguments;
      const expectedAttributes =
        recordType &&
        verifyRecordType(recordType) &&
        operation &&
        patientID &&
        documentID &&
        documentTitle;

      // Check argument attributes
      if (expectedAttributes) {
        // Check clinician authorised to patient
        const patientGroups =
          queryEvent.identity.claims["cognito:groups"] ||
          queryEvent.identity.claims.groups;
        if (
          queryEvent.identity.username &&
          patientGroups &&
          patientGroups.includes(patientID)
        ) {
          // Logging purposes
          console.log(JSON.stringify(queryEvent.arguments, null, 2));
          const path = `${S3Level}/${recordType}/${patientID}/${documentID}`;
          const verifiedArgs = {
            patientID: patientID,
            documentID: documentID,
            documentTitle: documentTitle,
            operation: operation,
            recordType: recordType as RecordType
          };

          // Handle "Upload"
          if (operation === "Upload") {
            eventResponse = await handleUpload({
              args: verifiedArgs,
              username: queryEvent.identity.username,
              path: path
            });
          }

          // Handle "Download"
          else if (operation === "Download") {
            // Create and return a presigned URL to download document
            eventResponse = await getPresignedDownloadUrl(path);
          }

          // Handle "Delete"
          else if (operation === "Delete") {
            eventResponse = await handleDelete({
              args: verifiedArgs,
              path: path
            });
          }

          // Handle "Acknowledge"
          else if (operation === "Acknowledge") {
            eventResponse = await handleAcknowledge({
              args: verifiedArgs
            });
          }

          // Invalid operation
          else {
            throw Error("Unrecognised operation");
          }
        } else {
          throw Error("Unauthorised");
        }
      } else {
        throw Error("Argument attributes do not match");
      }
    } else {
      throw Error("Unknown field name or arguments");
    }
  } catch (error) {
    console.log(error);
  }

  console.log(`Response: ${prettify(eventResponse)}`);

  return eventResponse;
};

const handleUpload: (parameters: {
  args: VerifiedArgumentsType;
  username: string;
  path: string;
}) => Promise<EventResponse> = async ({ args, username, path }) => {
  let eventResponse = createNewEventResponse();
  const { patientID, documentID, recordType, documentTitle } = args;

  try {
    // Create ClinicianRecord in DynamoDB
    const createResult = await createClinicianRecord({
      patientID: patientID,
      documentID: documentID,
      type: recordType,
      title: documentTitle,
      path: path,
      uploaderClinicianID: username
    });
    if (createResult.data?.createClinicianRecord) {
      // Create and return a presigned URL to upload document
      eventResponse = await getPresignedUploadUrl(path);
    } else {
      throw Error("Failed to create DynamoDB ClinicianRecord record");
    }
  } catch (error) {
    console.log(error);
  }
  return eventResponse;
};

const handleDelete: (parameters: {
  args: VerifiedArgumentsType;
  path: string;
}) => Promise<EventResponse> = async ({ args, path }) => {
  let eventResponse = createNewEventResponse();
  const { patientID, documentID, recordType, documentTitle } = args;

  try {
    // Get ClinicianRecord from DynamoDB
    const getResult = await getClinicianRecord({
      documentID: documentID,
      patientID: patientID
    });
    // Clinician record exists
    if (getResult.data.getClinicianRecord) {
      const { uploadDateTime } = getResult.data.getClinicianRecord;
      if (uploadDateTime) {
        // Delete is only allowed when under DELETE_GRACE_PERIOD
        const updateTimeInMs = new Date(uploadDateTime).valueOf();
        const currentTimeInMs = new Date().valueOf();
        const withinDeleteGracePeriod =
          currentTimeInMs - updateTimeInMs < DELETE_GRACE_PERIOD;
        if (withinDeleteGracePeriod) {
          // Delete the S3 object
          const deleteSuccess = await deleteObject(path);
          if (deleteSuccess) {
            // Delete the DynamoDB ClinicianRecord
            const deleteMutation = await deleteClinicianRecord({
              documentID: documentID,
              patientID: patientID,
            });
            if (deleteMutation.data?.deleteClinicianRecord) {
              // Successful event response
              eventResponse = {
                success: true
              };
            } else {
              throw Error(
                `Failed to delete ClinicianRecord for { documentID: ${documentID}, patientID: ${patientID}}. ${prettify(
                  deleteMutation.errors
                )}`
              );
            }
          }
        } else {
          throw Error(
            `Delete period has passed for document ${documentID} for patient ${patientID}`
          );
        }
      } else {
        throw Error(
          "Invalid record candidate for deletion. No upload date time"
        );
      }
    }
    // ClincianRecord already does not exist
    else if (!getResult.errors) {
      // Successful event response
      eventResponse = {
        success: true
      };
    }
    // Error is thrown
    else {
      throw Error(
        `Failed to get clinician record to check for deletion grace period. Error: ${prettify(
          getResult.errors
        )}`
      );
    }
  } catch (error) {
    console.log(error);
  }

  return eventResponse;
};

const handleAcknowledge: (parameters: {
  args: VerifiedArgumentsType;
}) => Promise<EventResponse> = async ({ args }) => {
  let eventResponse = createNewEventResponse();
  const { patientID, documentID, recordType, documentTitle } = args;

  try {
    // Update DynamoDB ClinicianRecord with uploaderClinicianID and uploadDateTime
    const updateResult = await updateClinicianRecord({
      patientID: patientID,
      documentID: documentID,
      uploadDateTime: new Date().toISOString()
    });
    if (updateResult.data?.updateClinicianRecord) {
      // Successful event response
      eventResponse = { success: true };
    } else {
      throw Error(
        `Failed to acknowledge document upload through updating DynamoDB record. ${prettify(
          updateResult.errors
        )}`
      );
    }
  } catch (error) {
    console.log(error);
  }

  return eventResponse;
};

const verifyRecordType = (recordType: string) => {
  return S3Prefixes.includes(recordType);
};
