import { actionNames } from "../actions/actionNames";
import { RootAction } from "../actions/RootAction";
import { Reducer } from "redux";
import {
  AlertInfo,
  PatientDetails,
  AlertsCount,
  LocalTodo,
  RiskFilter
} from "rc_agents/model";
import {
  ClinicianInfo,
  IcdCrtRecord,
  MedicalRecord,
  PatientAssignment,
  PatientInfo
} from "aws/API";
import { RiskLevel } from "models/RiskLevel";
import { ChartFilter, ChartViewTypes } from "models/ChartViewTypes";

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
  fetchingPatientAlertHistory: boolean;
  fetchingPendingPatientAssignments: boolean;
  patientRiskFilters: RiskFilter;
  alertRiskFilters: RiskFilter;
  fetchingClinianContacts: boolean;
  configuringPatient: boolean;
  configurationSuccessful: boolean;
  riskFilters: RiskFilter;
  chartFilters: ChartFilter;
  pendingAlertCount: AlertsCount;
  fetchingPendingAlerts: boolean;
  fetchingCompletedAlerts: boolean;
  updatingAlert: boolean;
  alertUpdated: boolean;
  pendingAlerts: AlertInfo[] | undefined;
  completedAlerts: AlertInfo[] | undefined;
  fetchingAlertInfo: boolean;
  alertInfo: AlertInfo | undefined;
  pendingTodos: LocalTodo[] | null;
  completedTodos: LocalTodo[] | null;
  alertHistory: AlertInfo[] | undefined;
  fetchingTodos: boolean;
  fetchingTodoDetails: boolean;
  submittingTodo: boolean;
  updatedTodo: LocalTodo | undefined;
  todoDetails: LocalTodo | undefined;
  creatingMedicalRecord: boolean;
  createMedicalRecordSuccessful: boolean;
  fetchingMedicalRecords: boolean;
  medicalRecords: MedicalRecord[] | undefined;
  fetchingMedicalRecordContent: boolean;
  medicalRecordContent: string | undefined;
  creatingIcdCrtRecord: boolean;
  createIcdCrtRecordSuccessful: boolean;
  fetchingIcdCrtRecords: boolean;
  icdCrtRecords: IcdCrtRecord[] | undefined;
  fetchingIcdCrtRecordContent: boolean;
  icdCrtRecordContent: string | undefined;
  showAlertPopUp: boolean;
  realTimeAlert: AlertInfo | undefined;
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
  fetchingPatientAlertHistory: false,
  fetchingPendingPatientAssignments: false,
  fetchingClinianContacts: false,
  patientAssignmentsSynced: false,
  patientRiskFilters: {
    [RiskLevel.HIGH]: false,
    [RiskLevel.MEDIUM]: false,
    [RiskLevel.LOW]: false,
    [RiskLevel.UNASSIGNED]: false
  },
  alertRiskFilters: {
    [RiskLevel.HIGH]: false,
    [RiskLevel.MEDIUM]: false,
    [RiskLevel.LOW]: false,
    [RiskLevel.UNASSIGNED]: false
  },
  configuringPatient: false,
  configurationSuccessful: false,
  riskFilters: {
    [RiskLevel.HIGH]: false,
    [RiskLevel.MEDIUM]: false,
    [RiskLevel.LOW]: false,
    [RiskLevel.UNASSIGNED]: false
  },
  chartFilters: {
    [ChartViewTypes.ALL]: true,
    [ChartViewTypes.MIN]: false,
    [ChartViewTypes.MAX]: false,
    [ChartViewTypes.AVERAGE]: false
  },
  pendingAlertCount: {
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0,
    unassignedRisk: 0
  },
  fetchingPendingAlerts: false,
  fetchingCompletedAlerts: false,
  updatingAlert: false,
  alertUpdated: false,
  pendingAlerts: undefined,
  completedAlerts: undefined,
  fetchingAlertInfo: false,
  alertInfo: undefined,
  todoDetails: undefined,
  pendingTodos: null,
  completedTodos: null,
  alertHistory: undefined,
  fetchingTodos: false,
  fetchingTodoDetails: false,
  submittingTodo: false,
  updatedTodo: undefined,
  creatingMedicalRecord: false,
  createMedicalRecordSuccessful: false,
  fetchingMedicalRecords: false,
  medicalRecords: undefined,
  fetchingMedicalRecordContent: false,
  medicalRecordContent: undefined,
  creatingIcdCrtRecord: false,
  createIcdCrtRecordSuccessful: false,
  fetchingIcdCrtRecords: false,
  icdCrtRecords: undefined,
  fetchingIcdCrtRecordContent: false,
  icdCrtRecordContent: undefined,
  showAlertPopUp: false,
  realTimeAlert: undefined
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
    case actionNames.SET_FETCHING_PATIENT_ALERT_HISTORY:
      return {
        ...state,
        fetchingPatientAlertHistory: action.payload.fetchingPatientAlertHistory
      };
    case actionNames.SET_ALERT_HISTORY:
      return { ...state, alertHistory: action.payload.alertHistory };
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
    case actionNames.SET_MEDICAL_RECORD_CONTENT:
      return {
        ...state,
        medicalRecordContent: action.payload.medicalRecordContent
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
    case actionNames.SET_ICDCRT_RECORD_CONTENT:
      return {
        ...state,
        icdCrtRecordContent: action.payload.icdCrtRecordContent
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
    case actionNames.SET_FETCHING_PENDING_ALERTS:
      return {
        ...state,
        fetchingPendingAlerts: action.payload.fetchingPendingAlerts
      };
    case actionNames.SET_FETCHING_COMPLETED_ALERTS:
      return {
        ...state,
        fetchingCompletedAlerts: action.payload.fetchingCompletedAlerts
      };
    case actionNames.SET_UPDATING_ALERT_INDICATORS:
      return {
        ...state,
        updatingAlert: action.payload.updatingAlert,
        alertUpdated: action.payload.alertUpdated
      };
    case actionNames.SET_FETCHING_ALERTS:
      return {
        ...state,
        fetchingPendingAlerts: action.payload.fetchingPendingAlerts,
        fetchingCompletedAlerts: action.payload.fetchingCompletedAlerts
      };
    case actionNames.SET_PENDING_ALERTS:
      return {
        ...state,
        pendingAlerts: action.payload.pendingAlerts
      };
    case actionNames.SET_COMPLETED_ALERTS:
      return {
        ...state,
        completedAlerts: action.payload.completedAlerts
      };
    case actionNames.SET_FETCHING_ALERT_INFO:
      return {
        ...state,
        fetchingAlertInfo: action.payload.fetchingAlertInfo
      };
    case actionNames.SET_ALERT_INFO:
      return {
        ...state,
        alertInfo: action.payload.alertInfo
      };
    case actionNames.SET_SHOW_ALERT_POPUP:
      return {
        ...state,
        showAlertPopUp: action.payload.showAlertPopUp
      };
    case actionNames.SET_REAL_TIME_ALERT:
      return {
        ...state,
        realTimeAlert: action.payload.realTimeAlert
      };
    case actionNames.SET_CHART_FILTERS:
      return { ...state, chartFilters: action.payload.chartFilters };
    case actionNames.SET_PATIENT_RISK_FILTERS:
      return {
        ...state,
        patientRiskFilters: action.payload.patientRiskFilters
      };
    case actionNames.SET_ALERT_RISK_FILTERS:
      return { ...state, alertRiskFilters: action.payload.alertRiskFilters };
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
    case actionNames.SET_TODO_DETAILS:
      return { ...state, todoDetails: action.payload.todoDetails };
    default:
      return state;
  }
};
