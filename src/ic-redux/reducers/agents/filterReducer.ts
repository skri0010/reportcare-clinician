import { actionNames } from "ic-redux/actions/actionNames";
import { RootAction } from "ic-redux/actions/RootAction";
import { Reducer } from "redux";
import { RiskFilter } from "rc_agents/model";
import { RiskLevel } from "models/RiskLevel";
import { ChartFilter, ChartViewTypes } from "models/ChartViewTypes";

export interface FilterState {
  // filter
  patientRiskFilters: RiskFilter;
  alertRiskFilters: RiskFilter;
  riskFilters: RiskFilter;
  parametersChartFilter: ChartFilter;
  alertDetailsChartFilter: ChartFilter;
}

const initialState: FilterState = {
  patientRiskFilters: {
    [RiskLevel.HIGH]: false,
    [RiskLevel.MEDIUM]: false,
    [RiskLevel.LOW]: false,
    [RiskLevel.UNASSIGNED]: false
  },
  alertRiskFilters: {
    [RiskLevel.HIGH]: false,
    [RiskLevel.MEDIUM]: false,
    [RiskLevel.LOW]: false,
    [RiskLevel.UNASSIGNED]: false
  },
  riskFilters: {
    [RiskLevel.HIGH]: false,
    [RiskLevel.MEDIUM]: false,
    [RiskLevel.LOW]: false,
    [RiskLevel.UNASSIGNED]: false
  },
  parametersChartFilter: {
    [ChartViewTypes.ALL]: true,
    [ChartViewTypes.MIN]: false,
    [ChartViewTypes.MAX]: false,
    [ChartViewTypes.AVERAGE]: false
  },
  alertDetailsChartFilter: {
    [ChartViewTypes.ALL]: true,
    [ChartViewTypes.MIN]: false,
    [ChartViewTypes.MAX]: false,
    [ChartViewTypes.AVERAGE]: false
  }
};

export const filterReducer: Reducer<FilterState, RootAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionNames.SET_PATIENT_RISK_FILTERS:
      return {
        ...state,
        patientRiskFilters: action.payload.patientRiskFilters
      };
    case actionNames.SET_ALERT_RISK_FILTERS:
      return { ...state, alertRiskFilters: action.payload.alertRiskFilters };
    case actionNames.SET_PARAMETERS_CHART_FILTER:
      return {
        ...state,
        parametersChartFilter: action.payload.parametersChartFilter
      };
    case actionNames.SET_ALERT_DETAILS_CHART_FILTER:
      return {
        ...state,
        alertDetailsChartFilter: action.payload.alertDetailsChartFilter
      };
    default:
      return state;
  }
};
