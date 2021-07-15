import Agent from "../../agent_framework/base/Agent";
import Belief from "../../agent_framework/base/Belief";
import af_StoreBaseline from "./action-frames/app-device-configuration/StoreBaseline";

// Initial Beliefs of Agent1
// App Device Configuration
const belief1 = new Belief("Clinician", "baselineUpdated", false);
const belief2 = new Belief("DTA", "lastActivity", null);

// Data Assistant Agent
const agentDTA = new Agent(
  "DTA",
  [af_StoreBaseline], // action frame
  [belief1, belief2] // beliefs
);

export default agentDTA;
