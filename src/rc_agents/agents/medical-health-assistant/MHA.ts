import { Belief } from "agents-framework";
import { AgentIDs } from "rc_agents/clinician_framework";
import { CommonAttributes } from "agents-framework/Enums";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { ClinicianAgent } from "rc_agents/clinician_framework/ClinicianAgent";
import { af_AssociateAlertMedicalRecords } from "./exacerbation-user-specific-alert/AssociateAlertMedicalRecords";
import { af_RequestDisplayRefreshedAlerts } from "./exacerbation-user-specific-alert/RequestDisplayRefreshedAlerts";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.MHA, CommonAttributes.LAST_ACTIVITY, null);

// Medical Health Assistant Agent
const agentMHA = new ClinicianAgent(
  AgentIDs.MHA,
  [af_AssociateAlertMedicalRecords, af_RequestDisplayRefreshedAlerts], // action frame
  [belief1], // beliefs
  agentAPI
);

export default agentMHA;
