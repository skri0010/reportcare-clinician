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

export type RiskFilter = { [riskLevel in RiskLevel]: boolean };

// Interfaces shared with front end
export interface PatientDetails {
  patientInfo: PatientInfo;
  activityInfos: LocalActivityInfos;
  symptomReports: LocalReportSymptoms;
  vitalsReports: LocalReportVitals;
}

export type LocalActivityInfos = {
  [id: string]: ActivityInfo;
};

// Indexed by date then id
export type LocalReportSymptoms = {
  [date: string]: ReportSymptom[] | undefined;
};

export type LocalReportVitals = {
  [date: string]: ReportVitals[] | undefined;
};

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
  _version: number;
}

export interface TodoCreateInput {
  title: string;
  patientName: string;
  notes: string;
  alert?: AlertInfo;
}

export interface TodoUpdateInput {
  id: string;
  title: string;
  patientName: string;
  notes: string;
  completed: boolean;
  createdAt: string;
  _version: number;
}

export interface LocalTodo {
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
  _version: number;
}
