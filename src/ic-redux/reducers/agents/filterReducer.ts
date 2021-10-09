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
  chartFilters: ChartFilter;
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
  chartFilters: {
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
    case actionNames.SET_CHART_FILTERS:
      return { ...state, chartFilters: action.payload.chartFilters };
    default:
      return state;
  }
};
