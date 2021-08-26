import { Agent, Belief } from "rc_agents/framework";
import { AgentIDs } from "rc_agents/clinician_framework";
import { CommonAttributes } from "rc_agents/framework/Enums";
import { af_SyncProtectedInfo } from "./action-frames/SyncProtectedInfo";
import { af_SyncPatientAssignmentResolutions } from "./action-frames/SyncPatientAssignmentResolutions";
import af_SyncCreateTodos from "./action-frames/SyncCreateTodos";
import af_SyncUpdateTodos from "./action-frames/SyncUpdateTodos";
import af_SyncUpdateAlerts from "./action-frames/SyncUpdateAlerts";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.NWA, CommonAttributes.LAST_ACTIVITY, null);

// Network Assistant Agent
const agentNWA = new Agent(
  AgentIDs.NWA,
  [
    af_SyncProtectedInfo,
    af_SyncPatientAssignmentResolutions,
    af_SyncCreateTodos,
    af_SyncUpdateTodos,
    af_SyncUpdateAlerts
  ], // action frame
  [belief1] // beliefs
);

export default agentNWA;
