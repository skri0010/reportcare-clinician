import {
  AlertInfo,
  Patient,
  PatientDetails
} from "agents_implementation/agent_framework/model";
import { actionNames } from "ic-redux/actions/actionNames";
import { createAction } from "typesafe-actions";
import { PatientAssignment } from "aws/API";

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

export const setFetchNewPatientAssignments = createAction(
  actionNames.SET_FETCH_NEW_PATIENT_ASSIGNMENTS,
  (fetchNewPatientAssignments: boolean) => ({
    fetchNewPatientAssignments: fetchNewPatientAssignments
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

export const setNewHighRiskAlerts = createAction(
  actionNames.SET_NEW_HIGH_RISK_ALERTS,
  (newHighRiskAlerts: AlertInfo[]) => ({
    newHighRiskAlerts: newHighRiskAlerts
  })
)();

export const setNewMediumRiskAlerts = createAction(
  actionNames.SET_NEW_MEDIUM_RISK_ALERTS,
  (newMediumRiskAlerts: AlertInfo[]) => ({
    newMediumRiskAlerts: newMediumRiskAlerts
  })
)();

export const setNewLowRiskAlerts = createAction(
  actionNames.SET_NEW_LOW_RISK_ALERTS,
  (newLowRiskAlerts: AlertInfo[]) => ({
    newLowRiskAlerts: newLowRiskAlerts
  })
)();

export const setNewUnassignedRiskAlerts = createAction(
  actionNames.SET_NEW_UNASSIGNED_RISK_ALERTS,
  (newUnassignedRiskAlerts: AlertInfo[]) => ({
    newUnassignedRiskAlerts: newUnassignedRiskAlerts
  })
)();
