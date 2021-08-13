import { AlertColorCode } from "rc_agents/model";
import { AlertStatus } from "aws";
import { Alert } from "aws/API";

export const mockPendingAlerts: Alert[] = [
  {
    __typename: "Alert",
    id: "1",
    summary: "Pending alert 1",
    patientID: "siuloongtest",
    patientName: "Muhammad Zaini",
    vitalsReportID: "36ee7c15-8772-4679-aade-6b3d7f4c7707",
    symptomReportID: "9f1a0821-2a0c-4608-9ee6-997a43822448",
    dateTime: "2021-08-02T07:08:41.102Z",
    colorCode: AlertColorCode.HIGH,
    pending: AlertStatus.PENDING,
    owner: "siuloongtest",
    _version: 1,
    _lastChangedAt: 0,
    createdAt: "",
    updatedAt: ""
  },
  {
    __typename: "Alert",
    id: "4",
    summary: "Sudden increase in heart rate during daily acitvity",
    patientID: "Muhammad Zaini",
    patientName: "Muhammad Zaini",
    vitalsReportID: "36ee7c15-8772-4679-aade-6b3d7f4c7707",
    symptomReportID: "9f1a0821-2a0c-4608-9ee6-997a43822448",
    dateTime: "2021-08-02T07:08:41.102Z",
    colorCode: AlertColorCode.HIGH,
    pending: AlertStatus.PENDING,
    owner: "siuloongtest",
    _version: 1,
    _lastChangedAt: 0,
    createdAt: "",
    updatedAt: ""
  },
  {
    __typename: "Alert",
    id: "2",
    summary: "Pending alert 2",
    patientID: "siuloongtest",
    patientName: "Tyler Haris",
    vitalsReportID: "3",
    symptomReportID: "9",
    dateTime: "2021-08-03T07:08:41.102Z",
    colorCode: AlertColorCode.HIGH,
    pending: AlertStatus.PENDING,
    owner: "siuloongtest",
    _version: 1,
    _lastChangedAt: 0,
    createdAt: "",
    updatedAt: ""
  },
  {
    __typename: "Alert",
    id: "3",
    summary: "Pending alert 3",
    patientID: "siuloongtest",
    patientName: "Danial Williams",
    vitalsReportID: "6",
    symptomReportID: "10",
    dateTime: "2021-08-03T07:08:41.102Z",
    colorCode: AlertColorCode.MEDIUM,
    pending: AlertStatus.PENDING,
    owner: "siuloongtest",
    _version: 1,
    _lastChangedAt: 0,
    createdAt: "",
    updatedAt: ""
  }
];

export const mockCompletedAlerts: Alert[] = [
  {
    __typename: "Alert",
    id: "4",
    summary: "Completed alert 4",
    patientID: "siuloongtest",
    patientName: "Mohammad Abdul",
    vitalsReportID: "36ee7c15-8772-4679-aade-6b3d7f4c7707",
    symptomReportID: "9f1a0821-2a0c-4608-9ee6-997a43822448",
    dateTime: "2021-08-02T07:08:41.102Z",
    colorCode: AlertColorCode.HIGH,
    completed: AlertStatus.COMPLETED,
    owner: "siuloongtest",
    _version: 1,
    _lastChangedAt: 0,
    createdAt: "",
    updatedAt: ""
  },
  {
    __typename: "Alert",
    id: "5",
    summary: "Completed alert 5",
    patientID: "siuloongtest",
    patientName: "Muhammad Zaini",
    vitalsReportID: "36ee7c15-8772-4679-aade-6b3d7f4c7707",
    symptomReportID: "9f1a0821-2a0c-4608-9ee6-997a43822448",
    dateTime: "2021-08-03T07:08:41.102Z",
    colorCode: AlertColorCode.MEDIUM,
    completed: AlertStatus.COMPLETED,
    owner: "siuloongtest",
    _version: 1,
    _lastChangedAt: 0,
    createdAt: "",
    updatedAt: ""
  },
  {
    __typename: "Alert",
    id: "6",
    summary: "Pending alert 6",
    patientID: "siuloongtest",
    patientName: "Danial Williams",
    vitalsReportID: "36ee7c15-8772-4679-aade-6b3d7f4c7707",
    symptomReportID: "9f1a0821-2a0c-4608-9ee6-997a43822448",
    dateTime: "2021-08-03T07:08:41.102Z",
    colorCode: AlertColorCode.LOW,
    completed: AlertStatus.COMPLETED,
    owner: "siuloongtest",
    _version: 1,
    _lastChangedAt: 0,
    createdAt: "",
    updatedAt: ""
  }
];

export const mockAlerts: Alert[] =
  mockPendingAlerts.concat(mockCompletedAlerts);
