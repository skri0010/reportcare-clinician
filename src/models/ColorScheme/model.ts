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
  primaryDeactivatedButtonColor: string;
  primaryWarningButtonColor: string;
  primaryTodoCompleteButtonColor: string;

  // Avatar background
  primaryAvatarBackgroundColor: string;

  // Icons
  primaryIconColor: string;
  secondaryIconColor: string;
  primaryContrastIconColor: string;
  selectedIconColor: string;
  acceptIconColor: string;

  // Information
  infoIconColor: string;

  // Charts
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
  riskLevelBorderColors: IRiskLevelMap;
  riskLevelSelectedBackgroundColors: IRiskLevelMap;

  // Errors
  errorColor: string;

  // Overlay
  overlayColor: string;
}
