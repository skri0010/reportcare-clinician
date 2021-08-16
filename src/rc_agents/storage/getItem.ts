import AsyncStorage from "@react-native-async-storage/async-storage";
import { PatientInfo } from "aws/API";
import { PatientDetails } from "rc_agents/model";
import { AsyncStorageKeys, AsyncStorageType } from ".";

export const getSignUpDetails = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.SIGN_UP_DETAILS] | null
> => {
  const localData = await AsyncStorage.getItem(
    AsyncStorageKeys.SIGN_UP_DETAILS
  );
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

/**
 * Get all patients (PatientInfo) from AllPatientDetails
 */
export const getPatients = async (): Promise<PatientInfo[] | null> => {
  const localData = await getAllPatientDetails();
  let patients: PatientInfo[] | null = null;
  if (localData) {
    patients = [];
    Object.values(localData).forEach((patientDetails) => {
      if (patientDetails) {
        patients?.push(patientDetails.patientInfo);
      }
    });
  }
  return patients;
};

/**
 * Get a patient's details (PatientInfo) from AllPatientDetails
 */
export const getPatientDetails = async (
  patientID: string
): Promise<PatientDetails | null> => {
  const localData = await getAllPatientDetails();
  let patientDetails: PatientDetails | null = null;
  const localPatientDetails = localData?.[patientID];
  if (localPatientDetails) {
    patientDetails = localPatientDetails;
  }
  return patientDetails;
};

export const getAllPatientDetails = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.ALL_PATIENT_DETAILS] | null
> => {
  const localData = await AsyncStorage.getItem(
    AsyncStorageKeys.ALL_PATIENT_DETAILS
  );
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};

export const getAlerts = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.ALERTS] | null
> => {
  const localData = await AsyncStorage.getItem(AsyncStorageKeys.ALERTS);
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};

export const getAlertInfos = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.ALERT_INFOS] | null
> => {
  const localData = await AsyncStorage.getItem(AsyncStorageKeys.ALERT_INFOS);
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};

export const getTodos = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.TODOS] | null
> => {
  const localData = await AsyncStorage.getItem(AsyncStorageKeys.TODOS);
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};

export const getAlertsSync = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.ALERTS_SYNC] | null
> => {
  const localData = await AsyncStorage.getItem(AsyncStorageKeys.ALERTS_SYNC);
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};
