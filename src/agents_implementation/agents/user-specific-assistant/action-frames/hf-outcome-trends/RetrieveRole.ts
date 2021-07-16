import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import ProcedureConst from "../../../../agent_framework/const/ProcedureConst";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DataStore } from "@aws-amplify/datastore";
import { ClinicianInfo } from "../../../../../aws/models";
import { Role } from "../../../../../models/ClinicianEnums";
import agentAPI from "../../../../agent_framework/AgentAPI";

/**
 * Class to represent an activity for retrieving role of user for retrieving patients.
 * This happens in Procedure HF Outcome Trends (HF-OTP-I).
 */
class RetrieveRole extends Activity {
  constructor() {
    super("RetrieveRole");
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);
    try {
      const role = await this.queryRole();

      // Update Beliefs
      agent.addBelief(new Belief("Clinician", "retrieveRole", false));
      agent.addBelief(new Belief(agent.getID(), "lastActivity", this.getID()));

      // Update Facts
      agentAPI.addFact(new Belief("Clinician", "role", role), false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  /**
   * Queries role of clinician
   * @returns A role in string if valid, otherwise undefined
   */
  // eslint-disable-next-line class-methods-use-this
  async queryRole(): Promise<string | null> {
    try {
      const userId = await AsyncStorage.getItem("UserId");
      if (userId) {
        const clinician = await DataStore.query(ClinicianInfo, userId);
        if (clinician && clinician.role) {
          const roles: string[] = Object.values(Role);
          if (roles.includes(clinician.role)) {
            return clinician.role;
          }
        }
      }
      return null;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }
}

// Preconditions for activating the RetrieveRole class
const rule1 = new Precondition("Procedure", "HF-OTP-I", ProcedureConst.ACTIVE);
const rule2 = new Precondition("Clinician", "retrieveRole", true);

// Action Frame for RetrieveRole class
const af_RetrieveRole = new Actionframe(
  "AF_RetrieveRole",
  [rule1, rule2],
  new RetrieveRole()
);

export default af_RetrieveRole;
