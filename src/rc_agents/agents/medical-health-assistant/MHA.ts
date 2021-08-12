import { Agent, Belief } from "rc_agents/framework";
import { AgentIDs, CommonAttributes } from "rc_agents/AgentEnums";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.MHA, CommonAttributes.LAST_ACTIVITY, null);

// Medical Health Assistant Agent
const agentMHA = new Agent(
  AgentIDs.MHA,
  [], // action frame
  [belief1] // beliefs
);

export default agentMHA;
