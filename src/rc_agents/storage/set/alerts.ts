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

// Insert AlertInfo[], merge based on latest version
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
        let localAlertInfosForPatient = localProcessedAlertInfos[patientID];

        // Create new list if patient does not exist
        if (!localAlertInfosForPatient) {
          localAlertInfosForPatient = [];
        }

        // Merge if patient exists
        const index: number | undefined = localAlertInfosForPatient.findIndex(
          (info) => info.id === alertInfo.id
        );

        if (index >= 0) {
          const localAlertInfo: AlertInfo | HighRiskAlertInfo =
            localAlertInfosForPatient[index];

          // Merge based on alert's version
          if (alertInfo.version >= localAlertInfo.version) {
            // Set COMPLETED if new or local alert is completed
            const completed =
              alertInfo.completed || localAlertInfo.completed
                ? AlertStatus.COMPLETED
                : null;
            // Set PENDING if not completed
            const pending = completed ? null : AlertStatus.PENDING;

            localAlertInfosForPatient[index] = {
              ...localAlertInfo, // Local AlertInfo
              ...alertInfo, // Overwritten by new AlertInfo
              // Modify alert in new AlertInfo
              pending: pending,
              completed: completed
            };
          }
        } else {
          // Push into list
          localAlertInfosForPatient.push(alertInfo);
        }

        // Replace the original list
        localProcessedAlertInfos[patientID] = localAlertInfosForPatient;
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
