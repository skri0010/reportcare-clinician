import AsyncStorage from "@react-native-async-storage/async-storage";
import { AlertInfo } from "rc_agents/model";
import { AsyncStorageKeys, AsyncStorageType } from "rc_agents/storage";

// Get ProcessedAlertInfo
export const getProcessedAlertInfos = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.ALERT_INFOS] | null
> => {
  const localProcessedAlertInfos = await AsyncStorage.getItem(
    AsyncStorageKeys.ALERT_INFOS
  );

  if (localProcessedAlertInfos) {
    return JSON.parse(localProcessedAlertInfos);
  }
  return null;
};

// Get all AlertInfo[] (unsorted)
export const getAlertInfos = async (): Promise<AlertInfo[] | null> => {
  const localData = await getProcessedAlertInfos();
  let alertInfos: AlertInfo[] | null = null;
  if (localData) {
    alertInfos = [];
    Object.values(localData).forEach((patientAlertInfos) => {
      if (patientAlertInfos) {
        if (!alertInfos) {
          alertInfos = [];
        }
        alertInfos.concat(patientAlertInfos);
      }
    });
    if (alertInfos) {
      return alertInfos;
    }
  }
  return null;
};

// Get AlertInfo by id
export const getAlertInfo = async (
  alertId: string
): Promise<AlertInfo | null> => {
  const localData = await getAlertInfos();
  if (localData) {
    const alertInfo: AlertInfo | undefined = localData.find(
      (info) => info.id === alertId
    );
    if (alertInfo) {
      return alertInfo;
    }
  }
  return null;
};

// Get AlertInfo[] by patient id (unsorted)
export const getAlertInfosByPatientId = async (
  patientId: string
): Promise<AlertInfo[] | null> => {
  const localData = await getProcessedAlertInfos();
  if (localData && localData[patientId]) {
    const localAlertInfos = localData[patientId];
    if (localAlertInfos) {
      return localAlertInfos;
    }
  }
  return null;
};

// Get AlertInfo by id and patient id
export const getAlertInfoByPatientId = async (
  alertId: string,
  patientId: string
): Promise<AlertInfo | null> => {
  const localData = await getProcessedAlertInfos();
  if (localData && localData[patientId]) {
    const localAlertInfos = localData[patientId];
    if (localAlertInfos) {
      const alertInfo: AlertInfo | undefined = localAlertInfos.find(
        (info) => info.id === alertId
      );
      if (alertInfo) {
        return alertInfo;
      }
    }
  }
  return null;
};

// Get AlertInfo[] with pending attribute
export const getPendingAlertInfos = async (): Promise<AlertInfo[] | null> => {
  const localData = await getAlertInfos();
  if (localData) {
    return localData.filter((item) => item.pending);
  }
  return null;
};

// Get AlertInfo[] with completed attribute
export const getCompletedAlertInfos = async (): Promise<AlertInfo[] | null> => {
  const localData = await getAlertInfos();
  if (localData) {
    return localData.filter((item) => item.completed);
  }
  return null;
};

// Get AlertInfo[] with updates to be synced.
export const getAlertInfosSync = async (): Promise<
  AsyncStorageType[AsyncStorageKeys.ALERTS_SYNC] | null
> => {
  const localData = await AsyncStorage.getItem(AsyncStorageKeys.ALERTS_SYNC);
  if (localData) {
    return JSON.parse(localData);
  }
  return null;
};
