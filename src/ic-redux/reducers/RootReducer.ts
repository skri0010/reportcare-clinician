import { combineReducers } from "redux";
import {
  settingsReducer,
  SettingsState,
  settingsPersistConfig
} from "./settingsReducer";
import { alertReducer } from "./agents/alertReducer";
import { clinicianReducer } from "./agents/clinicianReducer";
import { configurationReducer } from "./agents/configurationReducer";
import {
  filterReducer,
  FilterState,
  filtersPersistConfig
} from "./agents/filterReducer";
import { patientAssignmentReducer } from "./agents/patientAssignmentReducer";
import { patientReducer } from "./agents/patientReducer";
import { procedureReducer } from "./agents/procedureReducer";
import { todoReducer } from "./agents/todoReducer";
import { persistReducer } from "redux-persist";
import { RootAction } from "ic-redux/actions/RootAction";

export const RootReducer = combineReducers({
  settings: persistReducer<SettingsState, RootAction>(
    settingsPersistConfig,
    settingsReducer
  ),
  filters: persistReducer<FilterState, RootAction>(
    filtersPersistConfig,
    filterReducer
  ),
  alerts: alertReducer,
  clinicians: clinicianReducer,
  configurations: configurationReducer,
  patientAssignments: patientAssignmentReducer,
  patients: patientReducer,
  procedures: procedureReducer,
  todos: todoReducer
});
