import { Belief } from "agents-framework";
import { AgentIDs } from "rc_agents/clinician_framework";
import { CommonAttributes } from "agents-framework/Enums";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { ClinicianAgent } from "rc_agents/clinician_framework/ClinicianAgent";
import { af_ProcessAlertNotification } from "./action-frames/exacerbation-user-specific-alert/ProcessAlertNotification";
import { af_InformRealTimeAlert } from "./action-frames/exacerbation-user-specific-alert/InformRealTimeAlert";
import { af_RequestDisplayRefreshedAlerts } from "./action-frames/exacerbation-user-specific-alert/RequestDisplayRefreshedAlerts";
import { af_RequestRetrieveUserContext } from "./action-frames/exacerbation-user-specific-alert/RequestRetrieveUserContext";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.ALA, CommonAttributes.LAST_ACTIVITY, null);

// Alert Assistant Agent
const agentALA = new ClinicianAgent(
  AgentIDs.ALA,
  [
    // HF-EUA
    af_ProcessAlertNotification,
    af_InformRealTimeAlert,
    af_RequestRetrieveUserContext,
    af_RequestDisplayRefreshedAlerts
  ], // action frame
  [belief1], // beliefs
  agentAPI
);

export default agentALA;
