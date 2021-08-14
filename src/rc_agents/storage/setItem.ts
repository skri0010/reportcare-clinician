import AsyncStorage from "@react-native-async-storage/async-storage";
import { PatientInfo } from "aws/API";
import { AsyncStorageKeys, AsyncStorageType } from ".";
import { getPatientsDetails } from "./getItem";

export const setSignUpDetails = async (
  signUpDetails: AsyncStorageType[AsyncStorageKeys.SIGN_UP_DETAILS]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.SIGN_UP_DETAILS,
    JSON.stringify(signUpDetails)
  );
};

export const setClinicianID = async (
  clinicianID: AsyncStorageType[AsyncStorageKeys.CLINICIAN_ID]
): Promise<void> => {
  await AsyncStorage.setItem(AsyncStorageKeys.CLINICIAN_ID, clinicianID);
};

export const setClinician = async (
  clinician: AsyncStorageType[AsyncStorageKeys.CLINICIAN]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.CLINICIAN,
    JSON.stringify(clinician)
  );
};

export const setPendingPatientAssignments = async (
  pendingPatientAssignments: AsyncStorageType[AsyncStorageKeys.PENDING_PATIENT_ASSIGNMENTS]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.PENDING_PATIENT_ASSIGNMENTS,
    JSON.stringify(pendingPatientAssignments)
  );
};

export const setPatientAssignmentResolutions = async (
  resolutions: AsyncStorageType[AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS,
    JSON.stringify(resolutions)
  );
};

/**
 * Stores as PatientsDetails
 * Performs local merging (saving only patientInfo)
 */
export const setPatients = async (
  patients: (PatientInfo | null)[]
): Promise<void> => {
  const localPatients = await getPatientsDetails();
  const patientsDetails: AsyncStorageType[AsyncStorageKeys.PATIENTS_DETAILS] =
    {};
  patients.forEach((patient: PatientInfo | null) => {
    if (patient) {
      // Patient exists locally: Merge
      if (localPatients && localPatients[patient.patientID]) {
        patientsDetails[patient.patientID] = {
          patientInfo: patient,
          activityInfos: localPatients[patient.patientID].activityInfos,
          symptomReports: localPatients[patient.patientID].symptomReports,
          vitalsReports: localPatients[patient.patientID].vitalsReports
        };
      }
      // Patient does not exist locally: Create
      else {
        patientsDetails[patient.patientID] = {
          patientInfo: patient,
          activityInfos: {},
          symptomReports: {},
          vitalsReports: {}
        };
      }
    }
  });
  await setPatientsDetails(patientsDetails);
};

export const setPatientsDetails = async (
  patientsDetails: AsyncStorageType[AsyncStorageKeys.PATIENTS_DETAILS]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.PATIENTS_DETAILS,
    JSON.stringify(patientsDetails)
  );
};

export const setAlerts = async (
  alerts: AsyncStorageType[AsyncStorageKeys.ALERTS]
): Promise<void> => {
  await AsyncStorage.setItem(AsyncStorageKeys.ALERTS, JSON.stringify(alerts));
};

export const setAlertInfos = async (
  alertInfos: AsyncStorageType[AsyncStorageKeys.ALERT_INFOS]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.ALERT_INFOS,
    JSON.stringify(alertInfos)
  );
};

export const setTodos = async (
  todos: AsyncStorageType[AsyncStorageKeys.TODOS]
): Promise<void> => {
  await AsyncStorage.setItem(AsyncStorageKeys.TODOS, JSON.stringify(todos));
};

export const setAlertsSync = async (
  alertsSync: AsyncStorageType[AsyncStorageKeys.ALERTS_SYNC]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.ALERTS_SYNC,
    JSON.stringify(alertsSync)
  );
};
