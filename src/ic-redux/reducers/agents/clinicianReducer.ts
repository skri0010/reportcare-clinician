import { actionNames } from "ic-redux/actions/actionNames";
import { RootAction } from "ic-redux/actions/RootAction";
import { Reducer } from "redux";
import { ClinicianInfo } from "aws/API";

interface ClinicianState {
  // clinician
  clinician: ClinicianInfo | undefined;
  clinicianContacts: ClinicianInfo[] | null;
  clinicianSelected: ClinicianInfo | null;
  fetchingClinicianContacts: boolean;
  fetchingSharingClinicians: boolean;
  sharingClinicians: ClinicianInfo[] | null;
  sharingPatient: boolean;
  sharePatientSuccessful: boolean;
}

const initialState: ClinicianState = {
  clinician: undefined,
  clinicianContacts: null,
  clinicianSelected: null,
  fetchingClinicianContacts: false,
  fetchingSharingClinicians: false,
  sharingClinicians: null,
  sharingPatient: false,
  sharePatientSuccessful: false
};

export const clinicianReducer: Reducer<ClinicianState, RootAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionNames.SET_CLINICIAN:
      return {
        ...state,
        clinician: action.payload.clinician
      };

    case actionNames.SET_CLINICIAN_CONTACTS:
      return {
        ...state,
        clinicianContacts: action.payload.clinicianContacts
      };

    case actionNames.SET_CLINICIAN_SELECTED:
      return {
        ...state,
        clinicianSelected: action.payload.clinicianSelected
      };

    case actionNames.SET_FETCHING_CLINICIAN_CONTACTS:
      return {
        ...state,
        fetchingClinicianContacts: action.payload.fetchingClinicianContacts
      };
    case actionNames.SET_FETCHING_SHARING_CLINICIANS:
      return {
        ...state,
        fetchingSharingClinicians: action.payload.fetchingSharingClinicians
      };
    case actionNames.SET_SHARING_CLINICIANS:
      return {
        ...state,
        sharingClinicians: action.payload.sharingClinicians
      };
    case actionNames.SET_SHARING_PATIENT:
      return {
        ...state,
        sharingPatient: action.payload.sharingPatient
      };
    case actionNames.SET_SHARE_PATIENT_SUCCESSFUL:
      return {
        ...state,
        sharePatientSuccessful: action.payload.sharePatientSuccessful
      };
    default:
      return state;
  }
};
