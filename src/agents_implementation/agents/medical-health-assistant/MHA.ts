import {
  AgentIDs,
  CommonAttributes
} from "agents_implementation/agent_framework/AgentEnums";
import Agent from "../../agent_framework/base/Agent";
import Belief from "../../agent_framework/base/Belief";
import af_ReceiveAlerts from "./action-frames/triage-alert-hf-clinic/ReceiveAlerts";
import af_RequestAlertsSort from "./action-frames/triage-alert-hf-clinic/RequestAlertsSort";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.MHA, CommonAttributes.LAST_ACTIVITY, null);

// Medical Health Assistant Agent
const agentMHA = new Agent(
  AgentIDs.MHA,
  [
    // AT-CP
    af_ReceiveAlerts,
    af_RequestAlertsSort
  ], // action frame
  [belief1] // beliefs
);

export default agentMHA;
