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

  // Background
  primaryBackgroundColor: "#ffffff",
  secondaryBackgroundColor: "#727272",

  // Borders
  primaryBorderColor: "#000000",
  secondaryBorderColor: "#000000",
  selectedBorderColor: "#000000",

  // Separators
  separatorColor: "#bababa",

  // Bars
  primaryBarColor: "#0d8ca8",
  secondaryBarColor: "#ffffff",

  // Indicators
  primaryIndicatorColor: "#ffffff",

  // Notifications
  notificationColor: "#57c081",

  // Buttons
  primaryButtonColor: "#57c081",

  // Avatar background
  primaryAvatarBackgroundColor: "#e0e0e0",

  // Others
  riskLevelBackgroundColors: riskLevelBackgroundColors,
  riskLevelBorderColors: riskLevelBorderColors,
  riskLevelSelectedBackgroundColors: riskLevelSelectedBackgroundColors,

  // Errors
  errorColor: "#ff1e00",

  // Overlay
  overlayColor: "#f5fcff88"
};
