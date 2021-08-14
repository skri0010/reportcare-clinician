import { actionNames } from "../actions/actionNames";
import { RootAction } from "../actions/RootAction";
import { Reducer } from "redux";
import {
  AlertInfo,
  PatientDetails,
  PendingAlertCount,
  LocalTodo,
  RiskFilter
} from "rc_agents/model";
import { Alert, PatientAssignment, PatientInfo } from "aws/API";
import { RiskLevel } from "models/RiskLevel";

interface AgentsState {
  procedureSuccessful: boolean;
  procedureOngoing: boolean;
  online: boolean;
  patients: PatientInfo[] | null;
  patientDetails: PatientDetails | null;
  pendingPatientAssignments: PatientAssignment[];
  patientAssignmentsSynced: boolean;
  fetchingPatients: boolean;
  fetchingPatientDetails: boolean;
  fetchingPendingPatientAssignments: boolean;
  riskFilters: RiskFilter;
  pendingAlertCount: PendingAlertCount;
  alerts: Alert[];
  alertInfo: AlertInfo | undefined;
  newTodo: LocalTodo | undefined;
}

const initialState: AgentsState = {
  procedureSuccessful: false,
  procedureOngoing: false,
  online: false,
  patients: null,
  patientDetails: null,
  pendingPatientAssignments: [],
  fetchingPatients: false,
  fetchingPatientDetails: false,
  fetchingPendingPatientAssignments: false,
  patientAssignmentsSynced: false,
  riskFilters: {
    [RiskLevel.HIGH]: false,
    [RiskLevel.MEDIUM]: false,
    [RiskLevel.LOW]: false,
    [RiskLevel.UNASSIGNED]: false
  },
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
    case actionNames.SET_FETCHING_PATIENTS:
      return { ...state, fetchingPatients: action.payload.fetchingPatients };
    case actionNames.SET_FETCHING_PATIENT_DETAILS:
      return {
        ...state,
        fetchingPatientDetails: action.payload.fetchingPatientDetails
      };
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
    case actionNames.SET_RISK_FILTERS:
      return { ...state, riskFilters: action.payload.riskFilters };
    default:
      return state;
  }
};
