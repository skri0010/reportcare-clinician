import { combineReducers } from "redux";
import { settingsReducer } from "./settingsReducer";

export const RootReducer = combineReducers({
  settings: settingsReducer
});
