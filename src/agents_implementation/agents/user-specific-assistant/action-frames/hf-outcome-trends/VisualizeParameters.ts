import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import {
  BeliefKeys,
  CommonAttributes,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "../../../../agent_framework/AgentEnums";
import agentAPI from "../../../../agent_framework/AgentAPI";
import { PatientDetails } from "agents_implementation/agent_framework/model";

/**
 * Class to represent an activity for visualizing parameters of a specific patient.
 * This happens in Procedure HF Outcome Trends (HF-OTP-II).
 */
class VisualizeParameters extends Activity {
  constructor() {
    super("VisualizeParameters");
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);

    // Update Beliefs
    agent.addBelief(
      new Belief(BeliefKeys.PATIENT, PatientAttributes.DETAILS_RETRIEVED, false)
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      const patientDetails: PatientDetails =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[PatientAttributes.DETAILS];

      if (patientDetails) {
        // LS-TODO: Perform filtering on data according to roles

        // Update Facts
        // Adds patientDetails to facts to be used in front end
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.DETAILS,
            patientDetails
          ),
          false
        );
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
      )
    );
    // NOTE: Call to update local facts and beliefs in cloud storage will be
    // called from the ParameterGraphs component.
  }
}

// Preconditions for activating the VisualizeParameters class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_II,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.DETAILS_RETRIEVED,
  true
);

// Action Frame for VisualizeParameters class
const af_VisualizeParameters = new Actionframe(
  "AF_VisualizeParameters",
  [rule1, rule2],
  new VisualizeParameters()
);

export default af_VisualizeParameters;
