import AgentManagement from "./AgentManagement";
import agentAPS from "../../agents/app-configuration-assistant/APS";
import agentDTA from "../../agents/data-assistant/DTA";
import agentUXSA from "../../agents/user-specific-assistant/UXSA";
import agentNWA from "../../agents/network-assistant/NWA";
import agentALA from "rc_agents/agents/alert-assistant/ALA";
import agentMHA from "rc_agents/agents/medical-health-assistant/MHA";

/**
 * Class for management of active agents on mobile application.
 */
class MobileAgentManagement extends AgentManagement {
  // eslint-disable-next-line class-methods-use-this
  startAgents(): void {
    agentAPS.start();
    agentDTA.start();
    agentUXSA.start();
    agentNWA.start();
    agentALA.start();
    agentMHA.start();
  }
}

export default MobileAgentManagement;
