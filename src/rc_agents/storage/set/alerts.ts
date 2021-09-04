import AsyncStorage from "@react-native-async-storage/async-storage";
import { AlertInfo, AlertStatus } from "rc_agents/model";
import { AsyncStorageKeys, AsyncStorageType } from "rc_agents/storage";
import {
  getProcessedAlertInfos,
  getAlertInfosSync
} from "rc_agents/storage/get/alerts";

/**
 * DO NOT EXPORT THIS FUNCTION
 * THIS IS USED AS THE LAST CALL, IT HAS NO MERGING
 * Insert ProcessedAlertInfo[]
 */
const setProcessedAlertInfos = async (
  processedAlertInfos: AsyncStorageType[AsyncStorageKeys.ALERT_INFOS]
): Promise<void> => {
  await AsyncStorage.setItem(
    AsyncStorageKeys.ALERT_INFOS,
    JSON.stringify(processedAlertInfos)
  );
};

// Insert AlertInfo[], merge based on latest _version
export const setAlertInfos = async (alertInfos: AlertInfo[]): Promise<void> => {
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
          const localAlertInfo: AlertInfo = localAlertInfosForPatient[index];

          // Merge based on alert's _version
          if (alertInfo._version >= localAlertInfo._version) {
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

// Insert AlertInfo, merge based on latest _version
export const setAlertInfo = async (alertInfo: AlertInfo): Promise<void> => {
  await setAlertInfos([alertInfo]);
};

// Insert AlertInfo[] to be synced, merge directly
export const setAlertsSync = async (
  alertsSync: AsyncStorageType[AsyncStorageKeys.ALERTS_SYNC]
): Promise<void> => {
  let localAlertsSync: AlertInfo[] | null = await getAlertInfosSync();

  if (!localAlertsSync) {
    localAlertsSync = [];
  }

  localAlertsSync.concat(alertsSync);

  await AsyncStorage.setItem(
    AsyncStorageKeys.ALERTS_SYNC,
    JSON.stringify(alertsSync)
  );
};

// Insert AlertInfo to be synced, merge directly
export const setAlertSync = async (alertInfo: AlertInfo): Promise<void> => {
  await setAlertsSync([alertInfo]);
};
