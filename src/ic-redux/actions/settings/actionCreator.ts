import { actionNames } from "ic-redux/actions/actionNames";
import { createAction } from "typesafe-actions";
import { ColorScheme } from "models/ColorScheme";
import { LanguageID } from "util/language";
import { FontScheme } from "models/FontScheme";

export const setColorScheme = createAction(
  actionNames.SET_COLOUR_SCHEME,
  (colors: ColorScheme) => ({
    colors: colors
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
