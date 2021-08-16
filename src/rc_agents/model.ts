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

// Role selection during clinician sign up
// Note: Role values must be compatible with the custom:hospital_role values for Cognito user groups
export enum Role {
  EP = "EP",
  MO = "MedicalOfficer",
  HF_SPECIALIST = "HFSpecialist",
  NURSE = "Nurse",
  PHARMACIST = "Pharmacist"
}

// Hospital selection during clinician sign up
export enum Hospital {
  PHKL = "Pantai Hospital Kuala Lumpur",
  GKL = "Gleneagles Kuala Lumpur",
  HEQ = "Hospital Queen Elizabeth",
  HQEII = "Hospital Queen Elizabeth II",
  HB = "Hospital Bintulu"
}

export enum PatientAssignmentStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REASSIGNED = "REASSIGNED"
}

export enum AlertStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  NONE = "NONE"
}

export enum AlertColorCode {
  HIGH = "red",
  MEDIUM = "yellow",
  LOW = "green",
  UNASSIGNED = "white"
}

export type RiskFilter = { [riskLevel in RiskLevel]: boolean };

export enum TodoStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED"
}

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
  [date: string]: ReportSymptom[];
};

export type LocalReportVitals = {
  [date: string]: ReportVitals[];
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
  riskLevel: RiskLevel;
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
  completed: boolean;
  createdAt?: string;
}

export interface TodoUpdateInput {
  id?: string;
  title: string;
  patientName: string;
  notes: string;
  alert?: AlertInfo;
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
  riskLevel?: RiskLevel;
  createdAt: string;
  lastModified?: string;
  toSync: boolean;
  _version: number;
}
