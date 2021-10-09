import {
  ActivityInfo,
  ReportSymptom,
  ReportVitals,
  PatientInfo,
  Alert,
  ClinicianRecord
} from "aws/API";
import { RiskLevel } from "models/RiskLevel";

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
  UNKNOWN = "",
  PHKL = "Pantai Hospital Kuala Lumpur",
  GKL = "Gleneagles Kuala Lumpur",
  HEQ = "Hospital Queen Elizabeth",
  HQEII = "Hospital Queen Elizabeth II",
  HB = "Hospital Bintulu"
}

export enum NYHAClass {
  UNKNOWN = "",
  I = "I",
  II = "II",
  III = "III",
  IV = "IV"
}

export enum PatientAssignmentStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REASSIGNED = "REASSIGNED"
}

export enum AlertStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED"
}

export enum FetchAlertsMode {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  ALL = "ALL",
  NONE = "NONE"
}

export enum AlertColorCode {
  HIGH = "red",
  MEDIUM = "yellow",
  LOW = "green",
  UNASSIGNED = "white"
}

/**
 * Maps alert's color code to risk level.
 * @param colorCode alert's color code
 * @returns risk level corresponding to the color code
 */
export const mapColorCodeToRiskLevel = (colorCode: string): RiskLevel => {
  switch (colorCode) {
    case AlertColorCode.HIGH:
      return RiskLevel.HIGH;
    case AlertColorCode.MEDIUM:
      return RiskLevel.MEDIUM;
    case AlertColorCode.LOW:
      return RiskLevel.LOW;
    case AlertColorCode.UNASSIGNED:
      return RiskLevel.UNASSIGNED;
    default:
      return RiskLevel.UNASSIGNED;
  }
};

export type RiskFilter = { [riskLevel in RiskLevel]: boolean };

export enum TodoStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED"
}

export type RecordFile = {
  path?: string;
  size?: number;
  name: string; // Part of File
  type: string; // Part of File
  lastModifiedData: string; // Part of File
  lastModified: string; // Part of File
} & File;

// Interfaces shared with front end
export interface PatientDetails {
  patientInfo: PatientInfo;
  activityInfos: LocalActivityInfos;
  symptomReports: LocalReportSymptoms;
  vitalsReports: LocalReportVitals;
  medicalRecords: ClinicianRecord[];
  icdCrtRecords: ClinicianRecord[];
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
  patientName: string;
  resolution: PatientAssignmentStatus;
  reassignToClinicianID?: string;
  _version: number;
}

export interface AlertsCount {
  highRisk: number;
  mediumRisk: number;
  lowRisk: number;
  unassignedRisk: number;
}

export type AlertInfo = {
  riskLevel: RiskLevel;
  diagnosis?: string;
  NYHAClass?: string;
  lastMedication?: string;
  medicationQuantity?: number;
  activityDuringAlert?: string;
} & Alert;

export type ProcessedAlertInfos = {
  [patientID: string]: AlertInfo[] | undefined;
};

export interface TodoInput {
  id?: string;
  title: string;
  patientName: string;
  notes: string;
  completed: boolean;
  // Attributes for associated Alert
  alert?: AlertInfo;
  alertId?: string;
  patientId?: string;
  riskLevel?: RiskLevel;
  // End of attributes for associated Alert
  createdAt: string;
  lastModified?: string;
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

export interface TodoDetails {
  id: string;
}

export interface ClinicianRecordInput {
  title: string;
  patientID: string;
  file: RecordFile;
}
