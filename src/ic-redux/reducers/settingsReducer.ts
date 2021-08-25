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

interface SettingsState {
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
