import agentALA from "./alert-assistant/ALA";
import agentAPC from "./app-configuration-assistant/APS";
import agentDTA from "./data-assistant/DTA";
import agentMHA from "./medical-health-assistant/MHA";
import agentNWA from "./network-assistant/NWA";
import agentUSXA from "./user-specific-assistant/UXSA";

export { default as agentALA } from "./alert-assistant/ALA";
export { default as agentAPC } from "./app-configuration-assistant/APS";
export { default as agentDTA } from "./data-assistant/DTA";
export { default as agentMHA } from "./medical-health-assistant/MHA";
export { default as agentNWA } from "./network-assistant/NWA";
export { default as agentUSXA } from "./user-specific-assistant/UXSA";

export const expectedAgentIds: string[] = [
  agentALA.getID(),
  agentAPC.getID(),
  agentDTA.getID(),
  agentMHA.getID(),
  agentNWA.getID(),
  agentUSXA.getID()
];
