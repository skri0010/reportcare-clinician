import {
  AlertInfo,
  PatientDetails,
  PendingAlertCount,
  LocalTodo,
  RiskFilter as RiskFilters
} from "rc_agents/model";
import { actionNames } from "ic-redux/actions/actionNames";
import { createAction } from "typesafe-actions";
import { PatientAssignment, PatientInfo } from "aws/API";

export const setProcedureOngoing = createAction(
  actionNames.SET_PROCEDURE_ONGOING,
  (procedureOngoing: boolean) => ({
    procedureOngoing: procedureOngoing
  })
)();

export const setProcedureSuccessful = createAction(
  actionNames.SET_PROCEDURE_SUCCESSFUL,
  (successful: boolean) => ({
    successful: successful
  })
)();

export const setPatients = createAction(
  actionNames.SET_PATIENTS,
  (patients: PatientInfo[]) => ({
    patients: patients
  })
)();

export const setAlertHistory = createAction(
  actionNames.SET_ALERT_HISTORY,
  (alertHistory: AlertInfo[]) => ({
    alertHistory: alertHistory
  })
)();

export const setPatientDetails = createAction(
  actionNames.SET_PATIENT_DETAILS,
  (patientDetails: PatientDetails) => ({
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

export const setFetchingPendingPatientAssignments = createAction(
  actionNames.SET_FETCHING_PENDING_PATIENT_ASSIGNMENTS,
  (fetchingPendingPatientAssignments: boolean) => ({
    fetchingPendingPatientAssignments: fetchingPendingPatientAssignments
  })
)();

export const setPendingPatientAssignments = createAction(
  actionNames.SET_PENDING_PATIENT_ASSIGNMENTS,
  (pendingPatientAssignments: PatientAssignment[]) => ({
    pendingPatientAssignments: pendingPatientAssignments
  })
)();

export const setPatientAssignmentsSynced = createAction(
  actionNames.SET_PATIENT_ASSIGNMENTS_SYNCED,
  (patientAssignmentsSynced: boolean) => ({
    patientAssignmentsSynced: patientAssignmentsSynced
  })
)();

export const setPendingAlertCount = createAction(
  actionNames.SET_PENDING_ALERT_COUNT,
  (pendingAlertCount: PendingAlertCount) => ({
    pendingAlertCount: pendingAlertCount
  })
)();

export const setFetchingAlerts = createAction(
  actionNames.SET_FETCHING_ALERTS,
  (fetchingAlerts: boolean) => ({
    fetchingAlerts: fetchingAlerts
  })
)();

export const setFetchingPendingAlerts = createAction(
  actionNames.SET_FETCHING_PENDING_ALERTS,
  (fetchingPendingAlerts: boolean) => ({
    fetchingPendingAlerts: fetchingPendingAlerts
  })
)();

export const setFetchingCompletedAlerts = createAction(
  actionNames.SET_FETCHING_COMPLETED_ALERTS,
  (fetchingCompletedAlerts: boolean) => ({
    fetchingCompletedAlerts: fetchingCompletedAlerts
  })
)();

export const setPendingAlerts = createAction(
  actionNames.SET_PENDING_ALERTS,
  (pendingAlerts: AlertInfo[]) => ({
    pendingAlerts: pendingAlerts
  })
)();

export const setCompletedAlerts = createAction(
  actionNames.SET_COMPLETED_ALERTS,
  (completedAlerts: AlertInfo[]) => ({
    completedAlerts: completedAlerts
  })
)();

export const setAlerts = createAction(
  actionNames.SET_ALERTS,
  (alerts: AlertInfo[]) => ({
    alerts: alerts
  })
)();

export const setFetchingAlertInfo = createAction(
  actionNames.SET_FETCHING_ALERT_INFO,
  (fetchingAlertInfo: boolean) => ({
    fetchingAlertInfo: fetchingAlertInfo
  })
)();

export const setAlertInfo = createAction(
  actionNames.SET_ALERT_INFO,
  (alertInfo: AlertInfo) => ({
    alertInfo: alertInfo
  })
)();

export const setFetchingTodos = createAction(
  actionNames.SET_FETCHING_TODOS,
  (fetchingTodos: boolean) => ({
    fetchingTodos: fetchingTodos
  })
)();

export const setPendingTodos = createAction(
  actionNames.SET_PENDING_TODOS,
  (pendingTodos: LocalTodo[]) => ({
    pendingTodos: pendingTodos
  })
)();

export const setCompletedTodos = createAction(
  actionNames.SET_COMPLETED_TODOS,
  (completedTodos: LocalTodo[]) => ({
    completedTodos: completedTodos
  })
)();

export const setSubmittingTodo = createAction(
  actionNames.SET_SUBMITTING_TODO,
  (submittingTodo: boolean) => ({
    submittingTodo: submittingTodo
  })
)();

export const setUpdatedTodo = createAction(
  actionNames.SET_UPDATED_TODO,
  (updatedTodo: LocalTodo | undefined) => ({
    updatedTodo: updatedTodo
  })
)();

export const setPatientRiskFilters = createAction(
  actionNames.SET_PATIENT_RISK_FILTERS,
  (riskFilters: RiskFilters) => ({
    patientRiskFilters: riskFilters
  })
)();

export const setAlertRiskFilters = createAction(
  actionNames.SET_ALERT_RISK_FILTERS,
  (riskFilters: RiskFilters) => ({
    alertRiskFilters: riskFilters
  })
)();
