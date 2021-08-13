import { PatientAssignmentResolution } from "rc_agents/model";
import { PatientAssignment } from "aws/API";

import * as accessFunctions from "./accessFunctions";

/**
 * AsyncStorage access functions (SET, GET and REMOVE) with types
 */
export const Storage = accessFunctions;

// Keys for storing data locally in AsyncStorage
export enum AsyncStorageKeys {
  CLINICIAN_ID = "ClinicianID",
  SIGN_UP_DETAILS = "SignUpDetails",
  USERNAME = "Username",
  CLINICIAN = "Clinician",
  PATIENTS = "Patients",
  ALERTS = "Alerts",
  ALERT_INFOS = "AlertInfos",
  PENDING_PATIENT_ASSIGNMENTS = "PendingPatientAssignments",
  PATIENT_ASSIGNMENTS_RESOLUTIONS = "PatientAssignmentsResolutions",
  TODOS = "Todos"
}

// Types for storing data locally in AsyncStorage
export type AsyncStorageType = {
  [AsyncStorageKeys.CLINICIAN_ID]: string;
  [AsyncStorageKeys.PENDING_PATIENT_ASSIGNMENTS]: PatientAssignment[];
  [AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS]: {
    [key: string]: PatientAssignmentResolution;
  };
};
