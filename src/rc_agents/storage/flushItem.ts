import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "rc_agents/storage";

export const flushAlertInfos = async (): Promise<void> => {
  await AsyncStorage.removeItem(AsyncStorageKeys.ALERT_INFOS);
};
