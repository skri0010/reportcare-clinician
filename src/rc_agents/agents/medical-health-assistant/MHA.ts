import { Belief } from "agents-framework";
import { AgentIDs } from "rc_agents/clinician_framework";
import { CommonAttributes } from "agents-framework/Enums";
import agentAPI from "rc_agents/clinician_framework/ClinicianAgentAPI";
import ClinicianAgent from "rc_agents/clinician_framework/ClinicianAgent";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.MHA, CommonAttributes.LAST_ACTIVITY, null);

// Medical Health Assistant Agent
const agentMHA = new ClinicianAgent(
  AgentIDs.MHA,
  [], // action frame
  [belief1], // beliefs
  agentAPI
);

export default agentMHA;
