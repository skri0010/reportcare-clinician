import {
  AgentIDs,
  CommonAttributes
} from "agents_implementation/agent_framework/AgentEnums";
import Agent from "../../agent_framework/base/Agent";
import Belief from "../../agent_framework/base/Belief";
import af_SortAlert from "./action-frames/triage-alert-hf-clinic/SortAlert";
import af_RequestAlertInfo from "./action-frames/triage-alert-hf-clinic/RequestAlertInfo";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.ALA, CommonAttributes.LAST_ACTIVITY, null);

// Alert Assistant Agent
const agentALA = new Agent(
  AgentIDs.ALA,
  [
    // AT-CP
    af_SortAlert,
    af_RequestAlertInfo
  ], // action frame
  [belief1] // beliefs
);

export default agentALA;