import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys, LocalStorage } from "rc_agents/storage";

export const flushAlertInfos = async (): Promise<void> => {
  await AsyncStorage.removeItem(AsyncStorageKeys.ALERT_INFOS);
};

// Remove existing pending patient assignment from local storage
export const flushOnePendingPatientAssignment = async (
  patientID: string
): Promise<void> => {
  const localPatientAssignments =
    await LocalStorage.getPendingPatientAssignments();
  if (localPatientAssignments) {
    const patientAssignmentIndex = localPatientAssignments.findIndex(
      (item) => item.patientID === patientID
    );
    if (patientAssignmentIndex >= 0) {
      localPatientAssignments.splice(patientAssignmentIndex, 1); // Remove 1 item at index from array
      await LocalStorage.setPendingPatientAssignments(localPatientAssignments);
    }
  }
};
