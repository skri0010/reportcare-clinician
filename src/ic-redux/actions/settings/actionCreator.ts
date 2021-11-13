import { actionNames } from "ic-redux/actions/actionNames";
import { createAction } from "typesafe-actions";
import { LanguageID } from "util/language";
import { FontScheme } from "models/FontScheme";
import { ColorSchemeName } from "models/ColorScheme";

export const refreshSettings = createAction(
  actionNames.REFRESH_SETTINGS,
  () => ({})
)();

export const setColorScheme = createAction(
  actionNames.SET_COLOR_SCHEME,
  (colorSchemeName: ColorSchemeName) => ({
    colorSchemeName: colorSchemeName
  })
)();

export const setLanguage = createAction(
  actionNames.SET_LANGUAGE,
  (language: LanguageID) => ({
    language: language
  })
)();

export const setFontScheme = createAction(
  actionNames.SET_FONT_SCHEME,
  (fonts: FontScheme) => ({
    fonts: fonts
  })
)();
