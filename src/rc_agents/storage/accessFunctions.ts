import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from ".";

/**
 * AsyncStorage access functions (SET and GET) with types
 */
export * from "./getItem";
export * from "./setItem";
export const removeItem = async (key: AsyncStorageKeys): Promise<void> => {
  await AsyncStorage.removeItem(key);
};
