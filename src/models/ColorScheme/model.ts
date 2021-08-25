import { IRiskLevelMap } from "models/RiskLevel";

export interface ColorScheme {
  // Text
  primaryTextColor: string;
  secondaryTextColor: string;
  primaryContrastTextColor: string;
  secondaryContrastTextColor: string;
  selectedTextColor: string;

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

  // Others
  riskLevelBackgroundColors: IRiskLevelMap;
  riskLevelBorderColors: IRiskLevelMap;
  riskLevelSelectedBackgroundColors: IRiskLevelMap;

  // Errors
  errorColor: string;

  // Overlay
  overlayColor: string;
}
