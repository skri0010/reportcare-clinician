import { AgentIDs, CommonAttributes } from "rc_agents/AgentEnums";
import { Agent, Belief } from "rc_agents/framework";
import { af_RetrieveEntryData } from "./action-frames/app-device-configuration/RetrieveEntryData";
import { af_StoreEntryData } from "./action-frames/app-device-configuration/StoreEntryData";
import { af_RetrievePatientDetails } from "./action-frames/hf-outcome-trends/RetrievePatientDetails";
import { af_RequestDisplayPatientDetails } from "./action-frames/hf-outcome-trends/RequestDisplayPatientDetails";
import { af_RetrievePatientsByRole } from "./action-frames/hf-outcome-trends/RetrievePatientsByRole";
import { af_RequestDisplayPatients } from "./action-frames/hf-outcome-trends/RequestDisplayPatients";
import { af_RetrieveAlerts } from "./action-frames/triage-alert-hf-clinic/RetrieveAlerts";
import { af_RequestAlertsDisplay } from "./action-frames/triage-alert-hf-clinic/RequestAlertsDisplay";
import { af_RetrieveAlertInfo } from "./action-frames/triage-alert-hf-clinic/RetrieveAlertInfo";
import { af_RequestAlertInfoDisplay } from "./action-frames/triage-alert-hf-clinic/RequestAlertInfoDisplay";
import { af_RetrievePendingPatientAssignments } from "./action-frames/storing-data/RetrievePendingPatientAssignments";
import { af_RequestDisplayPendingPatientAssignments } from "./action-frames/storing-data/RequestDisplayPendingPatientAssignments";
import { af_ResolvePatientAssignment } from "./action-frames/storing-data/ResolvePatientAssignment";
import { af_RequestSyncPatientAssignmentResolutions } from "./action-frames/storing-data/RequestSyncPatientAssignmentResolutions";
import { af_RetrievePendingAlertCount } from "./action-frames/triage-alert-hf-clinic/RetrievePendingAlertCount";
import { af_RequestPendingAlertCountDisplay } from "./action-frames/triage-alert-hf-clinic/RequestPendingAlertCountDisplay";
import af_CreateTodo from "./action-frames/storing-data/CreateTodo";
import af_UpdateTodo from "./action-frames/storing-data/UpdateTodo";
import af_RetrieveTodos from "./action-frames/storing-data/RetrieveTodos";
import { af_RequestTodosDisplay } from "./action-frames/storing-data/RequestTodosDisplay";

// Initial Beliefs of Agent

// App Device Configuration
const belief1 = new Belief(AgentIDs.DTA, CommonAttributes.LAST_ACTIVITY, null);

// Data Assistant Agent
const agentDTA = new Agent(
  AgentIDs.DTA,
  [
    // ADC
    af_StoreEntryData,
    af_RetrieveEntryData,

    // SRD-I
    af_RetrievePendingPatientAssignments,
    af_RequestDisplayPendingPatientAssignments,
    af_ResolvePatientAssignment,
    af_RequestSyncPatientAssignmentResolutions,

    // HF-OTP-I
    af_RetrievePatientsByRole,
    af_RequestDisplayPatients,

    // HF-OTP-II
    af_RetrievePatientDetails,
    af_RequestDisplayPatientDetails,

    // AT-CP
    af_RetrievePendingAlertCount,
    af_RequestPendingAlertCountDisplay,
    af_RetrieveAlerts,
    af_RequestAlertsDisplay,
    af_RetrieveAlertInfo,
    af_RequestAlertInfoDisplay,

    // SRD-II
    af_RetrieveTodos,
    af_CreateTodo,
    af_UpdateTodo,
    af_RequestTodosDisplay
  ], // action frame
  [belief1] // beliefs
);

export default agentDTA;
