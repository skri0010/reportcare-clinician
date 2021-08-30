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
import { Alert, ClinicianInfo, PatientAssignment, PatientInfo } from "aws/API";
import { RiskLevel } from "models/RiskLevel";

interface AgentsState {
  procedureSuccessful: boolean;
  procedureOngoing: boolean;
  online: boolean;
  patients: PatientInfo[] | null;
  patientDetails: PatientDetails | null;
  pendingPatientAssignments: PatientAssignment[] | null;
  clinicianContacts: ClinicianInfo[] | null;
  clinicianSelected: ClinicianInfo | null;
  patientAssignmentsSynced: boolean;
  fetchingPatients: boolean;
  fetchingPatientDetails: boolean;
  fetchingPendingPatientAssignments: boolean;
  fetchingClinianContacts: boolean;
  configuringPatient: boolean;
  configurationSuccessful: boolean;
  riskFilters: RiskFilter;
  pendingAlertCount: PendingAlertCount;
  alerts: Alert[];
  alertInfo: AlertInfo | undefined;
  todoDetails: LocalTodo | null;
  pendingTodos: LocalTodo[] | null;
  completedTodos: LocalTodo[] | null;
  fetchingTodos: boolean;
  fetchingTodoDetails: boolean;
  submittingTodo: boolean;
  updatedTodo: LocalTodo | undefined;
}

const initialState: AgentsState = {
  procedureSuccessful: false,
  procedureOngoing: false,
  online: false,
  patients: null,
  patientDetails: null,
  pendingPatientAssignments: null,
  clinicianContacts: null,
  clinicianSelected: null,
  fetchingPatients: false,
  fetchingPatientDetails: false,
  fetchingPendingPatientAssignments: false,
  fetchingClinianContacts: false,
  patientAssignmentsSynced: false,
  configuringPatient: false,
  configurationSuccessful: false,
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
  todoDetails: null,
  pendingTodos: null,
  completedTodos: null,
  fetchingTodos: false,
  fetchingTodoDetails: false,
  submittingTodo: false,
  updatedTodo: undefined
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

    case actionNames.SET_CLINICIAN_CONTACTS:
      return {
        ...state,
        clinicianContacts: action.payload.clinicianContacts
      };
    case actionNames.SET_CLINICIAN_SELECTED:
      return {
        ...state,
        clinicianSelected: action.payload.clinicianSelected
      };
    case actionNames.SET_FETCHING_CLINICIAN_CONTACTS:
      return {
        ...state,
        fetchingClinianContacts: action.payload.fetchingClinianContacts
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
    case actionNames.SET_CONFIGURING_PATIENT:
      return {
        ...state,
        configuringPatient: action.payload.configuringPatient
      };
    case actionNames.SET_CONFIGURATION_SUCCESSFUL:
      return {
        ...state,
        configurationSuccessful: action.payload.configurationSuccessful
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
    case actionNames.SET_RISK_FILTERS:
      return { ...state, riskFilters: action.payload.riskFilters };
    case actionNames.SET_FETCHING_TODOS:
      return {
        ...state,
        fetchingTodos: action.payload.fetchingTodos
      };
    case actionNames.SET_PENDING_TODOS:
      return { ...state, pendingTodos: action.payload.pendingTodos };
    case actionNames.SET_COMPLETED_TODOS:
      return { ...state, completedTodos: action.payload.completedTodos };
    case actionNames.SET_SUBMITTING_TODO:
      return { ...state, submittingTodo: action.payload.submittingTodo };
    case actionNames.SET_UPDATED_TODO:
      return { ...state, updatedTodo: action.payload.updatedTodo };
    default:
      return state;
  }
};
