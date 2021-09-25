import { combineReducers } from "redux";
import { settingsReducer } from "./settingsReducer";
import { alertReducer } from "./agents/alertReducer";
import { clinicianReducer } from "./agents/clinicianReducer";
import { configurationReducer } from "./agents/configurationReducer";
import { filterReducer } from "./agents/filterReducer";
import { patientAssignmentReducer } from "./agents/patientAssignmentReducer";
import { patientReducer } from "./agents/patientReducer";
import { procedureReducer } from "./agents/procedureReducer";
import { todoReducer } from "./agents/todoReducer";

export const RootReducer = combineReducers({
  settings: settingsReducer,
  alerts: alertReducer,
  clinicians: clinicianReducer,
  configurations: configurationReducer,
  filters: filterReducer,
  patientAssignments: patientAssignmentReducer,
  patients: patientReducer,
  procedures: procedureReducer,
  todos: todoReducer
});
