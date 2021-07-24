import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import ProcedureConst from "../../../../agent_framework/const/ProcedureConst";
import AsyncStorage from "@react-native-async-storage/async-storage";
import agentAPI from "../../../../agent_framework/AgentAPI";
import { getClinicianInfo } from "aws";
import { AsyncStorageKeys } from "agents_implementation/agent_framework/const/AsyncStorageKeys";

/**
 * Class to represent the activity for retrieving clinician's entry data.
 * This happens when an existing user signs in.
 */
class RetrieveEntryData extends Activity {
  constructor() {
    super("RetrieveEntryData");
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
      const clinicianUsername = agentAPI.getFacts().Clinician?.username;

      if (clinicianUsername) {
        agentAPI.addFact(new Belief("Clinician", "username", null), false);

        // Retrieve user's entry in DynamoDB table
        const query: any = await getClinicianInfo({
          clinicianID: clinicianUsername
        });
        if (query.data) {
          const clinician = query.data.getClinicianInfo;
          if (clinician) {
            // Merges retrieved facts into current facts
            if (
              clinician.facts &&
              Object.entries(JSON.parse(clinician.facts)).length > 0
            ) {
              agentAPI.mergeFacts(JSON.parse(clinician.facts));
            }

            // Merges retrieved beliefs of each agent into current beliefs
            agentAPI.getAgents().forEach((existingAgent) => {
              switch (existingAgent.getID()) {
                case "APS": {
                  if (
                    clinician.APS &&
                    Object.entries(JSON.parse(clinician.APS)).length > 0
                  ) {
                    existingAgent.mergeBeliefs(JSON.parse(clinician.APS));
                  }
                  break;
                }
                case "DTA": {
                  if (
                    clinician.DTA &&
                    Object.entries(JSON.parse(clinician.DTA)).length > 0
                  ) {
                    existingAgent.mergeBeliefs(JSON.parse(clinician.DTA));
                  }
                  break;
                }
                case "UXSA": {
                  if (
                    clinician.UXSA &&
                    Object.entries(JSON.parse(clinician.UXSA)).length > 0
                  ) {
                    existingAgent.mergeBeliefs(JSON.parse(clinician.UXSA));
                  }
                  break;
                }
                default: {
                  break;
                }
              }
            });

            // Stores clinicianID and clinician locally
            await AsyncStorage.multiSet([
              [AsyncStorageKeys.ClinicianID, clinician.clinicianID],
              [AsyncStorageKeys.Clinician, JSON.stringify(clinician)]
            ]);
          }
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Update Facts
    agentAPI.addFact(
      new Belief("Procedure", "ADC", ProcedureConst.INACTIVE),
      true,
      true
    );
  }
}

// Rules or preconditions for activating the RetrieveEntryData class
const rule1 = new Precondition("Clinician", "retrieveEntry", true);
const rule2 = new Precondition("Clinician", "configured", true);
const rule3 = new Precondition("Procedure", "ADC", ProcedureConst.ACTIVE);

// Action Frame for RetrieveEntryData class
const af_RetrieveEntryData = new Actionframe(
  "AF_RetrieveEntryData",
  [rule1, rule2, rule3],
  new RetrieveEntryData()
);

export default af_RetrieveEntryData;
