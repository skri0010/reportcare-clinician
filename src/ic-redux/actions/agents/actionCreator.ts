import {
  AlertInfo,
  Patient,
  PatientDetails,
  Todo
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

export const setPatientRequestsSynced = createAction(
  actionNames.SET_PATIENT_REQUESTS_SYNCED,
  (patientRequestsSynced: boolean) => ({
    patientRequestsSynced: patientRequestsSynced
  })
)();

export const setNewAlert = createAction(
  actionNames.SET_NEW_ALERT,
  (newAlert: AlertInfo) => ({
    newAlert: newAlert
  })
)();

export const setNewTodo = createAction(
  actionNames.SET_NEW_TODO,
  (newTodo: Todo) => ({
    newTodo: newTodo
  })
)();
