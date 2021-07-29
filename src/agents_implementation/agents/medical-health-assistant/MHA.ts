import {
  AgentIDs,
  CommonAttributes
} from "agents_implementation/agent_framework/AgentEnums";
import Agent from "../../agent_framework/base/Agent";
import Belief from "../../agent_framework/base/Belief";
import af_ReceiveAlert from "./action-frames/triage-alert-hf-clinic/ReceiveAlert";
import af_RequestAlertSort from "./action-frames/triage-alert-hf-clinic/RequestAlertSort";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.MHA, CommonAttributes.LAST_ACTIVITY, null);

// Medical Health Assistant Agent
const agentMHA = new Agent(
  AgentIDs.MHA,
  [
    // AT-CP
    af_ReceiveAlert,
    af_RequestAlertSort
  ], // action frame
  [belief1] // beliefs
);

export default agentMHA;
