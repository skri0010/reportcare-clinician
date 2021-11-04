import { ColorScheme } from "models/ColorScheme/model";
import { IRiskLevelMap } from "models/RiskLevel";

const riskLevelBackgroundColors: IRiskLevelMap = {
  HIGH: "#ff8888",
  MEDIUM: "#ffc342",
  LOW: "#4bd183",
  UNASSIGNED: "#ffffff"
};

const riskLevelSelectedBackgroundColors: IRiskLevelMap = {
  HIGH: "#ed6464",
  MEDIUM: "#ebd860",
  LOW: "#81d488",
  UNASSIGNED: "#d4d4d4"
};

// In this color scheme, we do not need border colors
const riskLevelBorderColors: IRiskLevelMap = riskLevelBackgroundColors;

export const darkColorScheme: ColorScheme = {
  // Text
  primaryTextColor: "#ffffff",
  secondaryTextColor: "#b3b3b3",
  primaryContrastTextColor: "#ffffff",
  secondaryContrastTextColor: "#b3b3b3",
  selectedTextColor: "#00ffff",
  consistentTextColor: "#000000",

  // Background
  primaryBackgroundColor: "#333333",
  secondaryBackgroundColor: "#707070",
  primaryWebBackgroundColor: "#212121",
  secondaryWebBackgroundColor: "#181818",

  // Borders
  primaryBorderColor: "#7a7a7a",
  secondaryBorderColor: "#000000",
  selectedBorderColor: "#000000",

  // Separators
  separatorColor: "#787878",

  // Bars
  primaryBarColor: "#0d8ca8",
  secondaryBarColor: "#181818",

  // Indicators
  primaryIndicatorColor: "#ffffff",

  // Notifications
  notificationColor: "#57c081",

  // Buttons
  primaryButtonColor: "#9e3ce6",
  acceptButtonColor: "#4bd183",
  declineButtonColor: "#dc143c",
  primaryDeactivatedButtonColor: "#a6a6a6",
  primaryWarningButtonColor: "#d11c1c",
  innerScreenButtonColor: "#a484ff",

  // Avatar background
  primaryAvatarBackgroundColor: "#e0e0e0",

  // Icons
  primaryIconColor: "#ffffff",
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
  basicLineColor: "#6b6b6b",
  maxLineColor: "#5fff42",
  minLineColor: "#c43a31",
  avgLineColor: "#edf24b",
  chartPillSelectedColor: "#4bd183",
  chartPillUnselectedColor: "#333333",
  chartPillUnselectedBorderColor: "#d1d1d1",
  gridLineColor: "#999999",

  // Scatter plot label
  labelColor: "#ced0f0",

  // Toggle Button ColorScheme
  trueTrackColor: "#81b0ff",
  falseTrackColor: "#767577",
  trueThumbColor: "#f5dd4b",
  falseThumbColor: "#f4f3f4",
  ios_backgroundColor: "#3e3e3e",

  // Others
  riskLevelBackgroundColors: riskLevelBackgroundColors,
  riskLevelSelectedBackgroundColors: riskLevelSelectedBackgroundColors,
  riskLevelBorderColors: riskLevelBorderColors,

  // Errors
  errorColor: "#ff1e00",

  // Overlay
  overlayColor: "#e7e8e895"
};
