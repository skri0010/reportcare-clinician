import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys, AsyncStorageType } from ".";

export const getSignUpDetails = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.SIGN_UP_DETAILS] | null
> => {
  const localData = await AsyncStorage.getItem(AsyncStorageKeys.SIGN_UP_DETAILS);
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};

export const getClinicianID = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.CLINICIAN_ID] | null
> => {
  const localData = await AsyncStorage.getItem(AsyncStorageKeys.CLINICIAN_ID);
  return localData;
};

export const getClinician = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.CLINICIAN] | null
> => {
  const localData = await AsyncStorage.getItem(AsyncStorageKeys.CLINICIAN);
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};

export const getPendingPatientAssignments = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.PENDING_PATIENT_ASSIGNMENTS] | null
> => {
  const localData = await AsyncStorage.getItem(
    AsyncStorageKeys.PENDING_PATIENT_ASSIGNMENTS
  );
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};

export const getPatientAssignmentResolutions = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS] | null
> => {
  const localData = await AsyncStorage.getItem(
    AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS
  );
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};

export const getPatients = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.PATIENTS] | null
> => {
  const localData = await AsyncStorage.getItem(
    AsyncStorageKeys.PATIENTS
  );
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};

export const getPatientDetails = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.PATIENT_DETAILS] | null
> => {
  const localData = await AsyncStorage.getItem(
    AsyncStorageKeys.PATIENT_DETAILS
  );
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};

export const getAlerts = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.ALERTS] | null
> => {
  const localData = await AsyncStorage.getItem(
    AsyncStorageKeys.ALERTS
  );
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};

export const getAlertInfos = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.ALERT_INFOS] | null
> => {
  const localData = await AsyncStorage.getItem(
    AsyncStorageKeys.ALERT_INFOS
  );
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};

export const getTodos = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.TODOS] | null
> => {
  const localData = await AsyncStorage.getItem(
    AsyncStorageKeys.TODOS
  );
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};
