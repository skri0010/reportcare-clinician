import { AlertInfo, AlertsCount, HighRiskAlertInfo } from "rc_agents/model";
import { actionNames } from "ic-redux/actions/actionNames";
import { createAction } from "typesafe-actions";

export const setPendingAlertCount = createAction(
  actionNames.SET_PENDING_ALERT_COUNT,
  (pendingAlertCount: AlertsCount) => ({
    pendingAlertCount: pendingAlertCount
  })
)();

export const setPendingAlerts = createAction(
  actionNames.SET_PENDING_ALERTS,
  (pendingAlerts: AlertInfo[]) => ({
    pendingAlerts: pendingAlerts
  })
)();

export const setCompletedAlerts = createAction(
  actionNames.SET_COMPLETED_ALERTS,
  (completedAlerts: AlertInfo[]) => ({
    completedAlerts: completedAlerts
  })
)();

export const setAlertInfo = createAction(
  actionNames.SET_ALERT_INFO,
  (alertInfo: AlertInfo | HighRiskAlertInfo | undefined) => ({
    alertInfo: alertInfo
  })
)();

export const setFetchingPendingAlerts = createAction(
  actionNames.SET_FETCHING_PENDING_ALERTS,
  (fetchingPendingAlerts: boolean) => ({
    fetchingPendingAlerts: fetchingPendingAlerts
  })
)();

export const setFetchingCompletedAlerts = createAction(
  actionNames.SET_FETCHING_COMPLETED_ALERTS,
  (fetchingCompletedAlerts: boolean) => ({
    fetchingCompletedAlerts: fetchingCompletedAlerts
  })
)();

export const setFetchingAlerts = createAction(
  actionNames.SET_FETCHING_ALERTS,
  (fetchingAlerts: boolean) => ({
    fetchingPendingAlerts: fetchingAlerts,
    fetchingCompletedAlerts: fetchingAlerts
  })
)();

export const setUpdatingAlertIndicators = createAction(
  actionNames.SET_UPDATING_ALERT_INDICATORS,
  (indicators: { updatingAlert: boolean; alertUpdated: boolean }) => ({
    updatingAlert: indicators.updatingAlert,
    alertUpdated: indicators.alertUpdated
  })
)();

export const setFetchingAlertInfo = createAction(
  actionNames.SET_FETCHING_ALERT_INFO,
  (fetchingAlertInfo: boolean) => ({
    fetchingAlertInfo: fetchingAlertInfo
  })
)();

export const setShowAlertPopUp = createAction(
  actionNames.SET_SHOW_ALERT_POPUP,
  (showAlertPopUp: boolean) => ({
    showAlertPopUp: showAlertPopUp
  })
)();

export const setRealTimeAlert = createAction(
  actionNames.SET_REAL_TIME_ALERT,
  (realTimeAlert: AlertInfo | undefined) => ({
    realTimeAlert: realTimeAlert
  })
)();

export const setViewStableAlerts = createAction(
  actionNames.SET_VIEW_STABLE_ALERTS,
  (viewStableAlerts: boolean) => ({
    viewStableAlerts: viewStableAlerts
  })
)();
