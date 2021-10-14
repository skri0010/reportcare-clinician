import { EventResponse, Pending, Resolution } from "./types";
import { createNewEventResponse } from "./utility";
import {
  getClinicianPatientMap,
  getPatientAssignment
} from "./typed-api/queries";
import {
  createClinicianPatientMap,
  createPatientAssignment
} from "./typed-api/createMutations";
import { updatePatientAssignment } from "./typed-api/updateMutations";

export const handleApprovedResolution: (input: {
  clinicianID: string;
  patientID: string;
  resolution: Resolution;
}) => Promise<EventResponse> = async ({
  clinicianID,
  patientID,
  resolution
}) => {
  const successMessage = `Successfully handled approved resolution for PatientAssignment ${keysAsString(
    patientID,
    clinicianID
  )}`;
  let eventResponse = createNewEventResponse();

  try {
    let mapExists = false;

    // Check if ClinicianPatientMap already exists
    const getResult = await getClinicianPatientMap({
      patientID: patientID,
      clinicianID: clinicianID
    });

    // ClinicianPatientMap already exists
    if (getResult.data.getClinicianPatientMap) {
      mapExists = true;
    }
    // ClinicianPatientMap does not exist (if no errors). Create new ClinicianPatientMap
    else if (!getResult.errors) {
      const createResult = await createClinicianPatientMap({
        patientID: patientID,
        clinicianID: clinicianID
      });

      if (createResult.data.createClinicianPatientMap) {
        mapExists = true;
      } else {
        throw Error("Failed to create ClinicianPatientMap");
      }
    } else {
      throw new Error(prettify(getResult.errors));
    }

    if (mapExists) {
      // Update source PatientAssignment
      eventResponse = await updateSourcePatientAssignment({
        patientID,
        sourceClinicianID: clinicianID,
        successMessage,
        resolution
      });
    }
  } catch (error) {
    // Print error message
    const errorMessage = `${error}\n${keysAsString(patientID, clinicianID)}`;
    console.log(errorMessage);
  }

  return eventResponse;
};

export const handleReassignedResolution: (input: {
  clinicianID: string;
  patientID: string;
  patientName: string;
  reassignToClinicianID: string;
  resolution: Resolution;
}) => Promise<EventResponse> = async ({
  clinicianID,
  patientID,
  patientName,
  reassignToClinicianID,
  resolution
}) => {
  let eventResponse = createNewEventResponse();
  const successMessage = `Successfully handled reassign resolution for PatientAssignment ${keysAsString(
    patientID,
    clinicianID
  )} to ${keysAsString(patientID, reassignToClinicianID)}`;

  let reassignedToTarget = false;

  try {
    // Check if target PatientAssignment already exists
    const getResult = await getPatientAssignment({
      patientID: patientID,
      clinicianID: reassignToClinicianID
    });

    // Target PatientAssignment already exists
    if (getResult.data.getPatientAssignment) {
      const targetPatientAssignment = getResult.data.getPatientAssignment;

      // If target PatientAssignment resolution is REASSIGNED, convert to null, add PENDING and source clinicianID
      if (targetPatientAssignment.resolution === Resolution.REASSIGNED) {
        // Update target PatientAssignment to PENDING, remove resolution, add source
        const updateResult = await updatePatientAssignment({
          patientID: patientID,
          clinicianID: reassignToClinicianID,
          _version: targetPatientAssignment._version,
          pending: Pending,
          resolution: null, // Update back to null
          sourceClinicianID: clinicianID // Indicate source clinicianID
        });

        if (updateResult.data.updatePatientAssignment) {
          // Update flag for target reassignment
          reassignedToTarget = true;
        } else {
          throw Error(
            "Failed to update target PatientAssignment\n" +
              keysAsString(patientID, reassignToClinicianID)
          );
        }
      }

      // Otherwise target PatientAssignment PENDING or resolution is APPROVED
      else {
        // Update flag for target reassignment
        reassignedToTarget = true;
      }
    }

    // Otherwise create new target PatientAssignment (if no errors)
    else if (!getResult.errors) {
      const result = await createPatientAssignment({
        patientID: patientID,
        clinicianID: reassignToClinicianID,
        patientName: patientName,
        pending: Pending,
        sourceClinicianID: clinicianID // Indicate source clinicianID
      });

      if (result.data.createPatientAssignment) {
        // Update flag for target reassignment
        reassignedToTarget = true;
      } else {
        throw Error("Failed to create target PatientAssignment");
      }
    } else {
      console.log(getResult.errors.length);
      throw Error("Failed to check whether target PatientAssignment exists");
    }

    // Check flag for target reassignment
    if (reassignedToTarget) {
      // Update source PatientAssignment
      eventResponse = await updateSourcePatientAssignment({
        patientID,
        sourceClinicianID: clinicianID,
        successMessage,
        resolution
      });
    }
  } catch (error) {
    // Print error message
    const errorMessage = `${error}\n${keysAsString(patientID, clinicianID)}`;
    console.log(errorMessage);
  }

  return eventResponse;
};

const updateSourcePatientAssignment: (input: {
  patientID: string;
  sourceClinicianID: string;
  successMessage: string;
  resolution: Resolution;
}) => Promise<EventResponse> = async ({
  patientID,
  sourceClinicianID,
  successMessage,
  resolution
}) => {
  let eventResponse = createNewEventResponse();

  // Get and update source PatientAssignment
  try {
    const getResult = await getPatientAssignment({
      patientID: patientID,
      clinicianID: sourceClinicianID
    });
    if (getResult.data.getPatientAssignment) {
      const sourcePatientAssignment = getResult.data.getPatientAssignment;
      const updateResult = await updatePatientAssignment({
        patientID: patientID,
        clinicianID: sourceClinicianID,
        resolution: resolution,
        _version: sourcePatientAssignment._version
      });
      if (updateResult.data.updatePatientAssignment) {
        // Print success message and update event response
        console.log(successMessage);
        eventResponse = { success: true };
      } else {
        throw Error("Failed to update source PatientAssignment");
      }
    } else {
      throw Error("Failed to query source PatientAssignment");
    }
  } catch (error) {
    // Print error message
    const errorMessage = `${error}\n${keysAsString(
      patientID,
      sourceClinicianID
    )}`;
    console.log(errorMessage);
  }
  return eventResponse;
};

const keysAsString = (patientID: string, clinicianID: string) => {
  return `\npatientID (partition key): ${patientID}\nclinicianID (sort key): ${clinicianID}`;
};

const prettify = (item: any) => {
  return JSON.stringify(item, null, 2);
};
