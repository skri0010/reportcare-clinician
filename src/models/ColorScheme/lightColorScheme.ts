import {
  ColorScheme,
  defaultRiskLevelBackgroundColors,
  defaultRiskLevelBorderColors,
  defaultRiskLevelSelectedBackgroundColors
} from "models/ColorScheme/model";

export const lightColorScheme: ColorScheme = {
  // Text
  primaryTextColor: "#000000",
  secondaryTextColor: "#525252",
  primaryContrastTextColor: "#ffffff",
  secondaryContrastTextColor: "#e6e6e6",
  selectedTextColor: "#00ffff",
  consistentTextColor: "#000000",

  // Background
  primaryBackgroundColor: "#ffffff",
  secondaryBackgroundColor: "#727272",
  primaryWebBackgroundColor: "#f5f5f5",
  secondaryWebBackgroundColor: "#ffffff",

  // Borders
  primaryBorderColor: "#d2d2d2",
  secondaryBorderColor: "#000000",
  selectedBorderColor: "#000000",

  // Separators
  separatorColor: "#363636",

  // Bars
  primaryBarColor: "#0d8ca8",
  secondaryBarColor: "#0b849e",

  // Indicators
  primaryIndicatorColor: "#ffffff",

  // Notifications
  notificationColor: "#57c081",

  // Buttons
  primaryButtonColor: "#9e3ce6",
  acceptButtonColor: "#57c081",
  declineButtonColor: "#dc143c",
  primaryDeactivatedButtonColor: "#d1d1d1",
  primaryWarningButtonColor: "#d11c1c",
  innerScreenButtonColor: "#a484ff",

  // Avatar background
  primaryAvatarBackgroundColor: "#e0e0e0",

  // Icons
  primaryIconColor: "#000000",
  secondaryIconColor: "#aba9a9",
  primaryContrastIconColor: "#ffffff",
  selectedIconColor: "#00ffff",
  acceptIconColor: "#6ac574",
  deleteIconColor: "#ff1e00",

  // Icon background
  deleteIconBackgroundColor: "#ffffff00",

  // Information
  infoIconColor: "#2b79c2",

  // Charts
  basicLineColor: "#cccccc",
  maxLineColor: "#5fff42",
  minLineColor: "#c43a31",
  avgLineColor: "#edf24b",
  chartPillSelectedColor: "#4bd183",
  chartPillUnselectedColor: "#F2F2F2",
  chartPillUnselectedBorderColor: "#d1d1d1",
  gridLineColor: "#dedede",

  // Scatter plot label
  labelColor: "#4a4a4f",

  // Toggle Button ColorScheme
  trueTrackColor: "#81b0ff",
  falseTrackColor: "#767577",
  trueThumbColor: "#f5dd4b",
  falseThumbColor: "#f4f3f4",
  ios_backgroundColor: "#3e3e3e",

  // Others
  riskLevelBackgroundColors: defaultRiskLevelBackgroundColors,
  riskLevelSelectedBackgroundColors: defaultRiskLevelSelectedBackgroundColors,
  riskLevelBorderColors: defaultRiskLevelBorderColors,

  // Errors
  errorColor: "#ff1e00",

  // Overlay
  overlayColor: "#e7e8e895"
};
