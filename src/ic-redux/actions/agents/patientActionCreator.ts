import { AlertInfo, PatientDetails } from "rc_agents/model";
import { actionNames } from "ic-redux/actions/actionNames";
import { createAction } from "typesafe-actions";
import { PatientInfo, ClinicianRecord } from "aws/API";

export const setPatients = createAction(
  actionNames.SET_PATIENTS,
  (patients: PatientInfo[]) => ({
    patients: patients
  })
)();

export const setPatientDetails = createAction(
  actionNames.SET_PATIENT_DETAILS,
  (patientDetails: PatientDetails | null) => ({
    patientDetails: patientDetails
  })
)();

export const setFetchingPatients = createAction(
  actionNames.SET_FETCHING_PATIENTS,
  (fetchingPatients: boolean) => ({
    fetchingPatients: fetchingPatients
  })
)();

export const setFetchingPatientDetails = createAction(
  actionNames.SET_FETCHING_PATIENT_DETAILS,
  (fetchingPatientDetails: boolean) => ({
    fetchingPatientDetails: fetchingPatientDetails
  })
)();

export const setFetchingPatientAlertHistory = createAction(
  actionNames.SET_FETCHING_PATIENT_ALERT_HISTORY,
  (fetchingPatientAlertHistory: boolean) => ({
    fetchingPatientAlertHistory: fetchingPatientAlertHistory
  })
)();

export const setAlertHistory = createAction(
  actionNames.SET_ALERT_HISTORY,
  (alertHistory: AlertInfo[]) => ({
    alertHistory: alertHistory
  })
)();

export const setCreatingMedicalRecord = createAction(
  actionNames.SET_CREATING_MEDICAL_RECORD,
  (creatingMedicalRecord: boolean) => ({
    creatingMedicalRecord: creatingMedicalRecord
  })
)();

export const setCreateMedicalRecordSuccessful = createAction(
  actionNames.SET_CREATE_MEDICAL_RECORD_SUCCESSFUL,
  (createMedicalRecordSuccessful: boolean) => ({
    createMedicalRecordSuccessful: createMedicalRecordSuccessful
  })
)();

export const setFetchingMedicalRecords = createAction(
  actionNames.SET_FETCHING_MEDICAL_RECORDS,
  (fetchingMedicalRecords: boolean) => ({
    fetchingMedicalRecords: fetchingMedicalRecords
  })
)();

export const setMedicalRecords = createAction(
  actionNames.SET_MEDICAL_RECORDS,
  (medicalRecords: ClinicianRecord[]) => ({
    medicalRecords: medicalRecords
  })
)();

export const setFetchingMedicalRecordContent = createAction(
  actionNames.SET_FETCHING_MEDICAL_RECORD_CONTENT,
  (fetchingMedicalRecordContent: boolean) => ({
    fetchingMedicalRecordContent: fetchingMedicalRecordContent
  })
)();

export const setCreatingIcdCrtRecord = createAction(
  actionNames.SET_CREATING_ICDCRT_RECORD,
  (creatingIcdCrtRecord: boolean) => ({
    creatingIcdCrtRecord: creatingIcdCrtRecord
  })
)();

export const setCreateIcdCrtRecordSuccessful = createAction(
  actionNames.SET_CREATE_ICDCRT_RECORD_SUCCESSFUL,
  (createIcdCrtRecordSuccessful: boolean) => ({
    createIcdCrtRecordSuccessful: createIcdCrtRecordSuccessful
  })
)();

export const setFetchingIcdCrtRecords = createAction(
  actionNames.SET_FETCHING_ICDCRT_RECORDS,
  (fetchingIcdCrtRecords: boolean) => ({
    fetchingIcdCrtRecords: fetchingIcdCrtRecords
  })
)();

export const setIcdCrtRecords = createAction(
  actionNames.SET_ICDCRT_RECORDS,
  (icdCrtRecords: ClinicianRecord[]) => ({
    icdCrtRecords: icdCrtRecords
  })
)();

export const setFetchingIcdCrtRecordContent = createAction(
  actionNames.SET_FETCHING_ICDCRT_RECORD_CONTENT,
  (fetchingIcdCrtRecordContent: boolean) => ({
    fetchingIcdCrtRecordContent: fetchingIcdCrtRecordContent
  })
)();

export const setRecordToDelete = createAction(
  actionNames.SET_RECORD_TO_DELETE,
  (recordToDelete: ClinicianRecord | undefined) => ({
    recordToDelete: recordToDelete
  })
)();

export const setDeletingRecord = createAction(
  actionNames.SET_DELETING_RECORD,
  (deletingRecord: boolean) => ({
    deletingRecord: deletingRecord
  })
)();

export const setDeleteRecordSuccessful = createAction(
  actionNames.SET_DELETE_RECORD_SUCCESSFUL,
  (deleteRecordSuccessful: boolean) => ({
    deleteRecordSuccessful: deleteRecordSuccessful
  })
)();
