import { ColorScheme } from "models/ColorScheme/model";
import {
  riskLevelBackgroundColors,
  riskLevelBorderColors,
  riskLevelSelectedBackgroundColors
} from "models/ColorScheme/common/riskLevelColors";

export const darkColorScheme: ColorScheme = {
  // Text
  primaryTextColor: "#ffffff",
  secondaryTextColor: "#B3B3B3",
  primaryContrastTextColor: "#ffffff",
  secondaryContrastTextColor: "#B3B3B3",
  selectedTextColor: "#00ffff",

  // Background
  primaryBackgroundColor: "#121212",
  secondaryBackgroundColor: "#181818",
  primaryWebBackgroundColor: "#282828",
  secondaryWebBackgroundColor: "#181818",

  // Borders
  primaryBorderColor: "#D2D2D2",
  secondaryBorderColor: "#000000",
  selectedBorderColor: "#000000",

  // Separators
  separatorColor: "#363636",

  // Bars
  primaryBarColor: "#404040",
  secondaryBarColor: "#181818",

  // Indicators
  primaryIndicatorColor: "#ffffff",

  // Notifications
  notificationColor: "#57c081",

  // Buttons
  primaryButtonColor: "#9e3ce6",
  acceptButtonColor: "#57c081",
  primaryDeactivatedButtonColor: "#d1d1d1",
  primaryWarningButtonColor: "#D11C1C",
  primaryTodoCompleteButtonColor: "#A484FF",

  // Avatar background
  primaryAvatarBackgroundColor: "#e0e0e0",

  // Icons
  primaryIconColor: "#000000",
  secondaryIconColor: "#ABA9A9",
  primaryContrastIconColor: "#FFFFFF",
  selectedIconColor: "#00ffff",
  acceptIconColor: "#6AC574",

  // Icon background/
  infoIconColor: "#2b79c2",

  // Charts
  maxLineColor: "#5fff42",
  minLineColor: "#c43a31",
  avgLineColor: "#edf24b",
  chartPillSelectedColor: "#57c081",
  chartPillUnselectedColor: "#F2F2F2",
  chartPillUnselectedBorderColor: "#d1d1d1",

  // Others
  riskLevelBackgroundColors: riskLevelBackgroundColors,
  riskLevelBorderColors: riskLevelBorderColors,
  riskLevelSelectedBackgroundColors: riskLevelSelectedBackgroundColors,

  // Errors
  errorColor: "#ff1e00",

  // Overlay
  overlayColor: "#e7e8e895"
};
