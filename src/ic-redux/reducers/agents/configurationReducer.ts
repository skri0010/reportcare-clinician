import { actionNames } from "ic-redux/actions/actionNames";
import { RootAction } from "ic-redux/actions/RootAction";
import { Reducer } from "redux";

interface ConfigurationState {
  // configuration
  configuringPatient: boolean;
  configurationSuccessful: boolean;
}

const initialState: ConfigurationState = {
  configuringPatient: false,
  configurationSuccessful: false
};

export const configurationReducer: Reducer<ConfigurationState, RootAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionNames.SET_CONFIGURING_PATIENT:
      return {
        ...state,
        configuringPatient: action.payload.configuringPatient
      };

    case actionNames.SET_CONFIGURATION_SUCCESSFUL:
      return {
        ...state,
        configurationSuccessful: action.payload.configurationSuccessful
      };
    default:
      return state;
  }
};
