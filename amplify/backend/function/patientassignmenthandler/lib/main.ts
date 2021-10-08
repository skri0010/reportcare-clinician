import {
  ResolutionEvent,
  Resolution,
  StringObject,
  PromiseResolution,
  Pending
} from "./types";
import {
  getResolution,
  validateID,
  validatePendingUpdate,
  prettyPrint
} from "./utility";
import {
  getClinicianPatientMap,
  getPatientAssignment
} from "./typed-api/queries";
import {
  createClinicianPatientMap,
  createPatientAssignment
} from "./typed-api/createMutations";
import { updatePatientAssignment } from "./typed-api/updateMutations";

export const handlePatientAssignmentResolution = async (
  event: ResolutionEvent
): Promise<string> => {
  // Stats to be returned
  let returnMessages = ["Successfully processed records"];
  let totalCount: number | null = null;
  let successCount: number | null = null;
  let errorOccured: boolean = false;

  let promises: Promise<PromiseResolution>[] | undefined;
  // Check: records exists and length > 0
  if (event.Records && event.Records.length > 0) {
    // Iterate through every record
    promises = event.Records.map((record) => {
      let returnPromise: Promise<PromiseResolution> | undefined;
      // Check: record event is MODIFY
      if (record.eventName === "MODIFY") {
        // Check: dynamodb value exists
        if (record.dynamodb) {
          const { Keys, NewImage, OldImage } = record.dynamodb;
          const { patientID, clinicianID } = Keys;
          const {
            patientID: newPatientID,
            clinicianID: newClinicianID,
            patientName,
            reassignToClinicianID,
            resolution: newResolution,
            pending: newPending
          } = NewImage;
          const {
            patientID: oldPatientID,
            clinicianID: oldClinicianID,
            resolution: oldResolution,
            pending: oldPending
          } = OldImage;
          // Check: PatientID and ClinicianID is the same
          // Check: New pending should be null/undefined defined, old pending should be "PENDING"
          // Check: Resolution is defined and of type Resolution
          const resolution = getResolution(newResolution);
          const validatePatientID = validateID(
            patientID,
            newPatientID,
            oldPatientID
          );
          const validateClinicianID = validateID(
            clinicianID,
            newClinicianID,
            oldClinicianID
          );
          const validatePending = validatePendingUpdate(newPending, oldPending);
          if (
            validatePatientID &&
            validateClinicianID &&
            validatePending &&
            clinicianID &&
            patientID &&
            patientName &&
            resolution
          ) {
            console.log(
              `Handling PatientResolution ${keysAsString(
                patientID,
                clinicianID
              )}`
            );
            if (resolution === Resolution.APPROVED) {
              // Handle approved resolution
              returnPromise = handleApprovedResolution({
                clinicianID: clinicianID,
                patientID: patientID
              });
            } else if (
              resolution === Resolution.REASSIGNED &&
              reassignToClinicianID
            ) {
              // Handle reassigned resolution
              returnPromise = handleReassignedResolution({
                clinicianID: clinicianID,
                patientID: patientID,
                patientName: patientName,
                reassignToClinicianID: reassignToClinicianID
              });
            }
          } else {
            // Log debug object
            const debugObject = {
              validatePatientID,
              validateClinicianID,
              validatePending,
              new: {
                pending: newPending,
                resolution: newResolution
              },
              old: {
                pending: oldPending,
                resolution: oldResolution
              },
              clinicianID,
              patientID,
              patientName,
              resolution
            };
            console.log(
              `Error: Records do not meet validation requirements. ${prettyPrint(
                debugObject
              )}`
            );
            errorOccured = true;
          }
        } else {
          console.log(
            "Error: dynamodb object does not exist. Unable to obtain keys, new and old images"
          );
          errorOccured = true;
        }
        return returnPromise;
      }
    }).flatMap((promise) => (promise ? [promise] : []));

    const results = await Promise.all(promises);
    // Log successful results
    const successfulResults = results.filter((result) => result.success);
    if (successfulResults.length > 0) {
      console.log("=== SUCCESSFUL ===");
    }
    successfulResults.forEach((successfulResult) => {
      console.log(successfulResult.message);
    });

    // Log failed results
    const failedResults = results.filter((result) => !result.success);
    if (failedResults.length > 0) {
      console.log("=== FAILED ===");
      failedResults.forEach((result) => console.log(result));
      errorOccured = true;
    }

    // Compute overall success count for return message
    successCount = results.filter((result) => result.success).length;
    totalCount = results.length;
    if (totalCount > 0) {
      returnMessages.push(
        `${successCount} / ${totalCount} was successfully completed`
      );
    }
  } else {
    console.log("Error: Stream records do not exist or list is empty");
    errorOccured = true;
  }

  if (errorOccured) {
    returnMessages.push(
      "NOTICE: Errors occurred during execution. Please check logs"
    );
  }
  return returnMessages.join(". ");
};

