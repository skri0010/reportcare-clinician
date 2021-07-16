import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import ProcedureConst from "../../../../agent_framework/const/ProcedureConst";
import { DataStore } from "@aws-amplify/datastore";
import { ClinicianInfo } from "../../../../../aws/models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import agentAPI from "../../../../agent_framework/AgentAPI";

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
        baseline: agentAPI.getFacts().Clinician?.baseline
      });

      let clinician: ClinicianInfo | undefined;
      const userId = await AsyncStorage.getItem("UserId");
      if (userId) {
        clinician = await DataStore.query(ClinicianInfo, userId);
        if (clinician) {
          await DataStore.save(
            ClinicianInfo.copyOf(clinician, (updated) => {
              updated.hospitalName = baseline;
            })
          );

          // eslint-disable-next-line no-console
          console.log("Data has been saved");

          // Update Beliefs
          agent.addBelief(
            new Belief(agent.getID(), "lastActivity", this.getID())
          );
          agent.addBelief(new Belief("Clinician", "baselineUpdated", false));
          agent.addBelief(new Belief("Clinician", "configured", true));

          // Update Facts
          agentAPI.addFact(
            new Belief("Procedure", "ADC", ProcedureConst.INACTIVE),
            true,
            true
          );
        }
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
