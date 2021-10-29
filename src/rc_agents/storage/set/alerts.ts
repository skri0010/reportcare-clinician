import AsyncStorage from "@react-native-async-storage/async-storage";
import { AlertNotification } from "aws/TypedAPI/subscriptions";
import { AlertInfo, AlertStatus, HighRiskAlertInfo } from "rc_agents/model";
import { AsyncStorageKeys, AsyncStorageType } from "rc_agents/storage";
import {
  getProcessedAlertInfos,
  getAlertInfosSync,
  getAlertNotifications
} from "rc_agents/storage/get/alerts";

/**
 * DO NOT EXPORT THIS FUNCTION
 * THIS IS USED AS THE LAST CALL, IT HAS NO MERGING
 * Insert ProcessedAlertInfo
 */
const setProcessedAlertInfos = async (
  processedAlertInfos: AsyncStorageType[AsyncStorageKeys.ALERT_INFOS]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.ALERT_INFOS,
    JSON.stringify(processedAlertInfos)
  );
};

// Insert AlertInfo[], merge completed status
export const setAlertInfos = async (
  alertInfos: (AlertInfo | HighRiskAlertInfo)[]
): Promise<void> => {
  let localProcessedAlertInfos = await getProcessedAlertInfos();

  // Create new object if it does not exist
  if (!localProcessedAlertInfos) {
    localProcessedAlertInfos = {};
  }

  if (localProcessedAlertInfos) {
    alertInfos.forEach((alertInfo) => {
      if (localProcessedAlertInfos) {
        const { patientID } = alertInfo;

        // Use a temporary list
        let patientAlerts = localProcessedAlertInfos[patientID];

        // Create new list if patient does not exist
        if (!patientAlerts) {
          patientAlerts = [];
        }

        // Merge if alert for patient exists
        const index: number | undefined = patientAlerts.findIndex(
          (info) => info.id === alertInfo.id
        );

        // Alert does not exist locally
        if (index >= 0) {
          const localAlertInfo: AlertInfo | HighRiskAlertInfo =
            patientAlerts[index];

          // Merge AlertStatus if COMPLETED
          const completed = alertInfo.completed || localAlertInfo.completed;
          patientAlerts[index] = {
            ...localAlertInfo,
            ...alertInfo,
            ...(completed ? {} : { pending: AlertStatus.PENDING }),
            ...(completed ? { completed: AlertStatus.COMPLETED } : {})
          };
        }
        // Alert exists locally
        else {
          // Push into list
          patientAlerts.push(alertInfo);
        }

        // Replace the original list
        localProcessedAlertInfos[patientID] = patientAlerts;
      }
    });
    await setProcessedAlertInfos(localProcessedAlertInfos);
  }
};

// Insert AlertInfo, merge based on latest version
export const setAlertInfo = async (
  alertInfo: AlertInfo | HighRiskAlertInfo
): Promise<void> => {
  await setAlertInfos([alertInfo]);
};

// Insert AlertInfo[] to be synced, merges with existing data
export const setAlertsSync = async (
  alertsSync: AsyncStorageType[AsyncStorageKeys.ALERTS_SYNC],
  overwrite = false
): Promise<void> => {
  let localData: (AlertInfo | HighRiskAlertInfo)[] | null = null;
  if (overwrite) {
    localData = [];
  } else {
    localData = (await getAlertInfosSync()) || [];
  }

  localData = localData.concat(alertsSync);

  await AsyncStorage.setItem(
    AsyncStorageKeys.ALERTS_SYNC,
    JSON.stringify(localData)
  );
};

// Insert AlertInfo to be synced, merge directly
export const setAlertSync = async (
  alertInfo: AlertInfo | HighRiskAlertInfo
): Promise<void> => {
  await replaceAlertsSync([alertInfo]);
};

// Replace AlertInfo[] to be synced by overwriting
export const replaceAlertsSync = async (
  alertsSync: AsyncStorageType[AsyncStorageKeys.ALERTS_SYNC]
): Promise<void> => {
  await setAlertsSync(alertsSync, true);
};

// Insert AlertNotification[] to be synced , merge directly
export const setAlertNotifications = async (
  alertNotifications: AlertNotification[],
  overwrite = false
): Promise<void> => {
  let localData: AlertNotification[] | null = null;
  if (overwrite) {
    localData = [];
  } else {
    localData = (await getAlertNotifications()) || [];
  }

  localData = localData.concat(alertNotifications);

  await AsyncStorage.setItem(
    AsyncStorageKeys.ALERT_NOTIFICATIONS,
    JSON.stringify(localData)
  );
};

// Insert AlertNotification[] to be synced
export const setAlertNotification = async (
  alertNotification: AlertNotification
): Promise<void> => {
  await setAlertNotifications([alertNotification]);
};

// Replace AlertNotification[] to be synced by overwriting
export const replaceAlertNotifications = async (
  alertNotifications: AlertNotification[]
): Promise<void> => {
  await setAlertNotifications(alertNotifications, true);
};
