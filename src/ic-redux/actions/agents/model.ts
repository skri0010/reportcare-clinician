import * as AAC from "./alertActionCreator";
import * as CAC from "./clinicianActionCreator";
import * as CoAC from "./configurationActionCreator";
import * as FAC from "./filterActionCreator";
import * as PAC from "./patientActionCreator";
import * as PAAC from "./patientAssignmentActionCreator";
import * as PrAC from "./procedureActionCreator";
import * as TAC from "./todoActionCreator";
import { ActionType } from "typesafe-actions";

export type AlertActions = ActionType<typeof AAC>;
export type ClinicianActions = ActionType<typeof CAC>;
export type ConfigurationActions = ActionType<typeof CoAC>;
export type FilterActions = ActionType<typeof FAC>;
export type PatientActions = ActionType<typeof PAC>;
export type PatientAssignmentActions = ActionType<typeof PAAC>;
export type ProcedureActions = ActionType<typeof PrAC>;
export type TodoActions = ActionType<typeof TAC>;
