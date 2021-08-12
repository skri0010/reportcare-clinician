/* eslint-disable */

import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import agentAPI from "rc_agents/framework/AgentAPI";
import { PatientDetails } from "rc_agents/model";
import { store } from "util/useRedux";
import {
  setProcedureOngoing,
  setPatientDetails
} from "ic-redux/actions/agents/actionCreator";
import { mockVitals } from "mock/mockVitals";

/**
 * Class to represent an activity for visualizing parameters of a specific patient.
 * This happens in Procedure HF Outcome Trends (HF-OTP-II).
 */
class VisualizeParameters extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.VISUALIZE_PARAMETERS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    try {
      const patientDetails: PatientDetails =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.PATIENT_DETAILS
        ];

      if (patientDetails) {
        // LS-TODO: Perform filtering on data according to roles
        // Dispatch patient details to front end
        store.dispatch(setPatientDetails(patientDetails));

        // Removes patientDetails from facts
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.PATIENT_DETAILS,
            null
          ),
          false
        );
      }

      // LS-TODO: To be removed - for testing purposes only
      else {
        // JH-TODO-NEW FIXME
        // const mockDetails: PatientDetails = {
        //   activityInfo: {},
        //   symptomReports: {},
        //   vitalsReports: mockVitals
        // };
        // store.dispatch(setPatientDetails(mockDetails));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Stops the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.HF_OTP_II,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );

    // Dispatch to front end that procedure has been completed
    store.dispatch(setProcedureOngoing(false));
  }
}

// Preconditions for activating the VisualizeParameters class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_II,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.PATIENT_DETAILS_RETRIEVED,
  true
);

// Action Frame for VisualizeParameters class
export const af_VisualizeParameters = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.VISUALIZE_PARAMETERS}`,
  [rule1, rule2],
  new VisualizeParameters()
);
