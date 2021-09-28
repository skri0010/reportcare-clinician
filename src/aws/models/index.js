// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PatientInfo, MedicationInfo, ActivityInfo, MedCompliant, ReportSymptom, ReportVitals, MedicalRecord, ClinicianInfo, ClinicianProtectedInfo, ClinicianPatientMap, PatientAssignment, Alert, Todo, AlertNotification } = initSchema(schema);

export {
  PatientInfo,
  MedicationInfo,
  ActivityInfo,
  MedCompliant,
  ReportSymptom,
  ReportVitals,
  MedicalRecord,
  ClinicianInfo,
  ClinicianProtectedInfo,
  ClinicianPatientMap,
  PatientAssignment,
  Alert,
  Todo,
  AlertNotification
};