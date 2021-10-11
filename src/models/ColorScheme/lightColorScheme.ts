import { ColorScheme } from "models/ColorScheme/model";
import {
  riskLevelBackgroundColors,
  riskLevelBorderColors,
  riskLevelSelectedBackgroundColors
} from "models/ColorScheme/common/riskLevelColors";

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
  primaryWebBackgroundColor: "#F5F5F5",
  secondaryWebBackgroundColor: "#ffffff",

  // Borders
  primaryBorderColor: "#D2D2D2",
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
  declineButtonColor: "#DC143C",
  primaryDeactivatedButtonColor: "#d1d1d1",
  primaryWarningButtonColor: "#D11C1C",
  innerScreenButtonColor: "#A484FF",

  // Avatar background
  primaryAvatarBackgroundColor: "#e0e0e0",

  // Icons
  primaryIconColor: "#000000",
  secondaryIconColor: "#ABA9A9",
  primaryContrastIconColor: "#FFFFFF",
  selectedIconColor: "#00ffff",
  acceptIconColor: "#6AC574",

  // Information
  infoIconColor: "#2b79c2",

  // Charts
  maxLineColor: "#5fff42",
  minLineColor: "#c43a31",
  avgLineColor: "#edf24b",
  chartPillSelectedColor: "#57c081",
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
  riskLevelBackgroundColors: riskLevelBackgroundColors,
  riskLevelBorderColors: riskLevelBorderColors,
  riskLevelSelectedBackgroundColors: riskLevelSelectedBackgroundColors,

  // Errors
  errorColor: "#ff1e00",

  // Overlay
  overlayColor: "#e7e8e895"
};
