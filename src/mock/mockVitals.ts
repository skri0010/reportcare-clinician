import { ReportVitals } from "aws/API";
import { LocalReportVitals } from "rc_agents/model";
import { getWeekLocaleDateString } from "util/utilityFunctions";

const mockVitals: ReportVitals[] = [
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    BPDi: "44",
    BPSys: "11",
    DateTime: "2021-04-10T09:24:55.351Z",
    Humidity: undefined,
    NoSteps: "123",
    OxySat: "70",
    Temperature: undefined,
    Weight: "20",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ab8",
    createdAt: "",
    updatedAt: "",
    _lastChangedAt: 1627604201979,
    _version: 1
  },
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    BPDi: "44",
    BPSys: "11",
    DateTime: "2021-04-11T09:24:55.351Z",
    Humidity: undefined,
    NoSteps: "123",
    OxySat: "70",
    Temperature: undefined,
    Weight: "20",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ab9",
    createdAt: "",
    updatedAt: "",
    _lastChangedAt: 1627604201979,
    _version: 1
  },
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    BPDi: "44",
    BPSys: "11",
    DateTime: "2021-04-12T09:24:55.351Z",
    Humidity: undefined,
    NoSteps: "123",
    OxySat: "70",
    Temperature: undefined,
    Weight: "20",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ac1",
    createdAt: "",
    updatedAt: "",
    _lastChangedAt: 1627604201979,
    _version: 1
  },
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    BPDi: "44",
    BPSys: "11",
    DateTime: "2021-04-13T09:24:55.351Z",
    Humidity: undefined,
    NoSteps: "123",
    OxySat: "70",
    Temperature: undefined,
    Weight: "20",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ac3",
    createdAt: "",
    updatedAt: "",
    _lastChangedAt: 1627604201979,
    _version: 1
  },
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    BPDi: "50",
    BPSys: "200",
    DateTime: "2021-04-13T09:20:47.251Z",
    Humidity: undefined,
    NoSteps: "100",
    OxySat: "200",
    Temperature: undefined,
    Weight: "99",
    id: "37e7e083-b61f-4d34-891a-89bc1c6f6cc4",
    createdAt: "",
    updatedAt: "",
    _lastChangedAt: 1627604201979,
    _version: 1
  },
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    BPDi: "50",
    BPSys: "",
    DateTime: "2021-04-13T09:20:47.251Z",
    Humidity: undefined,
    NoSteps: "100",
    OxySat: "200",
    Temperature: undefined,
    Weight: "99",
    id: "37e7e083-b61f-4d34-891a-89bc1c6f6cc5",
    createdAt: "",
    updatedAt: "",
    _lastChangedAt: 1627604201979,
    _version: 1
  },
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    BPDi: "50",
    BPSys: "200",
    DateTime: "2021-04-14T09:20:47.251Z",
    Humidity: undefined,
    NoSteps: "100",
    OxySat: "200",
    Temperature: undefined,
    Weight: "99",
    id: "37e7e083-b61f-4d34-891a-89bc1c6f6cc6",
    createdAt: "",
    updatedAt: "",
    _lastChangedAt: 1627604201979,
    _version: 1
  },
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    BPDi: "60",
    BPSys: "200",
    DateTime: "2021-04-15T09:20:47.251Z",
    Humidity: undefined,
    NoSteps: "100",
    OxySat: "200",
    Temperature: undefined,
    Weight: "99",
    id: "37e7e083-b61f-4d34-891a-89bc1c6f6cc7",
    createdAt: "",
    updatedAt: "",
    _lastChangedAt: 1627604201979,
    _version: 1
  },
  {
    __typename: "ReportVitals",
    patientID: "Mohammad Zaini",
    BPDi: "50",
    BPSys: "195",
    DateTime: "2021-04-16T09:24:55.351Z",
    Humidity: undefined,
    NoSteps: "80",
    OxySat: "100",
    Temperature: undefined,
    Weight: "80",
    id: "5b22208a-da5e-430d-a661-a6530bbb5ab8",
    createdAt: "",
    updatedAt: "",
    _lastChangedAt: 1627604201979,
    _version: 1
  },
  {
    __typename: "ReportVitals",
    patientID: "Muhammad Zaini",
    BPDi: "50",
    BPSys: "195",
    DateTime: "2021-04-16T09:24:55.351Z",
    Humidity: undefined,
    NoSteps: "80",
    OxySat: "100",
    Temperature: undefined,
    Weight: "80",
    id: "36ee7c15-8772-4679-aade-6b3d7f4c7707",
    createdAt: "",
    updatedAt: "",
    _lastChangedAt: 1627604201979,
    _version: 1
  },
  {
    __typename: "ReportVitals",
    patientID: "Tyler Haris",
    BPDi: "70",
    BPSys: "195",
    DateTime: "2021-04-16T09:24:55.351Z",
    Humidity: undefined,
    NoSteps: "80",
    OxySat: "100",
    Temperature: undefined,
    Weight: "80",
    id: "3",
    createdAt: "",
    updatedAt: "",
    _lastChangedAt: 1627604201979,
    _version: 1
  },
  {
    __typename: "ReportVitals",
    patientID: "Danial Williams",
    BPDi: "90",
    BPSys: "",
    DateTime: "2021-04-16T09:24:55.351Z",
    Humidity: undefined,
    NoSteps: "80",
    OxySat: "100",
    Temperature: undefined,
    Weight: "80",
    id: "6",
    createdAt: "",
    updatedAt: "",
    _lastChangedAt: 1627604201979,
    _version: 1
  }
];

const targetLocaleDateStrings = getWeekLocaleDateString();
const tempLocalReportVitals: LocalReportVitals = {};

let localeDateStringIndex = 0;
mockVitals.forEach((vitals) => {
  // Use dates from current date
  vitals.DateTime = new Date(
    targetLocaleDateStrings[localeDateStringIndex]
  ).toString();
  localeDateStringIndex =
    (localeDateStringIndex + 1) % targetLocaleDateStrings.length;

  // Get localReportVitals similar to RetrievePatientDetails
  const dateKey = new Date(vitals.DateTime).toLocaleDateString();
  const localVitalsReports = tempLocalReportVitals[dateKey];
  if (localVitalsReports) {
    localVitalsReports.push(vitals);
    tempLocalReportVitals[dateKey] = localVitalsReports;
  } else {
    tempLocalReportVitals[dateKey] = [vitals];
  }
});

export const mockLocalReportVitals = tempLocalReportVitals;
