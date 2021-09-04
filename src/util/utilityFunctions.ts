import { Alert } from "aws/API";
import moment from "moment";
import { AlertInfo, mapColorCodeToRiskLevel } from "rc_agents/model";

export const getAge = (birthDate: string): string => {
  let age = "?";
  const now = new Date();
  const birth = new Date(birthDate);

  // Ensure birth date is valid
  if (birth.getTime()) {
    const momentNow = moment([now.getFullYear(), now.getMonth()]);
    const momentBirth = moment([birth.getFullYear(), birth.getMonth()]);
    age = momentNow.diff(momentBirth, "years").toString();
  }
  return age;
};

export const getLocalDateTime = (datetime: string): string => {
  const localDateTime = moment.utc(datetime).local();
  return localDateTime.format("HH:mm DD-MM-YYYY");
};

export const capitalizeFirstLetter = (str: string): string => {
  try {
    return `${str[0].toUpperCase()}${str.substring(1).toLowerCase()}`;
  } catch (error) {
    return str;
  }
};

// Convert Alert[] to AlertInfo[]
export const convertAlertsToAlertInfos = (alerts: Alert[]): AlertInfo[] => {
  const alertInfos: AlertInfo[] = alerts.map((alert) =>
    convertAlertToAlertInfo(alert)
  );
  return alertInfos;
};

// Convert Alert to AlertInfo
export const convertAlertToAlertInfo = (alert: Alert): AlertInfo => ({
  ...alert, // Do not make any changes to additional optional attributes of AlertInfo
  riskLevel: mapColorCodeToRiskLevel(alert.colorCode)
});

// Sorts AlertInfo[] in descending datetime
export const sortAlertInfoByDescendingDateTime = (
  alerts: AlertInfo[]
): AlertInfo[] => {
  return alerts.sort((a, b) => {
    const date1 = new Date(a.dateTime);
    const date2 = new Date(b.dateTime);
    return date2.getTime() - date1.getTime();
  });
};
