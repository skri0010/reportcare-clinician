import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import ProcedureConst from "../../../../agent_framework/const/ProcedureConst";
import agentAPI from "../../../../agent_framework/AgentAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "agents_implementation/agent_framework/const/AsyncStorageKeys";

/**
 * Class to represent the activity for associating clinician id with entry data.
 * This happens in Procedure App Device Configuration (ADC).
 */
class AssociateData extends Activity {
  /**
   * Constructor for the AssociateData class
   */
  constructor() {
    super("AssociateData");
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent);

    // Update Beliefs
    agent.addBelief(new Belief("Clinician", "hasEntry", true));

    try {
      const [[, clinicianID], [, details]] = await AsyncStorage.multiGet([
        AsyncStorageKeys.ClinicianID,
        AsyncStorageKeys.SignUpDetails
      ]);
      if (clinicianID) {
        await AsyncStorage.removeItem(AsyncStorageKeys.ClinicianID);
        agentAPI.addFact(
          new Belief("Clinician", "username", clinicianID),
          false
        );
      }

      if (details) {
        // New user
        agentAPI.addFact(
          new Belief("Clinician", "entryData", JSON.parse(details)),
          false
        );
        agentAPI.addFact(new Belief("Clinician", "configured", false));
      } else {
        // Existing user
        agentAPI.addFact(new Belief("Clinician", "configured", true));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Update lastActivity last since RequestEntryData will be triggered by this
    agent.addBelief(new Belief(agent.getID(), "lastActivity", this.getID()));
  }
}

// Rules or preconditions for activating the AssociateData class
const rule1 = new Precondition("App", "configured", true);
const rule2 = new Precondition("Clinician", "hasEntry", false);
const rule3 = new Precondition("Procedure", "ADC", ProcedureConst.ACTIVE);

// Actionframe of the AssociateData class
const af_AssociateData = new Actionframe(
  "AF_AssociateData",
  [rule1, rule2, rule3],
  new AssociateData()
);

export default af_AssociateData;
