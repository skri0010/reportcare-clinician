import { SettingsActions } from "ic-redux/actions/settings/model";
import {
  AlertActions,
  ClinicianActions,
  ConfigurationActions,
  FilterActions,
  PatientActions,
  PatientAssignmentActions,
  ProcedureActions,
  TodoActions
} from "./agents/model";

export type RootAction =
  | SettingsActions
  | AlertActions
  | ClinicianActions
  | ConfigurationActions
  | FilterActions
  | PatientActions
  | PatientAssignmentActions
  | ProcedureActions
  | TodoActions;
