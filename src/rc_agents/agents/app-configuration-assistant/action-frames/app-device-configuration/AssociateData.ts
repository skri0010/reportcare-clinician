import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  ProcedureConst,
  BeliefKeys,
  ClinicianAttributes,
  AppAttributes,
  ProcedureAttributes,
  ActionFrameIDs
} from "rc_agents/AgentEnums";
import { AsyncStorageKeys } from "rc_agents/storage";
import agentAPI from "rc_agents/framework/AgentAPI";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Class to represent the activity for associating clinician id with entry data.
 * This happens in Procedure App Device Configuration (ADC).
 */
class AssociateData extends Activity {
  /**
   * Constructor for the AssociateData class
   */
  constructor() {
    super(ActionFrameIDs.APS.ASSOCIATE_DATA);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent, [rule2]);

    try {
      const [[, username], [, details]] = await AsyncStorage.multiGet([
        AsyncStorageKeys.USERNAME,
        AsyncStorageKeys.SIGN_UP_DETAILS
      ]);
      if (username) {
        // Adds username as facts to be used by DTA later on
        await AsyncStorage.removeItem(AsyncStorageKeys.USERNAME);
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.USERNAME,
            username
          ),
          false
        );
      }

      if (details) {
        // New user: broadcasts sign up details to be saved by DTA later on
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.ENTRY_DATA,
            JSON.parse(details)
          ),
          false
        );
        // Precondition for StoreEntryData action frame of DTA
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.CONFIGURED,
            false
          )
        );
      } else {
        // Existing user
        // Precondition for RetrieveEntryData action frame of DTA
        agentAPI.addFact(
          new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.CONFIGURED, true)
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Rules or preconditions for activating the AssociateData class
const rule1 = new Precondition(BeliefKeys.APP, AppAttributes.CONFIGURED, true);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.HAS_ENTRY,
  false
);
const rule3 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.ADC,
  ProcedureConst.ACTIVE
);

// Actionframe of the AssociateData class
export const af_AssociateData = new Actionframe(
  `AF_${ActionFrameIDs.APS.ASSOCIATE_DATA}`,
  [rule1, rule2, rule3],
  new AssociateData()
);
