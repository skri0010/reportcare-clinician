import { AlertInfo, PatientDetails } from "rc_agents/model";
import { actionNames } from "ic-redux/actions/actionNames";
import { createAction } from "typesafe-actions";
import { PatientInfo } from "aws/API";

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

export const setFetchingPatientAlertHistory = createAction(
  actionNames.SET_FETCHING_PATIENT_ALERT_HISTORY,
  (fetchingPatientAlertHistory: boolean) => ({
    fetchingPatientAlertHistory: fetchingPatientAlertHistory
  })
)();

export const setAlertHistory = createAction(
  actionNames.SET_ALERT_HISTORY,
  (alertHistory: AlertInfo[]) => ({
    alertHistory: alertHistory
  })
)();
