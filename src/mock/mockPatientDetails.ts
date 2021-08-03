import { RiskLevel } from "models/RiskLevel";

export interface AlertHistory {
  patientId: string;
  risk: RiskLevel;
  date: string;
  time: string;
  description: string;
  HRV: number;
  BP: string;
  symptom: string;
  signs: string;
}

export const mockAlertHistory: AlertHistory[] = [
  {
    patientId: "1",
    risk: RiskLevel.HIGH,
    date: "05-07-2020",
    time: "13:25",
    description: "Sudden increase in heart rate during daily activity",
    HRV: 89,
    BP: "180/130",
    symptom: "Breathlessness (Scale 4)",
    signs: "Edema (Scale 3)"
  },
  {
    patientId: "1",
    risk: RiskLevel.HIGH,
    date: "06-07-2020",
    description: "Lorem Ipsum",
    time: "13:25",
    HRV: 87,
    BP: "170/130",
    symptom: "Breathlessness (Scale 4)",
    signs: "Edema (Scale 3)"
  },
  {
    patientId: "1",
    risk: RiskLevel.MEDIUM,
    date: "07-07-2020",
    description: "Jump in heart rate after standing up",
    time: "13:25",
    HRV: 89,
    BP: "185/130",
    symptom: "Rapid heart rate (Scale 4)",
    signs: "Edema (Scale 3)"
  }
];

export interface MedicalRecords {
  patientId: string;
  record: string;
  content: string;
}

export const mockMedicalRecord: MedicalRecords[] = [
  {
    patientId: "1",
    record: "6 minute Walk Test",
    content: "6 minute walk test results"
  },
  {
    patientId: "1",
    record: "Family Background",
    content: "Family history of diabetes and high blood pressure"
  },
  {
    patientId: "1",
    record: "Initial Record",
    content: "Diabetic"
  }
];
