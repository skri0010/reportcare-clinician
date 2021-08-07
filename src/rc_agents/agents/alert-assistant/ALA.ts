import { AgentIDs, CommonAttributes } from "rc_agents/AgentEnums";
import Agent from "../../framework/base/Agent";
import Belief from "../../framework/base/Belief";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.ALA, CommonAttributes.LAST_ACTIVITY, null);

// Alert Assistant Agent
const agentALA = new Agent(
  AgentIDs.ALA,
  [], // action frame
  [belief1] // beliefs
);

export default agentALA;
