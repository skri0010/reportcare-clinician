import { AlertColorCode } from "agents_implementation/agent_framework/model";
import { Alert } from "aws/API";

export const mockAlerts: Alert[] = [
  {
    __typename: "Alert",
    id: "1",
    summary: "",
    patientID: "siuloongtest",
    vitalsReportID: "36ee7c15-8772-4679-aade-6b3d7f4c7707",
    symptomReportID: "9f1a0821-2a0c-4608-9ee6-997a43822448",
    dateTime: "2021-08-02T07:08:41.102Z",
    colorCode: AlertColorCode.HIGH,
    completed: false,
    owner: "siuloongtest",
    _version: 1,
    _lastChangedAt: 0,
    createdAt: "",
    updatedAt: ""
  },
  {
    __typename: "Alert",
    id: "2",
    summary: "",
    patientID: "siuloongtest",
    vitalsReportID: "36ee7c15-8772-4679-aade-6b3d7f4c7707",
    symptomReportID: "9f1a0821-2a0c-4608-9ee6-997a43822448",
    dateTime: "2021-08-03T07:08:41.102Z",
    colorCode: AlertColorCode.MEDIUM,
    completed: false,
    owner: "siuloongtest",
    _version: 1,
    _lastChangedAt: 0,
    createdAt: "",
    updatedAt: ""
  }
];
