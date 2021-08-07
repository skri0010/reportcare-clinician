import Agent from "../../agent_framework/base/Agent";
import Belief from "../../agent_framework/base/Belief";
import af_StoreEntryData from "./action-frames/app-device-configuration/StoreEntryData";
import af_RetrieveEntryData from "./action-frames/app-device-configuration/RetrieveEntryData";
import { af_ResolvePatientAssignment } from "./action-frames/storing-data/ResolvePatientAssignment";
import af_RetrievePatientDetails from "./action-frames/hf-outcome-trends/RetrievePatientDetails";
import af_RequestDetailsDisplay from "./action-frames/hf-outcome-trends/RequestDetailsDisplay";
import af_RetrieveRolePatients from "./action-frames/hf-outcome-trends/RetrieveRolePatients";
import af_RetrieveAlertInfos from "./action-frames/triage-alert-hf-clinic/RetrieveAlertInfos";
import af_RequestAlertsDisplay from "./action-frames/triage-alert-hf-clinic/RequestAlertsDisplay";
import { af_RetrievePendingPatientAssignments } from "./action-frames/hf-outcome-trends/RetrievePendingPatientAssignments";
import { af_RequestPendingPatientAssignments } from "./action-frames/hf-outcome-trends/RequestPendingPatientAssignments";
import {
  AgentIDs,
  CommonAttributes
} from "agents_implementation/agent_framework/AgentEnums";
import af_RetrievePendingAlertCount from "./action-frames/triage-alert-hf-clinic/RetrievePendingAlertCount";
import af_RequestPendingAlertCountDisplay from "./action-frames/triage-alert-hf-clinic/RequestPendingAlertCountDisplay";

// Initial Beliefs of Agent

// App Device Configuration
const belief1 = new Belief(AgentIDs.DTA, CommonAttributes.LAST_ACTIVITY, null);

// Data Assistant Agent
const agentDTA = new Agent(
  AgentIDs.DTA,
  [
    // ADC
    af_StoreEntryData,
    af_RetrieveEntryData,

    // SRD
    af_ResolvePatientAssignment,

    // HF-OTP-I
    af_RetrievePatientDetails,
    af_RequestDetailsDisplay,
    af_RetrieveRolePatients,

    // HF-OTP-II
    af_RetrievePendingPatientAssignments,
    af_RequestPendingPatientAssignments,

    // AT-CP
    af_RetrievePendingAlertCount,
    af_RequestPendingAlertCountDisplay,
    af_RetrieveAlertInfos,
    af_RequestAlertsDisplay
  ], // action frame
  [belief1] // beliefs
);

export default agentDTA;
