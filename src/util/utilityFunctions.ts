import { ReportVitals, Alert, ClinicianRecord } from "aws/API";
import { RiskLevel } from "models/RiskLevel";
import moment from "moment";
import { AlertInfo, mapColorCodeToRiskLevel } from "rc_agents/model";

const DELETE_RECORD_GRACE_PERIOD_IN_MS = 1000 * 60 * 60 * 24 * 2; // 2 days

export const withinDeleteGracePeriod = (record: ClinicianRecord): boolean => {
  const recordCreateDateTime = new Date(
    record.uploadDateTime || record.createdAt
  );
  const currentDateTime = new Date();
  return (
    currentDateTime.valueOf() - recordCreateDateTime.valueOf() <
    DELETE_RECORD_GRACE_PERIOD_IN_MS
  );
};

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

export const prettify = (any: any): string => {
  return JSON.stringify(any, null, 2);
};

// Requirements: Get last 7 days of parameters.
// This function is used to get the locale date string of the last 7 days
export const getWeekLocaleDateString = (): string[] => {
  const dates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = moment().subtract(i, "days");
    dates.push(new Date(date.toString()).toLocaleDateString());
  }
  return dates;
};

export const getLocalDateTime = (datetime: string): string => {
  const localDateTime = moment.utc(datetime).local();
  return localDateTime.format("HH:mm DD-MM-YYYY");
};

export const getLatestVitalsReport = (
  reports: ReportVitals[]
): ReportVitals | undefined => {
  const datetimeList = reports.map((report) => Date.parse(report.DateTime));
  const latestDatetime = Math.max(...datetimeList);
  const latestReport: ReportVitals | undefined = reports.find(
    (item) => item.DateTime === new Date(latestDatetime).toISOString()
  );
  return latestReport;
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

// Sorts AlertInfo[] in descending date time
export const sortAlertInfoByDescendingDateTime = (
  alerts: AlertInfo[]
): AlertInfo[] => {
  return alerts.sort((a, b) => {
    const date1 = new Date(a.dateTime);
    const date2 = new Date(b.dateTime);
    return date2.getTime() - date1.getTime();
  });
};

// Sorts AlertInfo[] in descending risk level followed by date time
export const sortAlertInfoByDescendingRiskLevelAndDateTime = (
  alerts: AlertInfo[]
): AlertInfo[] => {
  const riskLevelOrder = {
    [RiskLevel.HIGH]: 3,
    [RiskLevel.MEDIUM]: 2,
    [RiskLevel.LOW]: 1,
    [RiskLevel.UNASSIGNED]: 0
  };

  return alerts.sort((a, b) => {
    if (riskLevelOrder[a.riskLevel] === riskLevelOrder[b.riskLevel]) {
      const date1 = new Date(a.dateTime);
      const date2 = new Date(b.dateTime);
      return date2.getTime() - date1.getTime();
    }
    return riskLevelOrder[b.riskLevel] - riskLevelOrder[a.riskLevel];
  });
};

// Sorts IcdCrtRecord[] in descending datetime
export const sortIcdCrtRecordsByDescendingDateTime = (
  records: ClinicianRecord[]
): ClinicianRecord[] => {
  return records.sort((a, b) => {
    if (a.uploadDateTime && b.uploadDateTime) {
      const date1 = new Date(a.uploadDateTime);
      const date2 = new Date(b.uploadDateTime);
      return date2.getTime() - date1.getTime();
    }
    return 0;
  });
};

// Filters out null items from a list
export const getNonNullItemsFromList = (list: any[]): any[] => {
  return list.flatMap((item) => (item ? [item] : []));
};
