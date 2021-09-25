import { actionNames } from "ic-redux/actions/actionNames";
import { RootAction } from "ic-redux/actions/RootAction";
import { Reducer } from "redux";
import { RiskFilter } from "rc_agents/model";
import { RiskLevel } from "models/RiskLevel";

interface FilterState {
  // filter
  patientRiskFilters: RiskFilter;
  alertRiskFilters: RiskFilter;
  riskFilters: RiskFilter;
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
    default:
      return state;
  }
};
