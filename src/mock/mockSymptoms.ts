import { ReportSymptom } from "aws/API";

export const mockSymptomRecords: ReportSymptom[] = [
  {
    __typename: "ReportSymptom",
    id: "1",
    ActId: "2",
    Name: "Breathlessness",
    Severity: "4",
    DateTime: "28-07-201",
    patientID: "1",
    createdAt: "",
    updatedAt: "",
    _lastChangedAt: 1627604201979,
    _version: 1
  },
  {
    __typename: "ReportSymptom",
    id: "2",
    ActId: "4",
    Name: "Sleeplessness",
    Severity: "4",
    DateTime: "28-07-201",
    patientID: "1",
    createdAt: "",
    updatedAt: "",
    _lastChangedAt: 1627604201979,
    _version: 1
  },
  {
    __typename: "ReportSymptom",
    id: "3",
    ActId: "2",
    Name: "Tiredness",
    Severity: "4",
    DateTime: "28-07-201",
    patientID: "1",
    createdAt: "",
    updatedAt: "",
    _lastChangedAt: 1627604201979,
    _version: 1
  }
];
