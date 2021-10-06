import {
  createClinicianRecord,
  updateClinicianRecord
} from "./typed-api/mutations";
import { getPresignedUploadUrl, getPresignedDownloadUrl } from "./s3Commands";
import {
  ExpectedEvent,
  QueryEvent,
  S3Level,
  S3Prefixes,
  PresignedUrlObjectResponse
} from "./types";

/* Amplify Params - DO NOT EDIT
	API_REPORTCARE_GRAPHQLAPIENDPOINTOUTPUT
	API_REPORTCARE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

export const handler = async (event: ExpectedEvent): Promise<Object> => {
  let presignedUrlObjectResponse: PresignedUrlObjectResponse = {
    success: false
  };

  // Query
  if (event.typeName === "Query") {
    presignedUrlObjectResponse = await handleQuery(event);
  }

  return presignedUrlObjectResponse;
};

const handleQuery = async (
  queryEvent: QueryEvent
): Promise<PresignedUrlObjectResponse> => {
  let presignedUrlObjectResponse: PresignedUrlObjectResponse = {
    success: false
  };

  try {
    // Check field name and arguments
    if (
      queryEvent.fieldName === "getPresignedUrlForClinicianRecords" &&
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
        if (
          queryEvent.identity.username &&
          queryEvent.identity.claims["cognito:groups"].includes(patientID)
        ) {
          // Logging purposes
          console.log(JSON.stringify(queryEvent.arguments, null, 2));
          const path = `${S3Level}/${recordType}/${patientID}/${documentID}`;

          // Handle "Upload"
          if (operation === "Upload") {
            const createResult = await createClinicianRecord({
              patientID: patientID,
              documentID: documentID,
              type: recordType,
              title: documentTitle,
              path: path,
              uploaderClinicianID: queryEvent.identity.username
            });
            if (createResult.data?.createClinicianRecord) {
              // Create and return a presigned URL to upload document
              presignedUrlObjectResponse = await getPresignedUploadUrl(path);
            } else {
              throw Error("Failed to create DynamoDB ClinicianRecord record");
            }
          }
          // Handle "Download"
          else if (operation === "Download") {
            // Create and return a presigned URL to download document
            presignedUrlObjectResponse = await getPresignedDownloadUrl(path);
          } else if (operation === "Acknowledge") {
            // Update DynamoDB record with uploaderClinicianID and uploadDateTime
            const updateResult = await updateClinicianRecord({
              patientID: patientID,
              documentID: documentID,
              uploadDateTime: new Date().toISOString()
            });
            if (updateResult.data?.updateClinicianRecord) {
              presignedUrlObjectResponse = { success: true };
            } else {
              throw Error(
                "Failed to acknowledge document upload through updating DynamoDB record"
              );
            }
          } else {
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
  } catch (error: any) {
    console.log(error);
  }

  return presignedUrlObjectResponse;
};

const verifyRecordType = (recordType: string) => {
  return S3Prefixes.includes(recordType);
};
