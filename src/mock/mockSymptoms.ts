import { ReportSymptom } from "aws/models";

export const mockSymptomRecords: ReportSymptom[] = [
  {
    id: "1",
    ActId: "2",
    Name: "Breathlessness",
    Severity: "4",
    DateTime: "28-07-201",
    patientID: "1"
  },
  {
    id: "2",
    ActId: "4",
    Name: "Sleeplessness",
    Severity: "4",
    DateTime: "28-07-201",
    patientID: "1"
  },
  {
    id: "3",
    ActId: "2",
    Name: "Tiredness",
    Severity: "4",
    DateTime: "28-07-201",
    patientID: "1"
  }
];
