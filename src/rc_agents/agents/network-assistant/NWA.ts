import { Belief } from "agents-framework";
import { AgentIDs } from "rc_agents/clinician_framework";
import { CommonAttributes } from "agents-framework/Enums";
import { af_SyncProtectedInfo } from "./action-frames/SyncProtectedInfo";
import { af_SyncPatientAssignmentResolutions } from "./action-frames/SyncPatientAssignmentResolutions";
import af_SyncTodosCreate from "./action-frames/SyncTodosCreate";
import af_SyncTodosUpdate from "./action-frames/SyncTodosUpdate";
import af_SyncAlertsUpdate from "./action-frames/SyncAlertsUpdate";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { ClinicianAgent } from "rc_agents/clinician_framework/ClinicianAgent";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.NWA, CommonAttributes.LAST_ACTIVITY, null);

// Network Assistant Agent
const agentNWA = new ClinicianAgent(
  AgentIDs.NWA,
  [
    af_SyncProtectedInfo,
    af_SyncPatientAssignmentResolutions,

    af_SyncTodosCreate,
    af_SyncTodosUpdate,
    af_SyncAlertsUpdate
  ], // action frame
  [belief1], // beliefs
  agentAPI
);

export default agentNWA;
