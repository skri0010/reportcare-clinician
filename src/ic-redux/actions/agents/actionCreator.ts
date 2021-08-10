import {
  AlertInfo,
  Patient,
  PatientDetails,
  PendingAlertCount,
  LocalTodo
} from "rc_agents/model";
import { actionNames } from "ic-redux/actions/actionNames";
import { createAction } from "typesafe-actions";
import { Alert, PatientAssignment } from "aws/API";

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
  (patients: Patient[]) => ({
    patients: patients
  })
)();

export const setPatientDetails = createAction(
  actionNames.SET_PATIENT_DETAILS,
  (patientDetails: PatientDetails) => ({
    patientDetails: patientDetails
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

export const setNewTodo = createAction(
  actionNames.SET_NEW_TODO,
  (newTodo: LocalTodo) => ({
    newTodo: newTodo
  })
)();
