import { Belief } from "agents-framework";
import { AgentIDs } from "rc_agents/clinician_framework";
import { CommonAttributes } from "agents-framework/Enums";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { ClinicianAgent } from "rc_agents/clinician_framework/ClinicianAgent";
import { af_ProcessAlertNotification } from "./action-frames/exacerbation-user-specific-alert/ProcessAlertNotification";
import { af_RequestAssociateAlertMedicalRecords } from "./action-frames/exacerbation-user-specific-alert/RequestAssociateAlertMedicalRecords";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.ALA, CommonAttributes.LAST_ACTIVITY, null);

// Alert Assistant Agent
const agentALA = new ClinicianAgent(
  AgentIDs.ALA,
  [
    // HF-EUA
    af_ProcessAlertNotification,
    af_RequestAssociateAlertMedicalRecords
  ], // action frame
  [belief1], // beliefs
  agentAPI
);

export default agentALA;
