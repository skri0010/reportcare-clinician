import AsyncStorage from "@react-native-async-storage/async-storage";
import { PatientInfo } from "aws/API";
import { PatientDetails } from "rc_agents/model";
import { AsyncStorageKeys, AsyncStorageType } from ".";

export * from "rc_agents/storage/get/alerts";

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

export const getUsername = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.USERNAME] | null
> => {
  const localData = await AsyncStorage.getItem(AsyncStorageKeys.USERNAME);
  return localData;
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

export const getClinicianContacts = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.CLINICIAN_CONTACTS] | null
> => {
  const localData = await AsyncStorage.getItem(
    AsyncStorageKeys.CLINICIAN_CONTACTS
  );
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
 * Gets patient baselines to be synced.
 * @returns array of patient infos if any, otherwise null
 */
export const getPatientBaselines = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.PATIENT_BASELINES] | null
> => {
  const localData = await AsyncStorage.getItem(
    AsyncStorageKeys.PATIENT_BASELINES
  );
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};

/**
 * Get the medication configurations to be synced
 * @returns an object with an array of medication configurations mapped to a patient ID
 */
export const getPatientMedicationConfigurations = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.MEDICATION_CONFIGURATIONS] | null
> => {
  const localData = await AsyncStorage.getItem(
    AsyncStorageKeys.MEDICATION_CONFIGURATIONS
  );

  if (localData) {
    return JSON.parse(localData);
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

export const getTodo = async (
  id: string
): Promise<AsyncStorageType[AsyncStorageKeys.TODOS] | null> => {
  const localData = await getTodos();
  if (localData) {
    return localData.filter((t) => t.id === id);
  }
  return null;
};

export const getTodoDetails = async (
  id: string
): Promise<AsyncStorageType[AsyncStorageKeys.TODO_DETAILS] | undefined> => {
  const localData = await getTodos();
  if (localData) {
    return localData.find((t) => t.id === id);
  }
  return undefined;
};

/**
 * Gets locally stored PatientAssignmentSubscriptions to be processed
 * @returns array of PatientAssignmentSubscriptions
 */
export const getPatientAssignmentSubscriptions = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.PATIENT_ASSIGNMENT_SUBSCRIPTIONS] | null
> => {
  const localData = await AsyncStorage.getItem(
    AsyncStorageKeys.PATIENT_ASSIGNMENT_SUBSCRIPTIONS
  );
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};
