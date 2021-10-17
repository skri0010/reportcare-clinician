import { actionNames } from "ic-redux/actions/actionNames";
import { RootAction } from "ic-redux/actions/RootAction";
import { Reducer } from "redux";
import { AlertInfo, AlertsCount, HighRiskAlertInfo } from "rc_agents/model";

interface AlertState {
  // alert
  pendingAlertCount: AlertsCount;
  pendingAlerts: AlertInfo[] | undefined;
  completedAlerts: AlertInfo[] | undefined;
  alertInfo: AlertInfo | HighRiskAlertInfo | undefined;
  fetchingPendingAlerts: boolean;
  fetchingCompletedAlerts: boolean;
  updatingAlert: boolean;
  fetchingAlertInfo: boolean;
  alertUpdated: boolean;
  showAlertPopUp: boolean;
  realTimeAlert: AlertInfo | undefined;
  viewStableAlerts: boolean;
}

const initialState: AlertState = {
  pendingAlertCount: {
    highRisk: 0,
    mediumRisk: 0,
    lowRisk: 0,
    unassignedRisk: 0
  },
  pendingAlerts: undefined,
  completedAlerts: undefined,
  alertInfo: undefined,
  fetchingPendingAlerts: false,
  fetchingCompletedAlerts: false,
  updatingAlert: false,
  fetchingAlertInfo: false,
  alertUpdated: false,
  showAlertPopUp: false,
  realTimeAlert: undefined,
  viewStableAlerts: false
};

export const alertReducer: Reducer<AlertState, RootAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionNames.SET_PENDING_ALERT_COUNT:
      return {
        ...state,
        pendingAlertCount: action.payload.pendingAlertCount
      };
    case actionNames.SET_PENDING_ALERTS:
      return {
        ...state,
        pendingAlerts: action.payload.pendingAlerts
      };
    case actionNames.SET_COMPLETED_ALERTS:
      return {
        ...state,
        completedAlerts: action.payload.completedAlerts
      };
    case actionNames.SET_ALERT_INFO:
      return {
        ...state,
        alertInfo: action.payload.alertInfo
      };
    case actionNames.SET_FETCHING_PENDING_ALERTS:
      return {
        ...state,
        fetchingPendingAlerts: action.payload.fetchingPendingAlerts
      };
    case actionNames.SET_FETCHING_COMPLETED_ALERTS:
      return {
        ...state,
        fetchingCompletedAlerts: action.payload.fetchingCompletedAlerts
      };
    case actionNames.SET_FETCHING_ALERTS:
      return {
        ...state,
        fetchingPendingAlerts: action.payload.fetchingPendingAlerts,
        fetchingCompletedAlerts: action.payload.fetchingCompletedAlerts
      };
    case actionNames.SET_UPDATING_ALERT_INDICATORS:
      return {
        ...state,
        updatingAlert: action.payload.updatingAlert,
        alertUpdated: action.payload.alertUpdated
      };
    case actionNames.SET_FETCHING_ALERT_INFO:
      return {
        ...state,
        fetchingAlertInfo: action.payload.fetchingAlertInfo
      };
    case actionNames.SET_SHOW_ALERT_POPUP:
      return {
        ...state,
        showAlertPopUp: action.payload.showAlertPopUp
      };
    case actionNames.SET_REAL_TIME_ALERT:
      return {
        ...state,
        realTimeAlert: action.payload.realTimeAlert
      };
    case actionNames.SET_VIEW_STABLE_ALERTS:
      return {
        ...state,
        viewStableAlerts: action.payload.viewStableAlerts
      };
    default:
      return state;
  }
};
