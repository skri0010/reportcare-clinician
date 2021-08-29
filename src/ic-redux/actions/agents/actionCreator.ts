import {
  AlertInfo,
  PatientDetails,
  PendingAlertCount,
  LocalTodo,
  RiskFilter as RiskFilters
} from "rc_agents/model";
import { actionNames } from "ic-redux/actions/actionNames";
import { createAction } from "typesafe-actions";
import { Alert, PatientAssignment, PatientInfo, ClinicianInfo } from "aws/API";

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

export const setPendingAlertCount = createAction(
  actionNames.SET_PENDING_ALERT_COUNT,
  (pendingAlertCount: PendingAlertCount) => ({
    pendingAlertCount: pendingAlertCount
  })
)();

export const setAlerts = createAction(
  actionNames.SET_ALERTS,
  (alerts: Alert[]) => ({
    alerts: alerts
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

export const setRiskFilters = createAction(
  actionNames.SET_RISK_FILTERS,
  (riskFilters: RiskFilters) => ({
    riskFilters: riskFilters
  })
)();
