import { ReportVitals } from "aws/API";
import { LocalReportVitals } from "rc_agents/model";
import { getWeekLocaleDateString } from "util/utilityFunctions";

const mockVitals: ReportVitals[] = [
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ab8",
    createdAt: "",
    updatedAt: "",
    diastolicBloodPressure: 84,
    systolicBloodPressure: 55,
    dateTime: "2021-04-10T09:24:55.351Z",
    oxygenSaturation: 70,
    fluidIntakeInMl: 200,
    weight: 20
  },
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ab9",
    createdAt: "",
    updatedAt: "",
    diastolicBloodPressure: 74,
    systolicBloodPressure: 55,
    dateTime: "2021-04-11T09:24:55.351Z",
    oxygenSaturation: 70,
    fluidIntakeInMl: 500,
    weight: 20
  },
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ac1",
    createdAt: "",
    updatedAt: "",
    diastolicBloodPressure: 64,
    systolicBloodPressure: 55,
    dateTime: "2021-04-12T09:24:55.351Z",
    oxygenSaturation: 70,
    fluidIntakeInMl: 150,
    weight: 20
  },
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ac3",
    createdAt: "",
    updatedAt: "",
    systolicBloodPressure: 55,
    dateTime: "2021-04-13T09:24:55.351Z",
    oxygenSaturation: 70,
    fluidIntakeInMl: 170,
    weight: 20
  },
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    id: "37e7e083-b61f-4d34-891a-89bc1c6f6cc4",
    createdAt: "",
    updatedAt: "",
    diastolicBloodPressure: 90,
    systolicBloodPressure: 200,
    dateTime: "2021-04-13T09:20:47.251Z",
    oxygenSaturation: 100,
    fluidIntakeInMl: 250,
    weight: 99
  },
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    id: "37e7e083-b61f-4d34-891a-89bc1c6f6cc5",
    createdAt: "",
    updatedAt: "",
    diastolicBloodPressure: 70,
    dateTime: "2021-04-13T09:20:47.251Z",
    oxygenSaturation: 100,
    fluidIntakeInMl: 300,
    weight: 99
  },
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    id: "37e7e083-b61f-4d34-891a-89bc1c6f6cc6",
    createdAt: "",
    updatedAt: "",
    diastolicBloodPressure: 55,
    systolicBloodPressure: 200,
    dateTime: "2021-04-14T09:20:47.251Z",
    oxygenSaturation: 100,
    fluidIntakeInMl: 10,
    weight: 99
  },
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    id: "37e7e083-b61f-4d34-891a-89bc1c6f6cc7",
    createdAt: "",
    updatedAt: "",
    diastolicBloodPressure: 60,
    systolicBloodPressure: 200,
    dateTime: "2021-04-15T09:20:47.251Z",
    oxygenSaturation: 90,
    weight: 99
  },
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ab8",
    createdAt: "",
    updatedAt: "",
    diastolicBloodPressure: 50,
    systolicBloodPressure: 195,
    dateTime: "2021-04-16T09:24:55.351Z",
    oxygenSaturation: 100,
    fluidIntakeInMl: 1000,
    weight: 80
  },
  {
    __typename: "ReportVitals",
    patientID: "Muhammad Zaini",
    id: "36ee7c15-8772-4679-aade-6b3d7f4c7707",
    createdAt: "",
    updatedAt: "",
    diastolicBloodPressure: 50,
    systolicBloodPressure: 195,
    dateTime: "2021-04-16T09:24:55.351Z",
    oxygenSaturation: 100,
    fluidIntakeInMl: 700,
    weight: 80
  },
  {
    __typename: "ReportVitals",
    patientID: "Tyler Haris",
    id: "3",
    createdAt: "",
    updatedAt: "",
    systolicBloodPressure: 195,
    dateTime: "2021-04-16T09:24:55.351Z",
    oxygenSaturation: 100,
    fluidIntakeInMl: 70,
    weight: 80
  },
  {
    __typename: "ReportVitals",
    patientID: "Danial Williams",
    id: "6",
    createdAt: "",
    updatedAt: "",
    diastolicBloodPressure: 90,
    dateTime: "2021-04-16T09:24:55.351Z",
    oxygenSaturation: 100,
    fluidIntakeInMl: 699,
    weight: 80
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
