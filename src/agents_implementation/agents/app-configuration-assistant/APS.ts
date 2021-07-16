import Agent from "../../agent_framework/base/Agent";
import Belief from "../../agent_framework/base/Belief";
import af_AssociateData from "./action-frames/app-device-configuration/AssociateData";
import af_RequestStore from "./action-frames/app-device-configuration/RequestStore";

const agentId = "APS";

// Initial Beliefs of the Agent
// App Device Configuration
const belief1 = new Belief("App", "isConfigured", false);
const belief2 = new Belief("Clinician", "hasBaseline", false);
const belief3 = new Belief(agentId, "lastActivity", null);

// App Device Specific Agent
const agentAPS = new Agent(
  agentId,
  [af_AssociateData, af_RequestStore],
  [belief1, belief2, belief3]
);

export default agentAPS;
