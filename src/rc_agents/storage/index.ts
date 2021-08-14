import {
  AlertInfo,
  LocalTodo,
  PatientAssignmentResolution,
  PatientDetails
} from "rc_agents/model";
import { Alert, ClinicianInfo, PatientAssignment } from "aws/API";
import * as accessFunctions from "./accessFunctions";
import { RiskLevel } from "models/RiskLevel";

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
  PATIENTS_DETAILS = "PatientDetails",
  ALERTS = "Alerts",
  ALERT_INFOS = "AlertInfos",
  PENDING_PATIENT_ASSIGNMENTS = "PendingPatientAssignments",
  PATIENT_ASSIGNMENTS_RESOLUTIONS = "PatientAssignmentsResolutions",
  TODOS = "Todos",
  ALERTS_SYNC = "AlertsSync"
}

// Types for storing data locally in AsyncStorage
export type AsyncStorageType = {
  [AsyncStorageKeys.SIGN_UP_DETAILS]: {
    name: string;
    hospitalName: string;
    role: string;
  };
  [AsyncStorageKeys.CLINICIAN_ID]: string;
  [AsyncStorageKeys.CLINICIAN]: ClinicianInfo;
  [AsyncStorageKeys.PENDING_PATIENT_ASSIGNMENTS]: PatientAssignment[];
  [AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS]: {
    [patientId: string]: PatientAssignmentResolution;
  };
  [AsyncStorageKeys.PATIENTS_DETAILS]: {
    [patientId: string]: PatientDetails;
  };
  [AsyncStorageKeys.ALERTS]: {
    [key in RiskLevel]: Alert[];
  };
  [AsyncStorageKeys.ALERT_INFOS]: {
    [key: string]: AlertInfo[];
  };
  [AsyncStorageKeys.TODOS]: LocalTodo[];
  [AsyncStorageKeys.ALERTS_SYNC]: AlertInfo[];
};
