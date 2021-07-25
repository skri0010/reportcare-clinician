import Agent from "../../agent_framework/base/Agent";
import Belief from "../../agent_framework/base/Belief";
import af_VisualizeParameters from "./action-frames/hf-outcome-trends/VisualizeParameters";
import af_RetrieveRole from "./action-frames/hf-outcome-trends/RetrieveRole";
import af_RequestRetrieveAll from "./action-frames/hf-outcome-trends/RequestRetrieveAll";
import {
  AgentIDs,
  CommonAttributes
} from "agents_implementation/agent_framework/AgentEnums";

// Initial Beliefs of Agent
const belief1 = new Belief(AgentIDs.UXSA, CommonAttributes.LAST_ACTIVITY, null);

// User Specific Assistant Agent
const agentUXSA = new Agent(
  AgentIDs.UXSA,
  [af_VisualizeParameters, af_RetrieveRole, af_RequestRetrieveAll], // action frame
  [belief1] // beliefs
);

export default agentUXSA;
