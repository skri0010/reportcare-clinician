import { AgentIDs, CommonAttributes } from "rc_agents/AgentEnums";
import Agent from "../../framework/base/Agent";
import Belief from "../../framework/base/Belief";
import af_SyncProtectedInfo from "./action-frames/SyncProtectedInfo";
import af_SyncPatientAssignmentResolutions from "./action-frames/SyncPatientAssignmentResolutions";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.NWA, CommonAttributes.LAST_ACTIVITY, null);

// Network Assistant Agent
const agentNWA = new Agent(
  AgentIDs.NWA,
  [af_SyncProtectedInfo, af_SyncPatientAssignmentResolutions], // action frame
  [belief1] // beliefs
);

export default agentNWA;
