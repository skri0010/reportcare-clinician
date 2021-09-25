import { actionNames } from "ic-redux/actions/actionNames";
import { RootAction } from "ic-redux/actions/RootAction";
import { Reducer } from "redux";
import { AlertInfo, PatientDetails } from "rc_agents/model";
import { PatientInfo } from "aws/API";

interface PatientState {
  // patient
  patients: PatientInfo[] | null;
  patientDetails: PatientDetails | null;
  fetchingPatients: boolean;
  fetchingPatientDetails: boolean;
  fetchingPatientAlertHistory: boolean;
  alertHistory: AlertInfo[] | undefined;
}

const initialState: PatientState = {
  patients: null,
  patientDetails: null,
  fetchingPatients: false,
  fetchingPatientDetails: false,
  fetchingPatientAlertHistory: false,
  alertHistory: undefined
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
    default:
      return state;
  }
};
