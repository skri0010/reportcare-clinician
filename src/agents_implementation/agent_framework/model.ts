import { PersonRowGeneralDetails } from "models/PersonRowDetails";
import {
  ActivityInfo,
  PatientInfo,
  ReportSymptom,
  ReportVitals
} from "aws/API";

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
  details: PersonRowGeneralDetails;
  userId: string;
  class: string;
  age: number;
}
