import {
  AlertInfo,
  PatientDetails,
  AlertsCount,
  LocalTodo,
  RiskFilter as RiskFilters
} from "rc_agents/model";
import { actionNames } from "ic-redux/actions/actionNames";
import { createAction } from "typesafe-actions";
import { ChartFilter } from "models/ChartViewTypes";
import { PatientAssignment, PatientInfo, ClinicianInfo } from "aws/API";

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

export const setFetchingPendingPatientAssignments = createAction(
  actionNames.SET_FETCHING_PENDING_PATIENT_ASSIGNMENTS,
  (fetchingPendingPatientAssignments: boolean) => ({
    fetchingPendingPatientAssignments: fetchingPendingPatientAssignments
  })
)();

export const setClinicianContacts = createAction(
  actionNames.SET_CLINICIAN_CONTACTS,
  (clinicianContacts: ClinicianInfo[]) => ({
    clinicianContacts: clinicianContacts
  })
)();

export const setClinicianSelected = createAction(
  actionNames.SET_CLINICIAN_SELECTED,
  (clinicianSelected: ClinicianInfo) => ({
    clinicianSelected: clinicianSelected
  })
)();

export const setFetchingClinicianContacts = createAction(
  actionNames.SET_FETCHING_CLINICIAN_CONTACTS,
  (fetchingClinianContacts: boolean) => ({
    fetchingClinianContacts: fetchingClinianContacts
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

export const setConfiguringPatient = createAction(
  actionNames.SET_CONFIGURING_PATIENT,
  (configuringPatient: boolean) => ({
    configuringPatient: configuringPatient
  })
)();

export const setConfigurationSuccessful = createAction(
  actionNames.SET_CONFIGURATION_SUCCESSFUL,
  (configurationSuccessful: boolean) => ({
    configurationSuccessful: configurationSuccessful
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

export const setFetchingIcdCrtRecordContent = createAction(
  actionNames.SET_FETCHING_ICDCRT_RECORD_CONTENT,
  (fetchingIcdCrtRecordContent: boolean) => ({
    fetchingIcdCrtRecordContent: fetchingIcdCrtRecordContent
  })
)();

export const setPendingAlertCount = createAction(
  actionNames.SET_PENDING_ALERT_COUNT,
  (pendingAlertCount: AlertsCount) => ({
    pendingAlertCount: pendingAlertCount
  })
)();

export const setFetchingAlerts = createAction(
  actionNames.SET_FETCHING_ALERTS,
  (fetchingAlerts: boolean) => ({
    fetchingPendingAlerts: fetchingAlerts,
    fetchingCompletedAlerts: fetchingAlerts
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

export const setUpdatingAlertIndicators = createAction(
  actionNames.SET_UPDATING_ALERT_INDICATORS,
  (indicators: { updatingAlert: boolean; alertUpdated: boolean }) => ({
    updatingAlert: indicators.updatingAlert,
    alertUpdated: indicators.alertUpdated
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

export const setViewStableAlerts = createAction(
  actionNames.SET_VIEW_STABLE_ALERTS,
  (viewStableAlerts: boolean) => ({
    viewStableAlerts: viewStableAlerts
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
  (alertInfo: AlertInfo | undefined) => ({
    alertInfo: alertInfo
  })
)();

export const setShowAlertPopUp = createAction(
  actionNames.SET_SHOW_ALERT_POPUP,
  (showAlertPopUp: boolean) => ({
    showAlertPopUp: showAlertPopUp
  })
)();

export const setRealTimeAlert = createAction(
  actionNames.SET_REAL_TIME_ALERT,
  (realTimeAlert: AlertInfo | undefined) => ({
    realTimeAlert: realTimeAlert
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

export const setFetchingTodoDetails = createAction(
  actionNames.SET_FETCHING_TODO_DETAILS,
  (fetchingTodoDetails: boolean) => ({
    fetchingTodoDetails: fetchingTodoDetails
  })
)();

export const setTodoDetails = createAction(
  actionNames.SET_TODO_DETAILS,
  (todoDetails: LocalTodo) => ({
    todoDetails: todoDetails
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

export const setChartFilters = createAction(
  actionNames.SET_CHART_FILTERS,
  (chartFilters: ChartFilter) => ({
    chartFilters: chartFilters
  })
)();
