import { Agent, Belief } from "rc_agents/framework";
import { AgentIDs, CommonAttributes } from "rc_agents/AgentEnums";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.ALA, CommonAttributes.LAST_ACTIVITY, null);

// Alert Assistant Agent
const agentALA = new Agent(
  AgentIDs.ALA,
  [], // action frame
  [belief1] // beliefs
);

export default agentALA;
