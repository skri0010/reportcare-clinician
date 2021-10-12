import { handleApprovedResolution, handleReassignedResolution } from "./main";
import { getPatientAssignment, getClinicianInfo } from "./typed-api/queries";
import { EventResponse, ExpectedEvent, Resolution } from "./types";
import { createNewEventResponse, prettify } from "./utility";

/* Amplify Params - DO NOT EDIT
	API_REPORTCARE_GRAPHQLAPIENDPOINTOUTPUT
	API_REPORTCARE_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

export const handler = async (event: ExpectedEvent): Promise<EventResponse> => {
  let eventResponse = createNewEventResponse();
  console.log(prettify(event));

  // Check event
  if (
    event.typeName === "Query" &&
    event.fieldName === "handlePatientAssignment"
  ) {
    // Check event variables and credentials
    const clinicianID = event.identity["cognito:username"];
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
            patientID: patientID
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
                reassignToClinicianID: reassignToClinicianID
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
        throw Error("Failed to retrieve patient assignment");
      }
    }
  }

  return eventResponse;
};
