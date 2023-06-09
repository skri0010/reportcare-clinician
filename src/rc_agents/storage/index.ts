import {
  AlertInfo,
  ProcessedAlertInfos,
  LocalTodo,
  PatientAssignmentResolution,
  PatientDetails,
  HighRiskAlertInfo,
  MedInput
} from "rc_agents/model";
import { ClinicianInfo, PatientAssignment, PatientInfo } from "aws/API";
// eslint-disable-next-line no-restricted-imports
import * as accessFunctions from "rc_agents/storage/accessFunctions";
import { AlertNotification } from "aws/TypedAPI/subscriptions";

/**
 * AsyncStorage access functions (SET, GET and REMOVE) with types
 */
export const LocalStorage = accessFunctions;

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
  MEDICATION_CONFIGURATIONS = "MedicationConfigurations",
  PATIENT_BASELINES = "PatientBaselines",
  TODOS = "Todos",
  ALERTS_SYNC = "AlertsSync",
  TODO_DETAILS = "TodoDetails",
  ALERT_NOTIFICATIONS = "AlertNotifications",
  PATIENT_ASSIGNMENT_SUBSCRIPTIONS = "PatientAssignmentSubscriptions",
  PERSIST_SETTINGS = "Settings",
  PERSIST_FILTERS = "Filters"
}

// Types for storing data locally in AsyncStorage
export type AsyncStorageType = {
  [AsyncStorageKeys.SIGN_UP_DETAILS]: {
    username: string;
    name: string;
    hospitalName: string;
    role: string;
    phone: string;
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
  [AsyncStorageKeys.PATIENT_BASELINES]: PatientInfo[];
  [AsyncStorageKeys.MEDICATION_CONFIGURATIONS]: MedInput[];
  [AsyncStorageKeys.ALERT_INFOS]: ProcessedAlertInfos;
  [AsyncStorageKeys.TODOS]: LocalTodo[];
  [AsyncStorageKeys.TODO_DETAILS]: LocalTodo;
  [AsyncStorageKeys.ALERTS_SYNC]: (AlertInfo | HighRiskAlertInfo)[];
  [AsyncStorageKeys.ALERT_NOTIFICATIONS]: AlertNotification[];
  [AsyncStorageKeys.PATIENT_ASSIGNMENT_SUBSCRIPTIONS]: PatientAssignment[];
};
