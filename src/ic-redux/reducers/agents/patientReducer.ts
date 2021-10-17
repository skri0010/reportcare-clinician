import { actionNames } from "ic-redux/actions/actionNames";
import { RootAction } from "ic-redux/actions/RootAction";
import { Reducer } from "redux";
import { AlertInfo, PatientDetails } from "rc_agents/model";
import { PatientInfo, ClinicianRecord } from "aws/API";

interface PatientState {
  // patient
  patients: PatientInfo[] | null;
  patientDetails: PatientDetails | null;
  fetchingPatients: boolean;
  fetchingPatientDetails: boolean;
  fetchingPatientAlertHistory: boolean;
  alertHistory: AlertInfo[] | undefined;
  creatingMedicalRecord: boolean;
  createMedicalRecordSuccessful: boolean;
  fetchingMedicalRecords: boolean;
  medicalRecords: ClinicianRecord[] | undefined;
  fetchingMedicalRecordContent: boolean;
  creatingIcdCrtRecord: boolean;
  createIcdCrtRecordSuccessful: boolean;
  fetchingIcdCrtRecords: boolean;
  icdCrtRecords: ClinicianRecord[] | undefined;
  fetchingIcdCrtRecordContent: boolean;
  recordToDelete: ClinicianRecord | undefined;
  deletingRecord: boolean;
  deleteRecordSuccessful: boolean;
}

const initialState: PatientState = {
  patients: null,
  patientDetails: null,
  fetchingPatients: false,
  fetchingPatientDetails: false,
  fetchingPatientAlertHistory: false,
  alertHistory: undefined,
  creatingMedicalRecord: false,
  createMedicalRecordSuccessful: false,
  fetchingMedicalRecords: false,
  medicalRecords: undefined,
  fetchingMedicalRecordContent: false,
  creatingIcdCrtRecord: false,
  createIcdCrtRecordSuccessful: false,
  fetchingIcdCrtRecords: false,
  icdCrtRecords: undefined,
  fetchingIcdCrtRecordContent: false,
  recordToDelete: undefined,
  deletingRecord: false,
  deleteRecordSuccessful: false
};

export const patientReducer: Reducer<PatientState, RootAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionNames.SET_PATIENTS:
      return { ...state, patients: action.payload.patients };
    case actionNames.SET_PATIENT_DETAILS:
      return { ...state, patientDetails: action.payload.patientDetails };
    case actionNames.SET_FETCHING_PATIENTS:
      return { ...state, fetchingPatients: action.payload.fetchingPatients };
    case actionNames.SET_FETCHING_PATIENT_DETAILS:
      return {
        ...state,
        fetchingPatientDetails: action.payload.fetchingPatientDetails
      };
    case actionNames.SET_FETCHING_PATIENT_ALERT_HISTORY:
      return {
        ...state,
        fetchingPatientAlertHistory: action.payload.fetchingPatientAlertHistory
      };
    case actionNames.SET_ALERT_HISTORY:
      return { ...state, alertHistory: action.payload.alertHistory };
    case actionNames.SET_CREATING_MEDICAL_RECORD:
      return {
        ...state,
        creatingMedicalRecord: action.payload.creatingMedicalRecord
      };
    case actionNames.SET_CREATE_MEDICAL_RECORD_SUCCESSFUL:
      return {
        ...state,
        createMedicalRecordSuccessful:
          action.payload.createMedicalRecordSuccessful
      };
    case actionNames.SET_FETCHING_MEDICAL_RECORDS:
      return {
        ...state,
        fetchingMedicalRecords: action.payload.fetchingMedicalRecords
      };
    case actionNames.SET_MEDICAL_RECORDS:
      return {
        ...state,
        medicalRecords: action.payload.medicalRecords
      };
    case actionNames.SET_FETCHING_MEDICAL_RECORD_CONTENT:
      return {
        ...state,
        fetchingMedicalRecordContent:
          action.payload.fetchingMedicalRecordContent
      };
    case actionNames.SET_CREATING_ICDCRT_RECORD:
      return {
        ...state,
        creatingIcdCrtRecord: action.payload.creatingIcdCrtRecord
      };
    case actionNames.SET_CREATE_ICDCRT_RECORD_SUCCESSFUL:
      return {
        ...state,
        createIcdCrtRecordSuccessful:
          action.payload.createIcdCrtRecordSuccessful
      };
    case actionNames.SET_FETCHING_ICDCRT_RECORDS:
      return {
        ...state,
        fetchingIcdCrtRecords: action.payload.fetchingIcdCrtRecords
      };
    case actionNames.SET_ICDCRT_RECORDS:
      return {
        ...state,
        icdCrtRecords: action.payload.icdCrtRecords
      };
    case actionNames.SET_FETCHING_ICDCRT_RECORD_CONTENT:
      return {
        ...state,
        fetchingIcdCrtRecordContent: action.payload.fetchingIcdCrtRecordContent
      };
    case actionNames.SET_RECORD_TO_DELETE:
      return {
        ...state,
        recordToDelete: action.payload.recordToDelete
      };
    case actionNames.SET_DELETING_RECORD:
      return {
        ...state,
        deletingRecord: action.payload.deletingRecord
      };
    case actionNames.SET_DELETE_RECORD_SUCCESSFUL:
      return {
        ...state,
        deleteRecordSuccessful: action.payload.deleteRecordSuccessful
      };
    default:
      return state;
  }
};
