import { actionNames } from "ic-redux/actions/actionNames";
import { createAction } from "typesafe-actions";
import { ClinicianInfo } from "aws/API";

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
