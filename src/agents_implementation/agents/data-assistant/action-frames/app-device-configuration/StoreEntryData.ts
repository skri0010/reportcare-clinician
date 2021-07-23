import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import ProcedureConst from "../../../../agent_framework/const/ProcedureConst";
import AsyncStorage from "@react-native-async-storage/async-storage";
import agentAPI from "../../../../agent_framework/AgentAPI";
import { createClinicianInfo, createClinicianProtectedInfo } from "aws";
/**
 * Class to represent the activity for storing clinician's entry data.
 * This happens in Procedure App Device Configuration (ADC).
 */
class StoreEntryData extends Activity {
  constructor() {
    super("StoreEntryData");
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);

    // Update Beliefs
    agent.addBelief(new Belief(agent.getID(), "lastActivity", this.getID()));
    agent.addBelief(new Belief("Clinician", "retrieveEntry", false));

    try {
      const data = agentAPI.getFacts().Clinician.entryData;
      const clinicianUsername = agentAPI.getFacts().Clinician.username;
      if (data && clinicianUsername) {
        // Create new ClinicianInfo
        const response = await createClinicianInfo({
          owner: clinicianUsername,
          name: data.name,
          hospitalName: data.hospitalName,
          clinicianID: clinicianUsername,
          role: data.role
        });

        const newClinicianInfo = response.data.createClinicianInfo;
        if (newClinicianInfo) {
          // Create new ClinicianProtectedInfo data
          await createClinicianProtectedInfo({
            owner: clinicianUsername,
            clinicianID: clinicianUsername,
            facts: "",
            APS: "",
            DTA: "",
            UXSA: ""
          });

          const entry = newClinicianInfo;
          await AsyncStorage.multiSet([
            ["UserId", entry.id],
            ["ClinicianId", entry.clinicianID]
          ]);
          await AsyncStorage.removeItem("Details");
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Update Facts
    agentAPI.addFact(new Belief("Clinician", "configured", true));
    agentAPI.addFact(new Belief("Clinician", "entryData", null), false);
    agentAPI.addFact(new Belief("Clinician", "username", null), false);
    agentAPI.addFact(
      new Belief("Procedure", "ADC", ProcedureConst.INACTIVE),
      true,
      true
    );
  }
}

// Rules or preconditions for activating the StoreEntryData class
const rule1 = new Precondition("Clinician", "retrieveEntry", true);
const rule2 = new Precondition("Clinician", "configured", false);
const rule3 = new Precondition("Procedure", "ADC", ProcedureConst.ACTIVE);

// Action Frame for StoreEntryData class
const af_StoreEntryData = new Actionframe(
  "AF_StoreEntryData",
  [rule1, rule2, rule3],
  new StoreEntryData()
);

export default af_StoreEntryData;
