import { AlertColorCode, AlertStatus } from "rc_agents/model";
import { Alert } from "aws/API";

export const mockPendingAlerts: Alert[] = [
  {
    __typename: "Alert",
    id: "96afb44d-06ff-4bf5-bb4c-430bc0c4675d",
    summary: "Pending alert 1",
    patientID: "patient_john",
    patientName: "Muhammad Zaini",
    vitalsReportID: "ec6a324a-542d-470a-bf1e-176354f51afd",
    symptomReportID: "0c1cc890-a504-4d16-bcac-ea8dfb3d0105",
    dateTime: "2021-08-02T07:08:41.102Z",
    colorCode: AlertColorCode.HIGH,
    triageValue: "72",
    pending: AlertStatus.PENDING,
    createdAt: "",
    updatedAt: ""
  },
  {
    __typename: "Alert",
    id: "32127aeb-d8fb-4cb6-86fa-d6090f5b1836",
    summary: "Sudden increase in heart rate during daily acitvity",
    patientID: "patient_john",
    patientName: "John Doe",
    vitalsReportID: "f4b3879c-1dde-465d-9044-b87cf33c212e",
    symptomReportID: "fc9cc5a6-0beb-48a2-8724-11787668124f",
    dateTime: "2021-08-02T07:08:41.102Z",
    colorCode: AlertColorCode.MEDIUM,
    triageValue: "50",
    pending: AlertStatus.PENDING,
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
    triageValue: "75",
    pending: AlertStatus.PENDING,
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
    triageValue: "46",
    pending: AlertStatus.PENDING,
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
    triageValue: "74",
    completed: AlertStatus.COMPLETED,
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
    triageValue: "58",
    completed: AlertStatus.COMPLETED,
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
    triageValue: "10",
    colorCode: AlertColorCode.LOW,
    completed: AlertStatus.COMPLETED,
    createdAt: "",
    updatedAt: ""
  }
];

export const mockAlerts: Alert[] =
  mockPendingAlerts.concat(mockCompletedAlerts);
