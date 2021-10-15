import { Belief } from "agents-framework";
import { AgentIDs } from "rc_agents/clinician_framework";
import { CommonAttributes } from "agents-framework/Enums";
import { af_AssociateData } from "./action-frames/medical-record-device-configuration/AssociateData";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { ClinicianAgent } from "rc_agents/clinician_framework/ClinicianAgent";
import { af_RequestEntryData } from "./action-frames/medical-record-device-configuration/RequestEntryData";

// Initial Beliefs of the Agent

const belief1 = new Belief(AgentIDs.APS, CommonAttributes.LAST_ACTIVITY, null);

// App Device Specific Agent
const agentAPS = new ClinicianAgent(
  AgentIDs.APS,
  [af_AssociateData, af_RequestEntryData],
  [belief1],
  agentAPI
);

export default agentAPS;
