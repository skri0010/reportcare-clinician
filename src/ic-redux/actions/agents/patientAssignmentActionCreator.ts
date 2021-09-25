import { actionNames } from "ic-redux/actions/actionNames";
import { createAction } from "typesafe-actions";
import { PatientAssignment } from "aws/API";

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

export const setFetchingPendingPatientAssignments = createAction(
  actionNames.SET_FETCHING_PENDING_PATIENT_ASSIGNMENTS,
  (fetchingPendingPatientAssignments: boolean) => ({
    fetchingPendingPatientAssignments: fetchingPendingPatientAssignments
  })
)();
