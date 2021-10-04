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
  ActionFrameIDs,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import Geolocation, {
  GeolocationResponse
} from "@react-native-community/geolocation";

/**
 * Represents the activity for retrieving user's context when real-time alert is received.
 * This happens in Procedure HF- Exacerbation User Specific Alert (HF-EUA).
 */
class RetrieveUserContext extends Activity {
  constructor() {
    super(ActionFrameIDs.CAM.RETRIEVE_USER_CONTEXT);
  }

  /**
   * Performs the activity
   * @param {Agent} agent current agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    try {
      // Retrieves time and location of current user
      const currentTime = new Date().toLocaleTimeString();
      let currentLocation: GeolocationResponse | undefined;
      Geolocation.getCurrentPosition((info) => {
        currentLocation = info;
        // eslint-disable-next-line no-console
        console.log(info);
      });

      // Adds retrieved time and location to facts
      if (currentTime && currentLocation) {
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.CURRENT_TIME,
            currentTime
          ),
          false
        );
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.CURRENT_LOCATION,
            currentLocation
          ),
          false
        );
        // Updates beliefs to trigger InformUserContext action frame
        agent.addBelief(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.CONTEXT_RETRIEVED,
            true
          )
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // End the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.HF_EUA,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_EUA,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.ALERT_MEDICAL_RECORDS_RETRIEVED,
  true
);

// Actionframe
export const af_RetrieveUserContext = new Actionframe(
  `AF_${ActionFrameIDs.CAM.RETRIEVE_USER_CONTEXT}`,
  [rule1, rule2],
  new RetrieveUserContext()
);
