import AgentManagement from "./AgentManagement";
import agentAPS from "../../agents/app-configuration-assistant/APS";
import agentDTA from "../../agents/data-assistant/DTA";
import agentUXSA from "../../agents/user-specific-assistant/UXSA";

/**
 * Class for management of active agents on mobile application.
 */
class MobileAgentManagement extends AgentManagement {
  // eslint-disable-next-line class-methods-use-this
  startAgents(): void {
    agentAPS.start();
    agentDTA.start();
    agentUXSA.start();
  }
}

export default MobileAgentManagement;
