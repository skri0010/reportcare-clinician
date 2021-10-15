import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  BeliefKeys,
  ClinicianAttributes,
  AppAttributes,
  ProcedureAttributes,
  ActionFrameIDs
} from "rc_agents/clinician_framework";
import { LocalStorage } from "rc_agents/storage";

/**
 * Represents the activity for associating clinician id with entry data.
 * This happens in Procedure App-Medical Records Device Configuration (MRDC) - CP-PSB.
 * Only being triggered when a clinician signs in.
 * Patient configuration to store baseline data will trigger StoreBaseline of DTA directly.
 */
class AssociateData extends Activity {
  constructor() {
    super(ActionFrameIDs.APS.ASSOCIATE_DATA);
  }

  /**
   * Associates data to be passed to DTA
   * @param {Agent} agent current agent
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent, [rule2]);

    try {
      // Gets details from local storage
      const signUpDetails = await LocalStorage.getSignUpDetails();
      const username = await LocalStorage.getUsername();

      // New user signs in for the first time
      if (signUpDetails && username && signUpDetails.username === username) {
        // Adds signUpDetails to facts to be stored by DTA later on
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.ENTRY_DATA,
            signUpDetails
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
      }
      // Existing user
      else if (username) {
        // Adds username as facts to be used by DTA later on
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.USERNAME,
            username
          ),
          false
        );
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

// Preconditions
const rule1 = new Precondition(BeliefKeys.APP, AppAttributes.CONFIGURED, true);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.HAS_ENTRY,
  false
);
const rule3 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.MRDC,
  ProcedureConst.ACTIVE
);

// Actionframe
export const af_AssociateData = new Actionframe(
  `AF_${ActionFrameIDs.APS.ASSOCIATE_DATA}`,
  [rule1, rule2, rule3],
  new AssociateData()
);
