import { actionNames } from "../actions/actionNames";
import { RootAction } from "../actions/RootAction";
import { Reducer } from "redux";
import {
  AlertInfo,
  Patient,
  PatientDetails,
  PendingAlertCount
} from "agents_implementation/agent_framework/model";

interface AgentsState {
  procedureSuccessful: boolean;
  procedureOngoing: boolean;
  online: boolean;
  patients: Patient[];
  patientDetails: PatientDetails;
  patientAssignmentsSynced: boolean;
  pendingAlertCount: PendingAlertCount;
  alerts: AlertInfo[];
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
  patientAssignmentsSynced: false,
  pendingAlertCount: {
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0,
    unassignedRisk: 0
  },
  alerts: []
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
    case actionNames.SET_PATIENT_ASSIGNMENTS_SYNCED:
      return {
        ...state,
        patientAssignmentsSynced: action.payload.patientAssignmentsSynced
      };
    case actionNames.SET_PENDING_ALERT_COUNT:
      return {
        ...state,
        pendingAlertCount: action.payload.pendingAlertCount
      };
    case actionNames.SET_ALERTS:
      return {
        ...state,
        alerts: action.payload.alerts
      };
    default:
      return state;
  }
};
