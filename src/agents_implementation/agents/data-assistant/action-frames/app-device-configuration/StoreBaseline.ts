import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import ProcedureConst from "../../../../agent_framework/const/ProcedureConst";
import agentManager from "../../../../agent_framework/management/AgentManagement";

/**
 * Class to represent an activity for associating Clinician app id to baseline data.
 * This comes from Day-1 Scenario or Procedure ADC (App Device Configuration).
 */
class StoreBaseline extends Activity {
  constructor() {
    super("StoreBaseline");
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);
    try {
      const baseline = JSON.stringify({
        baseline: agentManager.getFacts().Clinician?.baseline
      });

      let clinicianExists = false;
      const storedClinician = await AsyncStorage.getItem(this.id);
      if (
        storedClinician &&
        Object.entries(JSON.parse(storedClinician)).length > 0
      ) {
        clinicianExists = true;
      }

      if (clinicianExists) {
        await AsyncStorage.mergeItem("Clinician", baseline, () => {
          Alert.alert(
            "Data is successfully updated ...",
            "Baseline data is successfully stored ...",
            [
              // eslint-disable-next-line no-console
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );

          // Update Beliefs
          agent.addBelief(
            new Belief(agent.getID(), "lastActivity", this.getID())
          );
          agent.addBelief(new Belief("Clinician", "baselineUpdated", false));
          agent.addBelief(new Belief("Clinician", "configured", true));

          // Update Facts
          agentManager.addFact(
            new Belief("Procedure", "ADC", ProcedureConst.INACTIVE)
          );
          agentManager.addFact(new Belief("App", "isConfigured", true));
        });
      } else {
        await AsyncStorage.setItem("Clinician", baseline, () => {
          Alert.alert(
            "Data is successfully updated ...",
            "Baseline data is successfully stored ...",
            [
              // eslint-disable-next-line no-console
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );

          // Update Beliefs
          agent.addBelief(
            new Belief(agent.getID(), "lastActivity", this.getID())
          );
          agent.addBelief(new Belief("Clinician", "baselineUpdated", false));
          agent.addBelief(new Belief("Clinician", "configured", true));

          // Update Facts
          agentManager.addFact(
            new Belief("Procedure", "ADC", ProcedureConst.INACTIVE)
          );
          agentManager.addFact(new Belief("App", "isConfigured", true));
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// rules or preconditions for activating the StoreBaseline class
const rule1 = new Precondition("Clinician", "baselineUpdated", true);
const rule2 = new Precondition("Procedure", "ADC", ProcedureConst.ACTIVE);

// Action Frame for StoreBaseline class
const af_StoreBaseline = new Actionframe(
  "AF_StoreBaseline",
  [rule1, rule2],
  new StoreBaseline()
);

export default af_StoreBaseline;
