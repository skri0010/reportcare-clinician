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
  _version: number;
}

export interface AlertInfo {
  id: string;
  patientId: string;
  patientInfo?: PatientInfo;
  dateTime: string;
  summary: string;
  vitals?: ReportVitals;
  symptoms?: ReportSymptom;
  lastMedication?: string;
  medicationQuantity?: string;
  activityDuringAlert?: string;
  completed: boolean;
  riskLevel?: RiskLevel;
}

export interface NewTodoInput {
  title: string;
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
  notes: string;
  completed: boolean;
  alertId?: string;
  patientId?: string;
  createdAt: string;
  lastModified?: string;
  pendingSync: boolean;
}
