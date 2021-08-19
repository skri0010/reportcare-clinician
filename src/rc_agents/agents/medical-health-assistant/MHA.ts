import { Agent, Belief } from "rc_agents/framework";
import { AgentIDs } from "rc_agents/clinician_framework";
import { CommonAttributes } from "rc_agents/framework/Enums";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.MHA, CommonAttributes.LAST_ACTIVITY, null);

// Medical Health Assistant Agent
const agentMHA = new Agent(
  AgentIDs.MHA,
  [], // action frame
  [belief1] // beliefs
);

export default agentMHA;
