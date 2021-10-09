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
  separatorColor: "#000000",

  // Bars
  primaryBarColor: "#0d8ca8",
  secondaryBarColor: "#181818",

  // Indicators
  primaryIndicatorColor: "#ffffff",

  // Notifications
  notificationColor: "#57c081",

  // Buttons
  primaryButtonColor: "#9e3ce6",
  acceptButtonColor: "#57c081",
  declineButtonColor: "#DC143C",
  primaryDeactivatedButtonColor: "#a6a6a6",
  primaryWarningButtonColor: "#D11C1C",
  primaryTodoCompleteButtonColor: "#A484FF",

  // Avatar background
  primaryAvatarBackgroundColor: "#e0e0e0",

  // Icons
  primaryIconColor: "#ffffff",
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
  riskLevelBorderColors: riskLevelBorderColors,
  riskLevelSelectedBackgroundColors: riskLevelSelectedBackgroundColors,

  // Errors
  errorColor: "#ff1e00",

  // Overlay
  overlayColor: "#e7e8e895"
};
