import Agent from "../../agent_framework/base/Agent";
import Belief from "../../agent_framework/base/Belief";
import af_StoreEntryData from "./action-frames/app-device-configuration/StoreEntryData";
import af_RetrieveEntryData from "./action-frames/app-device-configuration/RetrieveEntryData";
import af_ApprovePatientRequest from "./action-frames/storing-data/ApprovePatientRequest";
import af_RetrievePatientDetails from "./action-frames/hf-outcome-trends/RetrievePatientDetails";
import af_RequestDetailsDisplay from "./action-frames/hf-outcome-trends/RequestDetailsDisplay";
import af_RetrieveRolePatients from "./action-frames/hf-outcome-trends/RetrieveRolePatients";
import {
  AgentIDs,
  CommonAttributes
} from "agents_implementation/agent_framework/AgentEnums";

// Initial Beliefs of Agent

// App Device Configuration
const belief1 = new Belief(AgentIDs.DTA, CommonAttributes.LAST_ACTIVITY, null);

// Data Assistant Agent
const agentDTA = new Agent(
  AgentIDs.DTA,
  [
    af_StoreEntryData,
    af_RetrieveEntryData,
    af_ApprovePatientRequest,
    af_RetrievePatientDetails,
    af_RequestDetailsDisplay,
    af_RetrieveRolePatients
  ], // action frame
  [belief1] // beliefs
);

export default agentDTA;
