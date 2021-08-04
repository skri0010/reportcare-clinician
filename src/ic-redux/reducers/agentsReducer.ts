import { actionNames } from "../actions/actionNames";
import { RootAction } from "../actions/RootAction";
import { Reducer } from "redux";
import {
  AlertInfo,
  Patient,
  PatientDetails
} from "agents_implementation/agent_framework/model";

interface AgentsState {
  procedureSuccessful: boolean;
  procedureOngoing: boolean;
  online: boolean;
  patients: Patient[];
  patientDetails: PatientDetails;

  patientAssignmentsSynced: boolean;
  newHighRiskAlerts: AlertInfo[];
  newMediumRiskAlerts: AlertInfo[];
  newLowRiskAlerts: AlertInfo[];
  newUnassignedRiskAlerts: AlertInfo[];
}

const initialState: AgentsState = {
  procedureSuccessful: false,
  procedureOngoing: false,
  online: false,
  patients: [],
  patientDetails: {
    activityInfo: [],
    symptomsReports: [],
    vitalsReports: []
  },
  patientAssignmentsSynced: false,
  newHighRiskAlerts: [],
  newMediumRiskAlerts: [],
  newLowRiskAlerts: [],
  newUnassignedRiskAlerts: []
};

export const agentsDataReducer: Reducer<AgentsState, RootAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionNames.SET_PROCEDURE_ONGOING:
      return { ...state, procedureOngoing: action.payload.procedureOngoing };
    case actionNames.SET_PROCEDURE_SUCCESSFUL:
      return { ...state, procedureSuccessful: action.payload.successful };
    case actionNames.SET_PATIENTS:
      return { ...state, patients: action.payload.patients };
    case actionNames.SET_PATIENT_DETAILS:
      return { ...state, patientDetails: action.payload.patientDetails };
    case actionNames.SET_PATIENT_ASSIGNMENTS_SYNCED:
      return {
        ...state,
        patientAssignmentsSynced: action.payload.patientAssignmentsSynced
      };
    case actionNames.SET_NEW_HIGH_RISK_ALERTS:
      return { ...state, newHighRiskAlerts: action.payload.newHighRiskAlerts };
    case actionNames.SET_NEW_MEDIUM_RISK_ALERTS:
      return {
        ...state,
        newMediumRiskAlerts: action.payload.newMediumRiskAlerts
      };
    case actionNames.SET_NEW_LOW_RISK_ALERTS:
      return { ...state, newLowRiskAlerts: action.payload.newLowRiskAlerts };
    case actionNames.SET_NEW_UNASSIGNED_RISK_ALERTS:
      return {
        ...state,
        newUnassignedRiskAlerts: action.payload.newUnassignedRiskAlerts
      };
    default:
      return state;
  }
};
