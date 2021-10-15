import { actionNames } from "ic-redux/actions/actionNames";
import { RootAction } from "ic-redux/actions/RootAction";
import { Reducer } from "redux";
import { PatientAssignment } from "aws/API";

interface PatientAssignmentState {
  // patientAssignment
  pendingPatientAssignments: PatientAssignment[] | null;
  patientAssignmentsSynced: boolean;
  fetchingPendingPatientAssignments: boolean;
}

const initialState: PatientAssignmentState = {
  pendingPatientAssignments: null,
  patientAssignmentsSynced: false,
  fetchingPendingPatientAssignments: false
};

export const patientAssignmentReducer: Reducer<
  PatientAssignmentState,
  RootAction
> = (state = initialState, action) => {
  switch (action.type) {
    case actionNames.SET_PENDING_PATIENT_ASSIGNMENTS:
      return {
        ...state,
        pendingPatientAssignments: action.payload.pendingPatientAssignments
      };
    case actionNames.SET_PATIENT_ASSIGNMENTS_SYNCED:
      return {
        ...state,
        patientAssignmentsSynced: action.payload.patientAssignmentsSynced
      };
    case actionNames.SET_FETCHING_PENDING_PATIENT_ASSIGNMENTS:
      return {
        ...state,
        fetchingPendingPatientAssignments:
          action.payload.fetchingPendingPatientAssignments
      };
    default:
      return state;
  }
};
