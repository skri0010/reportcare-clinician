import { ActivityInfo, ReportSymptom, ReportVitals } from "aws/API";
import { PatientInfo } from "aws/models";
import { RiskLevel } from "models/RiskLevel";

export interface Fact {
  [k: string]: { [k: string]: any };
}

export interface PatientDetails {
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
