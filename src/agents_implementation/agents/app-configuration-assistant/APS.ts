import {
  AgentIDs,
  CommonAttributes
} from "agents_implementation/agent_framework/AgentEnums";
import Agent from "../../agent_framework/base/Agent";
import Belief from "../../agent_framework/base/Belief";
import af_AssociateData from "./action-frames/app-device-configuration/AssociateData";
import af_RequestEntryData from "./action-frames/app-device-configuration/RequestEntryData";

// Initial Beliefs of the Agent

const belief1 = new Belief(AgentIDs.APS, CommonAttributes.LAST_ACTIVITY, null);

// App Device Specific Agent
const agentAPS = new Agent(
  AgentIDs.APS,
  [af_AssociateData, af_RequestEntryData],
  [belief1]
);

export default agentAPS;
