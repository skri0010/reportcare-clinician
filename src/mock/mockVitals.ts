import { ReportVitals } from "aws/API";
import { LocalReportVitals } from "rc_agents/model";
import { getWeekLocaleDateString } from "util/utilityFunctions";

const mockVitals: ReportVitals[] = [
  {
    __typename: "ReportVitals",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ab8",
    patientID: "Mohammad Zaini",
    dateTime: "2021-04-10T09:24:55.351Z",
    weight: 20,
    systolicBloodPressure: 55,
    diastolicBloodPressure: 84,
    oxygenSaturation: 70,
    fluidIntakeInMl: 2000,
    createdAt: "",
    updatedAt: ""
  },
  {
    __typename: "ReportVitals",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ab9",
    patientID: "Mohammad Zaini",
    dateTime: "2021-04-11T09:24:55.351Z",
    weight: 20,
    systolicBloodPressure: 55,
    diastolicBloodPressure: 74,
    oxygenSaturation: 70,
    fluidIntakeInMl: 5000,
    createdAt: "",
    updatedAt: ""
  },
  {
    __typename: "ReportVitals",
    dateTime: "2021-04-12T09:24:55.351Z",
    patientID: "Mohammad Zaini",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ac1",
    weight: 20,
    systolicBloodPressure: 55,
    diastolicBloodPressure: 64,
    oxygenSaturation: 70,
    fluidIntakeInMl: 1500,
    createdAt: "",
    updatedAt: ""
  },
  {
    __typename: "ReportVitals",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ac3",
    patientID: "Mohammad Zaini",
    weight: 20,
    systolicBloodPressure: 55,
    dateTime: "2021-04-13T09:24:55.351Z",
    oxygenSaturation: 70,
    fluidIntakeInMl: 1700,
    createdAt: "",
    updatedAt: ""
  }
];

const targetLocaleDateStrings = getWeekLocaleDateString();
const tempLocalReportVitals: LocalReportVitals = {};

let localeDateStringIndex = 0;
mockVitals.forEach((vitals) => {
  // Use dates from current date
  vitals.dateTime = new Date(
    targetLocaleDateStrings[localeDateStringIndex]
  ).toString();
  localeDateStringIndex =
    (localeDateStringIndex + 1) % targetLocaleDateStrings.length;

  // Get localReportVitals similar to RetrievePatientDetails
  const dateKey = new Date(vitals.dateTime).toLocaleDateString();
  const localVitalsReports = tempLocalReportVitals[dateKey];
  if (localVitalsReports) {
    localVitalsReports.push(vitals);
    tempLocalReportVitals[dateKey] = localVitalsReports;
  } else {
    tempLocalReportVitals[dateKey] = [vitals];
  }
});

export const mockLocalReportVitals = tempLocalReportVitals;
