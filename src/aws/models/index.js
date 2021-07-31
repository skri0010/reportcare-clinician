// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PatientInfo, MedicationInfo, ActivityInfo, MedCompliant, ReportSymptom, ReportVitals, ClinicianInfo, ClinicianProtectedInfo, PatientAssignment, ClinicianPatientMap } = initSchema(schema);

export {
  PatientInfo,
  MedicationInfo,
  ActivityInfo,
  MedCompliant,
  ReportSymptom,
  ReportVitals,
  ClinicianInfo,
  ClinicianProtectedInfo,
  PatientAssignment,
  ClinicianPatientMap
};