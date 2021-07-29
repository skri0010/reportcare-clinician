import {
  ActivityInfo,
  ReportSymptom,
  ReportVitals,
  PatientInfo
} from "aws/API";
import { RiskLevel } from "models/RiskLevel";

export interface Fact {
  [k: string]: { [k: string]: any };
}

export interface PatientDetails {
  patientInfo?: PatientInfo;
  activityInfo: ActivityInfo[];
  symptomsReports: ReportSymptom[];
  vitalsReports: ReportVitals[];
}

export interface Patient {
  details: PatientInfo;
  userId: string;
  age: number;
  riskLevel: RiskLevel;
}

export interface Alert {
  patientId: string;
  // LS-TODO: Either complete vitals and symptoms reports or their IDs
  vitalsReport: ReportVitals;
  symptomsReport: ReportSymptom;
  dateTime: string;
}

export interface AlertInfo {
  patientId: string;
  alertDateTime: string;
  NHYAclass?: string;
  diagnosis?: string;
  lastMedication?: string;
  medicationQuantity?: string;
  activityDuringAlert?: string;
}

export enum AlertStatus {
  NEW = "New",
  PREVIOUS = "Previous"
}

export interface AlertDetails {
  patientName: string;
  patientId: string;
  summary: string;
  severity: RiskLevel;
  HRV: number;
  systolicBP: number;
  diastolicBP: number;
  symptom: string;
  sign: string;
  dateTime: string;
  status: AlertStatus;
}
