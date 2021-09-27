import { Platform } from "react-native";
import { actionNames } from "../actions/actionNames";
import { RootAction } from "../actions/RootAction";
import { Reducer } from "redux";
import { LanguageID, defaultLanguage } from "util/language";
import { ColorScheme, lightColorScheme } from "../../models/ColorScheme";
import {
  FontScheme,
  largeWebFont,
  normalMobileFontScheme,
  normalWebFont
} from "../../models/FontScheme";
import { isMobile } from "util/device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import { AsyncStorageKeys } from "rc_agents/storage";

export interface SettingsState {
  colors: ColorScheme;
  language: LanguageID;
  fonts: FontScheme;
}

const initialState: SettingsState = {
  colors: lightColorScheme,
  language: defaultLanguage,
  fonts: Platform.select({
    android: normalMobileFontScheme,
    ios: normalMobileFontScheme,
    // Display mobile fonts for mobile, web fonts for desktop
    web: isMobile ? largeWebFont : normalWebFont,
    default: normalWebFont
  })
};

export const settingsReducer: Reducer<SettingsState, RootAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionNames.SET_COLOUR_SCHEME:
      return { ...state, colors: action.payload.colors };
    case actionNames.SET_LANGUAGE:
      return { ...state, language: action.payload.language };
    case actionNames.SET_FONT_SCHEME:
      return { ...state, fonts: action.payload.fonts };
    default:
      return state;
  }
};

// Redux persistence configuration for settings
export const settingsPersistConfig = {
  key: AsyncStorageKeys.PERSIST_SETTINGS,
  storage: AsyncStorage, // Store the values in the AsyncStorage
  whitelist: ["colors", "language", "fonts"], // Persist the redux values for colors, language and fonts
  stateReconciler: autoMergeLevel2 // Merge 2 levels deep, ie merge new state with old state instead of replacing the old state entirely
};
