import {
  AlertInfo,
  Patient,
  PatientDetails,
  PendingAlertCount
} from "agents_implementation/agent_framework/model";
import { actionNames } from "ic-redux/actions/actionNames";
import { createAction } from "typesafe-actions";

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
  (alerts: AlertInfo[]) => ({
    alerts: alerts
  })
)();
