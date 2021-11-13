import { Platform } from "react-native";
import { actionNames } from "../actions/actionNames";
import { RootAction } from "../actions/RootAction";
import { Reducer } from "redux";
import { LanguageID, defaultLanguage } from "util/language";
import {
  ColorScheme,
  ColorSchemeName,
  ColorSchemeList
} from "../../models/ColorScheme";
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
  colorSchemeName: ColorSchemeName;
  colors: ColorScheme;
  language: LanguageID;
  fonts: FontScheme;
  refreshed: boolean;
}

const initialState: SettingsState = {
  colorSchemeName: ColorSchemeName.LIGHT,
  colors: ColorSchemeList[ColorSchemeName.LIGHT],
  language: defaultLanguage,
  fonts: Platform.select({
    android: normalMobileFontScheme,
    ios: normalMobileFontScheme,
    // Display mobile fonts for mobile, web fonts for desktop
    web: isMobile ? largeWebFont : normalWebFont,
    default: normalWebFont
  }),
  refreshed: false // Refresh certain settings after Redux rehydrate
};

export const settingsReducer: Reducer<SettingsState, RootAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionNames.REFRESH_SETTINGS:
      return {
        ...state,
        colors: ColorSchemeList[state.colorSchemeName],
        refreshed: true
      };
    case actionNames.SET_COLOR_SCHEME:
      return {
        ...state,
        colorSchemeName: action.payload.colorSchemeName,
        colors: ColorSchemeList[action.payload.colorSchemeName]
      };
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
  whitelist: ["colorSchemeName", "colors", "language", "fonts"], // Persist the redux values for colors, language and fonts
  stateReconciler: autoMergeLevel2 // Merge 2 levels deep, ie merge new state with old state instead of replacing the old state entirely
};
