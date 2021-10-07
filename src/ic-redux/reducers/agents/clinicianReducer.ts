import { actionNames } from "ic-redux/actions/actionNames";
import { RootAction } from "ic-redux/actions/RootAction";
import { Reducer } from "redux";
import { ClinicianInfo } from "aws/API";

interface ClinicianState {
  // clinician
  clinicianContacts: ClinicianInfo[] | null;
  clinicianSelected: ClinicianInfo | null;
  fetchingClinianContacts: boolean;
}

const initialState: ClinicianState = {
  clinicianContacts: null,
  clinicianSelected: null,
  fetchingClinianContacts: false
};

export const clinicianReducer: Reducer<ClinicianState, RootAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
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
        fetchingClinianContacts: action.payload.fetchingClinianContacts
      };
    default:
      return state;
  }
};
