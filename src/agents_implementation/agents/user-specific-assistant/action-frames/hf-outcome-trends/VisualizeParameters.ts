import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import ProcedureConst from "../../../../agent_framework/const/ProcedureConst";
import agentAPI from "../../../../agent_framework/AgentAPI";

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
    agent.addBelief(new Belief("Patient", "detailsRetrieved", false));
    agent.addBelief(new Belief(agent.getID(), "lastActivity", this.getID()));

    try {
      const patientDetails = agentAPI.getFacts().Patient?.details;

      if (patientDetails) {
        // LS-TODO: Perform filtering on data according to roles

        // Update Facts
        agentAPI.addFact(
          new Belief("Patient", "details", patientDetails),
          false
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    agentAPI.addFact(
      new Belief("Procedure", "HF-OTP-II", ProcedureConst.INACTIVE)
    );
    // NOTE: Call to update local facts and beliefs in cloud storage will be
    // called from the ParameterGraphs component.
  }
}

// Preconditions for activating the VisualizeParameters class
const rule1 = new Precondition("Procedure", "HF-OTP-II", ProcedureConst.ACTIVE);
const rule2 = new Precondition("Patient", "detailsRetrieved", true);

// Action Frame for VisualizeParameters class
const af_VisualizeParameters = new Actionframe(
  "AF_VisualizeParameters",
  [rule1, rule2],
  new VisualizeParameters()
);

export default af_VisualizeParameters;