const handleApprovedResolution: (input: {
  clinicianID: StringObject;
  patientID: StringObject;
}) => Promise<PromiseResolution> = async ({ clinicianID, patientID }) => {
  const successMessage = `Successfully handled approved resolution for PatientAssignment ${keysAsString(
    patientID,
    clinicianID
  )}`;
  let returnMessage: PromiseResolution = {
    success: false,
    message: ""
  };

  let clinicianPatientMapCreatedOrExists = false;

  try {
    // Resolved if ClinicianPatientMap exists
    const getResult = await getClinicianPatientMap({
      patientID: patientID.S,
      clinicianID: clinicianID.S
    });
    if (getResult.data.getClinicianPatientMap) {
      // Successful since map already exists
      clinicianPatientMapCreatedOrExists = true;
    } else {
      // Otherwise, create new ClinicianPatientMap
      const createResult = await createClinicianPatientMap({
        patientID: patientID.S,
        clinicianID: clinicianID.S
      });
      if (createResult.data?.createClinicianPatientMap) {
        // Successful since map is created
        clinicianPatientMapCreatedOrExists = true;
      } else {
        throw Error(
          "Failed to create ClinicianPatientMap and it does not exist\n" +
            keysAsString(patientID, clinicianID)
        );
      }
    }
  } catch (error) {
    const errorMessage = error + keysAsString(patientID, clinicianID);
    returnMessage = { success: false, message: errorMessage };
  }

  if (clinicianPatientMapCreatedOrExists) {
    // Update source PatientAssignment
    returnMessage = await updateSourcePatientAssignment(
      patientID,
      clinicianID,
      successMessage
    );
  }

  return returnMessage;
};

const handleReassignedResolution: (input: {
  clinicianID: StringObject;
  patientID: StringObject;
  patientName: StringObject;
  reassignToClinicianID: StringObject;
}) => Promise<PromiseResolution> = async ({
  clinicianID,
  patientID,
  patientName,
  reassignToClinicianID
}) => {
  const successMessage = `Successfully handled reassign resolution for PatientAssignment ${keysAsString(
    patientID,
    clinicianID
  )} to ${keysAsString(patientID, reassignToClinicianID)}`;
  let returnMessage: PromiseResolution = {
    success: false,
    message: ""
  };

  let reassignedToTarget = false;

  try {
    // Check if target PatientAssignment exists
    const getResult = await getPatientAssignment({
      patientID: patientID.S,
      clinicianID: reassignToClinicianID.S
    });
    if (getResult.data.getPatientAssignment) {
      // Target PatientAssignment exists
      const targetPatientAssignment = getResult.data.getPatientAssignment;
      if (targetPatientAssignment.resolution === Resolution.REASSIGNED) {
        // Update target PatientAssignment to PENDING, remove resolution, add source
        const updateResult = await updatePatientAssignment({
          patientID: patientID.S,
          clinicianID: reassignToClinicianID.S,
          _version: targetPatientAssignment._version,
          pending: Pending.PENDING,
          resolution: null,
          adminReassignFromClinicianID: clinicianID.S // Indicate source clinicianID
        });
        if (updateResult.data?.updatePatientAssignment) {
          // Successfully reassigned to target
          reassignedToTarget = true;
        } else {
          throw Error(
            "Failed to update target PatientAssignment\n" +
              keysAsString(patientID, reassignToClinicianID)
          );
        }
      } else {
        // Either PENDING or APPROVED
        // Successfully reassigned to target
        reassignedToTarget = true;
      }
    }
    // Otherwise, if no errors, create new target PatientAssignment
    else if (!getResult.errors) {
      const result = await createPatientAssignment({
        patientID: patientID.S,
        clinicianID: reassignToClinicianID.S,
        patientName: patientName.S,
        pending: Pending.PENDING,
        adminReassignFromClinicianID: clinicianID.S // Indicate source clinicianID
      });
      if (result.data?.createPatientAssignment) {
        // Successfully reassigned to target
        reassignedToTarget = true;
      } else {
        throw Error(
          "Failed to create target PatientAssignment\n" +
            keysAsString(patientID, reassignToClinicianID)
        );
      }
    } else {
      console.log(getResult.errors.length);
      throw Error(
        "Failed to check whether target PatientAssignment exists\n" +
          JSON.stringify(getResult.errors)
      );
    }
  } catch (error) {
    const errorMessage = error + keysAsString(patientID, clinicianID);
    returnMessage = { success: false, message: errorMessage };
  }

  if (reassignedToTarget) {
    // Update source PatientAssignment
    returnMessage = await updateSourcePatientAssignment(
      patientID,
      clinicianID,
      successMessage
    );
  }

  return returnMessage;
};

const updateSourcePatientAssignment = async (
  patientID: StringObject,
  sourceClinicianID: StringObject,
  successMessage: string
): Promise<PromiseResolution> => {
  let returnMessage: PromiseResolution = {
    success: false,
    message: ""
  };
  try {
    const getResult = await getPatientAssignment({
      patientID: patientID.S,
      clinicianID: sourceClinicianID.S
    });
    if (getResult.data.getPatientAssignment) {
      const sourcePatientAssignment = getResult.data.getPatientAssignment;
      const updateResult = await updatePatientAssignment({
        patientID: patientID.S,
        clinicianID: sourceClinicianID.S,
        _version: sourcePatientAssignment._version,
        adminCompleted: true // Indicate that Lambda function completed its task
      });
      if (updateResult.data?.updatePatientAssignment) {
        // Successfully updated source
        // Update return message
        returnMessage = { success: true, message: successMessage };
      } else {
        throw Error(
          "Failed to update source PatientAssignment\n" +
            keysAsString(patientID, sourceClinicianID)
        );
      }
    } else {
      throw Error(
        "Failed to query source PatientAssignment\n" +
          keysAsString(patientID, sourceClinicianID)
      );
    }
  } catch (error) {
    const errorMessage = error + keysAsString(patientID, sourceClinicianID);
    returnMessage = { success: false, message: errorMessage };
  }
  return returnMessage;
};

const keysAsString = (patientID: StringObject, clinicianID: StringObject) => {
  return `\npatientID (partition key): ${prettyPrint(
    patientID
  )}\nclinicianID (sort key): ${prettyPrint(clinicianID)}`;
};
