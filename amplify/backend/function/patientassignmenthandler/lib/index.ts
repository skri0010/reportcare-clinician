import { createNewEventResponse, EventResponse, prettify } from "./api/shared";
import {
  handleApprovedResolution,
  handleReassignedResolution,
  sharePatientAssignment
} from "./main";
import { getPatientAssignment, getClinicianInfo } from "./typed-api/queries";
import { ExpectedEvent, FieldName, Resolution } from "./types";

/* Amplify Params - DO NOT EDIT
	API_REPORTCARE_GRAPHQLAPIENDPOINTOUTPUT
	API_REPORTCARE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

export const handler = async (event: ExpectedEvent): Promise<EventResponse> => {
  let eventResponse = createNewEventResponse();
  console.log(prettify(event));

  try {
    // Handle patient assignment resolution
    if (
      event.typeName === "Query" &&
      event.fieldName === FieldName.HANDLE_PATIENT_ASSIGNMENT_RESOLUTION
    ) {
      // Check event arguments and credentials
      const clinicianID =
        event.identity.claims["cognito:username"] ||
        event.identity.claims.username;
      const patientID = event.arguments.patientID;
      const resolution = event.arguments.resolution;

      if (patientID && clinicianID && resolution) {
        // Get PatientAssignment record
        const getResult = await getPatientAssignment({
          patientID: patientID,
          clinicianID: clinicianID
        });

        if (getResult.data.getPatientAssignment) {
          const patientAssignment = getResult.data.getPatientAssignment;

          // Handle "APPROVED" resolution
          if (resolution === Resolution.APPROVED) {
            eventResponse = await handleApprovedResolution({
              clinicianID: clinicianID,
              patientID: patientID,
              resolution: Resolution.APPROVED
            });
          }

          // Handle "REASSIGNED" resolution
          else if (resolution === Resolution.REASSIGNED) {
            const reassignToClinicianID = event.arguments.reassignToClinicianID;

            if (reassignToClinicianID) {
              // Check that target clinicianID exists
              const getTargetResults = await getClinicianInfo({
                clinicianID: reassignToClinicianID
              });

              // Target clinician exists
              if (getTargetResults.data.getClinicianInfo) {
                eventResponse = await handleReassignedResolution({
                  clinicianID: clinicianID,
                  patientID: patientID,
                  patientName: patientAssignment.patientName,
                  reassignToClinicianID: reassignToClinicianID,
                  resolution: Resolution.REASSIGNED
                });
              } else {
                throw Error(
                  `Target clinicianID ${reassignToClinicianID} does not exist`
                );
              }
            } else {
              throw Error("Input did not specify reassignToClinicianID");
            }
          } else {
            throw Error(`Invalid resolution ${resolution}`);
          }
        } else {
          throw Error(prettify(getResult.errors));
        }
      } else {
        throw Error(
          `Missing variable. ClinicianID: ${clinicianID} PatientID: ${patientID} Resolution: ${resolution}`
        );
      }
    }

    // Share patient assignment
    else if (
      event.typeName === "Query" &&
      event.fieldName === FieldName.SHARE_PATIENT_ASSIGNMENT
    ) {
      // Check event arguments and credentials
      const clinicianID =
        event.identity.claims["cognito:username"] ||
        event.identity.claims.username;
      const patientsBelongingToClinician =
        event.identity.claims["cognito:groups"] || event.identity.claims.groups;
      const { patientID, patientName, shareToClinicianID } = event.arguments;

      if (
        clinicianID &&
        patientID &&
        patientName &&
        shareToClinicianID &&
        patientsBelongingToClinician.includes(patientID)
      ) {
        eventResponse = await sharePatientAssignment({
          clinicianID: clinicianID,
          patientID: patientID,
          patientName: patientName,
          shareToClinicianID: shareToClinicianID
        });
      } else {
        throw Error(
          `Missing variable or patient does belong to source clinician. ClinicianID: ${clinicianID} PatientID: ${patientID} Contains mapping: ${patientsBelongingToClinician}`
        );
      }
    }
  } catch (error) {
    console.log(error);
  }

  return eventResponse;
};
