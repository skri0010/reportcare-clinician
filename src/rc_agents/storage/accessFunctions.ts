import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from ".";

/**
 * AsyncStorage access functions (SET and GET) with types
 */
export * from "./getItem";
export * from "./setItem";
export * from "./flushItem";

export const removeItem = async (key: AsyncStorageKeys): Promise<void> => {
  await AsyncStorage.removeItem(key);
};

/**
 * Upon sign out, remove all locally stored items except for sign up details if it exists
 * The persisted redux states will not be removed from local storage too
 */
export const removeAll = async (): Promise<void> => {
  const keys = await AsyncStorage.getAllKeys();
  if (keys && keys.length > 0) {
    // Retain the SignUpDetails key
    const index = keys.findIndex((k) => k === AsyncStorageKeys.SIGN_UP_DETAILS);
    if (index >= 0) {
      keys.splice(index, 1);
    }

    // Retain the persist:Filters key
    const persistFilterIndex = keys.findIndex(
      (k) => k === `persist:${AsyncStorageKeys.PERSIST_FILTERS}`
    );
    if (persistFilterIndex >= 0) {
      keys.splice(persistFilterIndex, 1);
    }

    // Retain the persist:Settings key
    const persistSettingsIndex = keys.findIndex(
      (k) => k === `persist:${AsyncStorageKeys.PERSIST_SETTINGS}`
    );
    if (persistSettingsIndex >= 0) {
      keys.splice(persistSettingsIndex, 1);
    }

    await AsyncStorage.multiRemove(keys);
  }
};
