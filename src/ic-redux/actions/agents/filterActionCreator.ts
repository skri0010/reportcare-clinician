import { RiskFilter as RiskFilters } from "rc_agents/model";
import { actionNames } from "ic-redux/actions/actionNames";
import { createAction } from "typesafe-actions";
import { ChartFilter } from "models/ChartViewTypes";

export const setPatientRiskFilters = createAction(
  actionNames.SET_PATIENT_RISK_FILTERS,
  (riskFilters: RiskFilters) => ({
    patientRiskFilters: riskFilters
  })
)();

export const setAlertRiskFilters = createAction(
  actionNames.SET_ALERT_RISK_FILTERS,
  (riskFilters: RiskFilters) => ({
    alertRiskFilters: riskFilters
  })
)();

export const setParametersChartFilters = createAction(
  actionNames.SET_PARAMETERS_CHART_FILTER,
  (parametersChartFilter: ChartFilter) => ({
    parametersChartFilter: parametersChartFilter
  })
)();

export const setAlertDetailsChartFilters = createAction(
  actionNames.SET_ALERT_DETAILS_CHART_FILTER,
  (alertDetailsChartFilter: ChartFilter) => ({
    alertDetailsChartFilter: alertDetailsChartFilter
  })
)();
