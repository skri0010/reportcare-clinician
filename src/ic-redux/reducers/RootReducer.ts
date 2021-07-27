import { combineReducers } from "redux";
import { settingsReducer } from "./settingsReducer";
import { agentsDataReducer } from "./agentsReducer";

export const RootReducer = combineReducers({
  settings: settingsReducer,
  agents: agentsDataReducer
});
