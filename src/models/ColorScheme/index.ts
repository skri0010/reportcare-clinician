import { ColorScheme } from "./model";
import { lightColorScheme } from "./lightColorScheme";
import { darkColorScheme } from "./darkColorScheme";

export type { ColorScheme } from "./model";

export enum ColorSchemeName {
  LIGHT = "LIGHT_COLOR_SCHEME",
  DARK = "DARK_COLOR_SCHEME"
}

export const ColorSchemeList: {
  [key in ColorSchemeName]: ColorScheme;
} = {
  [ColorSchemeName.LIGHT]: lightColorScheme,
  [ColorSchemeName.DARK]: darkColorScheme
};
