import { actionNames } from "../actions/actionNames";
import { RootAction } from "../actions/RootAction";
import { Reducer } from "redux";
import {
  AlertInfo,
  Patient,
  PatientDetails
} from "agents_implementation/agent_framework/model";

interface AgentsState {
  procedureSuccessful: boolean;
  procedureOngoing: boolean;
  online: boolean;
  patients: Patient[];
  patientDetails: PatientDetails;
  patientRequestsSynced: boolean;
  newAlert: AlertInfo | undefined;
}

const initialState: AgentsState = {
  procedureSuccessful: false,
  procedureOngoing: false,
  online: false,
  patients: [],
  patientDetails: {
    activityInfo: [],
    symptomsReports: [],
    vitalsReports: []
  },
  patientRequestsSynced: false,
  newAlert: undefined
};

export const agentsDataReducer: Reducer<AgentsState, RootAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionNames.SET_PROCEDURE_ONGOING:
      return { ...state, procedureOngoing: action.payload.procedureOngoing };
    case actionNames.SET_PROCEDURE_SUCCESSFUL:
      return { ...state, procedureSuccessful: action.payload.successful };
    case actionNames.SET_PATIENTS:
      return { ...state, patients: action.payload.patients };
    case actionNames.SET_PATIENT_DETAILS:
      return { ...state, patientDetails: action.payload.patientDetails };
    case actionNames.SET_PATIENT_REQUESTS_SYNCED:
      return {
        ...state,
        patientRequestsSynced: action.payload.patientRequestsSynced
      };
    case actionNames.SET_NEW_ALERT:
      return { ...state, newAlert: action.payload.newAlert };
    default:
      return state;
  }
};
