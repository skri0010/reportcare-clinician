import { actionNames } from "ic-redux/actions/actionNames";
import { RootAction } from "ic-redux/actions/RootAction";
import { Reducer } from "redux";

interface ProcedureState {
  // procedure
  procedureSuccessful: boolean;
  procedureOngoing: boolean;
  online: boolean;
}

const initialState: ProcedureState = {
  procedureSuccessful: false,
  procedureOngoing: false,
  online: false
};

export const procedureReducer: Reducer<ProcedureState, RootAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionNames.SET_PROCEDURE_ONGOING:
      return { ...state, procedureOngoing: action.payload.procedureOngoing };
    case actionNames.SET_PROCEDURE_SUCCESSFUL:
      return { ...state, procedureSuccessful: action.payload.successful };
    default:
      return state;
  }
};
