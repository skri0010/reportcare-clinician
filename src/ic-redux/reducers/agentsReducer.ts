import { actionNames } from "../actions/actionNames";
import { RootAction } from "../actions/RootAction";
import { Reducer } from "redux";
import {
  AlertInfo,
  Patient,
  PatientDetails,
  PendingAlertCount,
  LocalTodo
} from "rc_agents/model";
import { Alert, PatientAssignment } from "aws/API";

interface AgentsState {
  procedureSuccessful: boolean;
  procedureOngoing: boolean;
  online: boolean;
  patients: Patient[];
  patientDetails: PatientDetails;
  pendingPatientAssignments: PatientAssignment[] | null;
  patientAssignmentsSynced: boolean;
  fetchingPendingPatientAssignments: boolean;
  pendingAlertCount: PendingAlertCount;
  alerts: Alert[];
  alertInfo: AlertInfo | undefined;
  newTodo: LocalTodo | undefined;
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
  pendingPatientAssignments: null,
  fetchingPendingPatientAssignments: false,
  patientAssignmentsSynced: false,
  pendingAlertCount: {
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0,
    unassignedRisk: 0
  },
  alerts: [],
  alertInfo: undefined,
  newTodo: undefined
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
    case actionNames.SET_FETCHING_PENDING_PATIENT_ASSIGNMENTS:
      return {
        ...state,
        fetchingPendingPatientAssignments:
          action.payload.fetchingPendingPatientAssignments
      };
    case actionNames.SET_PENDING_PATIENT_ASSIGNMENTS:
      return {
        ...state,
        pendingPatientAssignments: action.payload.pendingPatientAssignments
      };
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
    case actionNames.SET_ALERT_INFO:
      return {
        ...state,
        alertInfo: action.payload.alertInfo
      };
    case actionNames.SET_NEW_TODO:
      return { ...state, newTodo: action.payload.newTodo };
    default:
      return state;
  }
};
