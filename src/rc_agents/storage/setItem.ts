import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys, AsyncStorageType } from ".";

export const setSignUpDetails = async (
  signUpDetails: AsyncStorageType[AsyncStorageKeys.SIGN_UP_DETAILS]
): Promise<void> => {
  await AsyncStorage.setItem(AsyncStorageKeys.SIGN_UP_DETAILS, JSON.stringify(signUpDetails));
};

export const setClinicianID = async (
  clinicianID: AsyncStorageType[AsyncStorageKeys.CLINICIAN_ID]
): Promise<void> => {
  await AsyncStorage.setItem(AsyncStorageKeys.CLINICIAN_ID, clinicianID);
};

export const setClinician = async (
  clinician: AsyncStorageType[AsyncStorageKeys.CLINICIAN]
): Promise<void> => {
  await AsyncStorage.setItem(AsyncStorageKeys.CLINICIAN, JSON.stringify(clinician));
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

export const setPatients = async (
  patients: AsyncStorageType[AsyncStorageKeys.PATIENTS]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.PATIENTS,
    JSON.stringify(patients)
  );
};

export const setPatientDetails = async (
  patientDetails: AsyncStorageType[AsyncStorageKeys.PATIENT_DETAILS]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.PATIENT_DETAILS,
    JSON.stringify(patientDetails)
  );
};

export const setAlerts = async (
  alerts: AsyncStorageType[AsyncStorageKeys.ALERTS]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.ALERTS,
    JSON.stringify(alerts)
  );
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
  await AsyncStorage.setItem(
    AsyncStorageKeys.TODOS,
    JSON.stringify(todos)
  );
};