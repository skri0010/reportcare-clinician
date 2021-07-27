import { PersonRowGeneralDetails } from "models/PersonRowDetails";
import { ActivityInfo, ReportSymptom, ReportVitals } from "aws/API";

export interface Fact {
  [k: string]: { [k: string]: any };
}

export interface PatientDetails {
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
