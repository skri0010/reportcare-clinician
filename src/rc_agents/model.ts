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

export enum PatientAssignmentStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REASSIGNED = "REASSIGNED"
}

export enum AlertColorCode {
  HIGH = "red",
  MEDIUM = "yellow",
  LOW = "green",
  UNASSIGNED = "white"
}

// Interfaces shared with front end
export interface Patient {
  details: PatientInfo;
  userId: string;
  age: number;
  riskLevel: RiskLevel;
}
export interface PatientDetails {
  patientInfo?: PatientInfo;
  activityInfo: ActivityInfo[];
  symptomsReports: ReportSymptom[];
  vitalsReports: ReportVitals[];
}

export interface PatientAssignmentResolution {
  patientID: string;
  clinicianID: string;
  resolution: PatientAssignmentStatus;
  patientName: string;
  _version: number;
}

export interface PendingAlertCount {
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  unassignedRisk: number;
}

export interface AlertInfo {
  id: string;
  patientId: string;
  patientName: string;
  riskLevel?: RiskLevel;
  NHYAClass?: string;
  diagnosis?: string;
  dateTime: string;
  summary: string;
  vitals?: ReportVitals;
  symptoms?: ReportSymptom;
  lastMedication?: string;
  medicationQuantity?: string;
  activityDuringAlert?: string;
  completed: boolean;
}

export interface NewTodoInput {
  title: string;
  patientName: string;
  notes: string;
  alert?: AlertInfo;
}

export interface UpdatedTodoInput {
  id: string;
  title: string;
  notes: string;
  completed: boolean;
}

export interface Todo {
  id?: string;
  title: string;
  patientName: string;
  notes: string;
  completed: boolean;
  alertId?: string;
  patientId?: string;
  createdAt: string;
  lastModified?: string;
  pendingSync: boolean;
}
