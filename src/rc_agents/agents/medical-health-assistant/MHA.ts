import { Agent, Belief } from "rc_agents/framework";
import { AgentIDs, CommonAttributes } from "rc_agents/AgentEnums";
import { af_RequestAlertInfos } from "./action-frames/triage-alert-hf-clinic/RequestAlertInfos";
import { af_RetrieveAlerts } from "./action-frames/triage-alert-hf-clinic/RetrieveAlerts";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.MHA, CommonAttributes.LAST_ACTIVITY, null);

// Medical Health Assistant Agent
const agentMHA = new Agent(
  AgentIDs.MHA,
  [
    // AT-CP
    af_RetrieveAlerts,
    af_RequestAlertInfos
  ], // action frame
  [belief1] // beliefs
);

export default agentMHA;
