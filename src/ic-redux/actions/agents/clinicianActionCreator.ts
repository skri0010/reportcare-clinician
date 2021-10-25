import { actionNames } from "ic-redux/actions/actionNames";
import { createAction } from "typesafe-actions";
import { ClinicianInfo } from "aws/API";

export const setClinician = createAction(
  actionNames.SET_CLINICIAN,
  (clinician: ClinicianInfo | undefined) => ({
    clinician: clinician
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
  (fetchingClinicianContacts: boolean) => ({
    fetchingClinicianContacts: fetchingClinicianContacts
  })
)();

export const setFetchingSharingClinicians = createAction(
  actionNames.SET_FETCHING_SHARING_CLINICIANS,
  (fetchingSharingClinicians: boolean) => ({
    fetchingSharingClinicians: fetchingSharingClinicians
  })
)();

export const setSharingClinicians = createAction(
  actionNames.SET_SHARING_CLINICIANS,
  (sharingClinicians: ClinicianInfo[]) => ({
    sharingClinicians: sharingClinicians
  })
)();

export const setSharingPatient = createAction(
  actionNames.SET_SHARING_PATIENT,
  (sharingPatient: boolean) => ({
    sharingPatient: sharingPatient
  })
)();

export const setSharePatientSuccessful = createAction(
  actionNames.SET_SHARE_PATIENT_SUCCESSFUL,
  (sharePatientSuccessful: boolean) => ({
    sharePatientSuccessful: sharePatientSuccessful
  })
)();
