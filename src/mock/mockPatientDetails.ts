import { RiskLevel } from "models/RiskLevel";

export interface AlertHistory {
  patientId: string;
  risk: RiskLevel;
  date: string;
  description: string;
}

export const mockAlertHistory: AlertHistory[] = [
  {
    patientId: "1",
    risk: RiskLevel.HIGH,
    date: "05-07-2020",
    description: "Sudden increase in heart rate during daily activity"
  },
  {
    patientId: "1",
    risk: RiskLevel.HIGH,
    date: "06-07-2020",
    description: "Lorem Ipsum"
  },
  {
    patientId: "1",
    risk: RiskLevel.MEDIUM,
    date: "07-07-2020",
    description: "Jump in heart rate after standing up"
  }
];

export interface MedicalRecords {
  patientId: string;
  record: string;
}

export const mockMedicalRecord: MedicalRecords[] = [
  {
    patientId: "1",
    record: "6 minute Walk Test"
  },
  {
    patientId: "1",
    record: "Family Background"
  },
  {
    patientId: "1",
    record: "Initial Record"
  }
];
