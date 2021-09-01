import {
  AlertInfo,
  LocalTodo,
  PatientAssignmentResolution,
  PatientDetails
} from "rc_agents/model";
import { ClinicianInfo, PatientAssignment, PatientInfo } from "aws/API";
// eslint-disable-next-line no-restricted-imports
import * as accessFunctions from "rc_agents/storage/accessFunctions";

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
  CLINICIAN_CONTACTS = "ClinicianContacts",
  PATIENTS = "Patients",
  ALL_PATIENT_DETAILS = "AllPatientDetails",
  ALERTS = "Alerts",
  ALERT_INFOS = "AlertInfos",
  PENDING_PATIENT_ASSIGNMENTS = "PendingPatientAssignments",
  PATIENT_ASSIGNMENTS_RESOLUTIONS = "PatientAssignmentsResolutions",
  PATIENT_CONFIGURATIONS = "PatientConfigurations",
  TODOS = "Todos",
  TODO_DETAILS = "TodoDetails",
  ALERTS_SYNC = "AlertsSync"
}

// Types for storing data locally in AsyncStorage
export type AsyncStorageType = {
  [AsyncStorageKeys.SIGN_UP_DETAILS]: {
    username: string;
    name: string;
    hospitalName: string;
    role: string;
  };
  [AsyncStorageKeys.USERNAME]: string;
  [AsyncStorageKeys.CLINICIAN_ID]: string;
  [AsyncStorageKeys.CLINICIAN]: ClinicianInfo;
  [AsyncStorageKeys.CLINICIAN_CONTACTS]: ClinicianInfo[];
  [AsyncStorageKeys.PENDING_PATIENT_ASSIGNMENTS]: PatientAssignment[];
  [AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS]: {
    [patientId: string]: PatientAssignmentResolution | undefined;
  };
  [AsyncStorageKeys.ALL_PATIENT_DETAILS]: {
    [patientId: string]: PatientDetails | undefined;
  };
  [AsyncStorageKeys.ALERTS]: AlertInfo[];
  [AsyncStorageKeys.PATIENT_CONFIGURATIONS]: PatientInfo[];
  [AsyncStorageKeys.ALERT_INFOS]: {
    [key: string]: { [key: string]: AlertInfo };
  };
  [AsyncStorageKeys.TODOS]: LocalTodo[];
  [AsyncStorageKeys.TODO_DETAILS]: LocalTodo;
  [AsyncStorageKeys.ALERTS_SYNC]: { [key: string]: AlertInfo };
};
