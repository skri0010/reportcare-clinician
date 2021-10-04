import { Belief } from "agents-framework";
import { CommonAttributes } from "agents-framework/Enums";
import { AgentIDs } from "rc_agents/clinician_framework";
import { ClinicianAgent } from "rc_agents/clinician_framework/ClinicianAgent";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { af_InformUserContext } from "./exacerbation-user-specific-alert/InformUserContext";
import { af_RetrieveUserContext } from "./exacerbation-user-specific-alert/RetrieveUserContext";

// Initial beliefs
const belief1 = new Belief(AgentIDs.CAM, CommonAttributes.LAST_ACTIVITY, null);

// Initialization of agent
const agentCAM = new ClinicianAgent(
  AgentIDs.CAM,
  [af_RetrieveUserContext, af_InformUserContext], // action frame
  [belief1], // beliefs
  agentAPI
);

export default agentCAM;
