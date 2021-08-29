import { ReportVitals } from "aws/API";
import moment from "moment";

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
