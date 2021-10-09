import { Belief } from "agents-framework";
import { AgentIDs } from "rc_agents/clinician_framework";
import { CommonAttributes } from "agents-framework/Enums";
import { af_SyncProtectedInfo } from "./action-frames/SyncProtectedInfo";
import { af_SyncPatientAssignmentResolutions } from "./action-frames/SyncPatientAssignmentResolutions";
import { af_SyncCreateTodos } from "./action-frames/SyncCreateTodos";
import { af_SyncUpdateTodos } from "./action-frames/SyncUpdateTodos";
import { af_SyncUpdateAlerts } from "./action-frames/SyncUpdateAlerts";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { ClinicianAgent } from "rc_agents/clinician_framework/ClinicianAgent";
import { af_SyncPatientBaselines } from "./action-frames/SyncPatientBaselines";
import { af_SyncProcessAlertNotifications } from "./action-frames/SyncProcessAlertNotifications";
import { af_SyncProcessPatientAssignmentSubscriptions } from "./action-frames/SyncProcessPatientAssignmentSubscriptions";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.NWA, CommonAttributes.LAST_ACTIVITY, null);

// Network Assistant Agent
const agentNWA = new ClinicianAgent(
  AgentIDs.NWA,
  [
    af_SyncProtectedInfo,
    af_SyncPatientAssignmentResolutions,
    af_SyncPatientBaselines,
    af_SyncCreateTodos,
    af_SyncUpdateTodos,
    af_SyncUpdateAlerts,
    af_SyncProcessAlertNotifications,
    af_SyncProcessPatientAssignmentSubscriptions
  ], // action frame
  [belief1], // beliefs
  agentAPI
);

export default agentNWA;
