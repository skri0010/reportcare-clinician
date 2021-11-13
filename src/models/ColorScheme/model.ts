import { IRiskLevelMap } from "models/RiskLevel";

export interface ColorScheme {
  // Text
  primaryTextColor: string;
  secondaryTextColor: string;
  primaryContrastTextColor: string;
  secondaryContrastTextColor: string;
  selectedTextColor: string;
  consistentTextColor: string;

  // Background
  primaryBackgroundColor: string;
  secondaryBackgroundColor: string;
  primaryWebBackgroundColor: string;
  secondaryWebBackgroundColor: string;

  // Borders
  primaryBorderColor: string;
  secondaryBorderColor: string;
  selectedBorderColor: string;

  // Separators
  separatorColor: string;

  // Bars
  primaryBarColor: string;
  secondaryBarColor: string;

  // Indicators
  primaryIndicatorColor: string;

  // Notifications
  notificationColor: string;

  // Buttons
  primaryButtonColor: string;
  acceptButtonColor: string;
  declineButtonColor: string;
  primaryDeactivatedButtonColor: string;
  primaryWarningButtonColor: string;
  innerScreenButtonColor: string;

  // Avatar background
  primaryAvatarBackgroundColor: string;

  // Icons
  primaryIconColor: string;
  secondaryIconColor: string;
  primaryContrastIconColor: string;
  selectedIconColor: string;
  acceptIconColor: string;
  deleteIconColor: string;

  // Icon background
  deleteIconBackgroundColor: string;

  // Information
  infoIconColor: string;

  // Charts
  basicLineColor: string;
  maxLineColor: string;
  minLineColor: string;
  avgLineColor: string;
  chartPillSelectedColor: string;
  chartPillUnselectedColor: string;
  chartPillUnselectedBorderColor: string;
  gridLineColor: string;

  // Scatter plot label
  labelColor: string;

  // Toggle Button ColorScheme
  trueTrackColor: string;
  falseTrackColor: string;
  trueThumbColor: string;
  falseThumbColor: string;
  ios_backgroundColor: string;

  // Others
  riskLevelBackgroundColors: IRiskLevelMap;
  riskLevelSelectedBackgroundColors: IRiskLevelMap;
  riskLevelBorderColors: IRiskLevelMap;

  // Errors
  errorColor: string;

  // Overlay
  overlayColor: string;
}

export const defaultRiskLevelBackgroundColors: IRiskLevelMap = {
  HIGH: "#ffb9b9",
  MEDIUM: "#ffefcf",
  LOW: "#e3ffee",
  UNASSIGNED: "#ffffff"
};

export const defaultRiskLevelSelectedBackgroundColors: IRiskLevelMap = {
  HIGH: "#ed6464",
  MEDIUM: "#ebd860",
  LOW: "#81d488",
  UNASSIGNED: "#d4d4d4"
};

export const defaultRiskLevelBorderColors: IRiskLevelMap = {
  HIGH: "#ff0000",
  MEDIUM: "#ffbb36",
  LOW: "#00c64f",
  UNASSIGNED: "#000000"
};
