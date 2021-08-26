import AsyncStorage from "@react-native-async-storage/async-storage";
import { PatientInfo } from "aws/API";
import { RiskLevel } from "models/RiskLevel";
import { AlertInfo, PatientDetails } from "rc_agents/model";
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

/**
 * Gets a single Alert.
 * @param alertId alert's Id
 * @param riskLevel riskLevel of the alert
 * @returns Alert if any, otherwise null
 */
// Why do we need riskLevel is Id is unique
export const getSingleAlert = async (
  alertId: string,
  riskLevel: RiskLevel
): Promise<AlertInfo | null> => {
  const localData = await getAlerts();
  if (localData) {
    for (let i = 0; i < localData.length; i++) {
      if (localData[i].id === alertId && localData[i].riskLevel === riskLevel) {
        return localData[i];
      }
    }
  }
  return null;
};

/**
 * Base function for getting all Alerts.
 * @returns alert object if exist, otherwise null
 */
export const getAlerts = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.ALERTS] | null
> => {
  const localData = await AsyncStorage.getItem(AsyncStorageKeys.ALERTS);
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};

export const getPendingAlerts = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.ALERTS] | null
> => {
  const localData = await getAlerts();
  if (localData) {
    return localData.filter((t) => t.completed === false);
  }
  return null;
};

export const getCompletedAlerts = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.ALERTS] | null
> => {
  const localData = await getAlerts();
  if (localData) {
    return localData.filter((t) => t.completed === true);
  }
  return null;
};

/**
 * Get a single AlertInfo from Alert
 * @param alert alert
 * @returns AlertInfo corresponding to the input Alert if any, otherwise null
 */
export const getSingleAlertInfo = async (
  alertId: string,
  patientId: string
): Promise<AlertInfo | null> => {
  const localData = await getAlertInfos();
  if (localData && localData[patientId]) {
    const patientAlertInfos = localData[patientId];
    return patientAlertInfos[alertId];
  }
  return null;
};

/**
 * Base function for getting all AlertInfos.
 * @returns AlertInfo object if any, otherwise null
 */
export const getAlertInfos = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.ALERT_INFOS] | null
> => {
  const localData = await AsyncStorage.getItem(AsyncStorageKeys.ALERT_INFOS);
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};

/**
 * Gets all AlertInfos of a patient
 * @param patientId patient's Id
 * @returns array of AlertInfo of the input patientId if any, otherwise null
 */
export const getPatientAlertInfos = async (
  patientId: string
): Promise<AlertInfo[] | null> => {
  const localData = await getAlertInfos();
  if (localData && localData[patientId]) {
    const patientAlertInfos = localData[patientId];
    return Object.values(patientAlertInfos);
  }
  return null;
};

/**
 * Gets Alerts with updated to be synced.
 * @returns array of Alerts if any, otherwise null
 */
export const getAlertsSync = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.ALERTS_SYNC] | null
> => {
  const localData = await AsyncStorage.getItem(AsyncStorageKeys.ALERTS_SYNC);
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};

/**
 * Base function for getting all Todos.
 * @returns array of Todo if exist, otherwise null
 */
export const getTodos = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.TODOS] | null
> => {
  const localData = await AsyncStorage.getItem(AsyncStorageKeys.TODOS);
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};

export const getPendingTodos = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.TODOS] | null
> => {
  const localData = await getTodos();
  if (localData) {
    return localData.filter((t) => t.completed === false);
  }
  return null;
};

export const getCompletedTodos = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.TODOS] | null
> => {
  const localData = await getTodos();
  if (localData) {
    return localData.filter((t) => t.completed === true);
  }
  return null;
};
