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

export const setChartFilters = createAction(
  actionNames.SET_CHART_FILTERS,
  (chartFilters: ChartFilter) => ({
    chartFilters: chartFilters
  })
)();
