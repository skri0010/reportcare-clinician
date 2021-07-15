import { Fact } from "../../../../agent_framework/model";
import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import ProcedureConst from "../../../../agent_framework/const/ProcedureConst";
import agentManager from "../../../../agent_framework/management/AgentManagement";

/**
 * Class to represent an activity for associating clinician app id to baseline data.
 * This comes from Day-1 Scenario or Procedure ADC (App Device Configuration).
 */
class AssociateData extends Activity {
  /**
   * Constructor for the AssociateData class
   */
  constructor() {
    super("AssociateData");
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    try {
      super.doActivity(agent);

      // Associating Data
      const baselineFields = ["name", "doctorId", "hospitalName"];
      const clinicianFacts = agentManager.getFacts().Clinician;
      const baseline: Fact = {};
      baselineFields.forEach((field) => {
        baseline[field] = clinicianFacts[field];
      });

      // Update Beliefs
      agent.addBelief(new Belief("Clinician", "hasBaseline", true));
      agent.addBelief(new Belief(agent.getID(), "lastActivity", this.getID()));

      // Update Facts
      agentManager.addFact(new Belief("Clinician", "hasBaseline", true), false);
      agentManager.addFact(
        new Belief("Clinician", "baseline", baseline),
        false
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// rules or preconditions for activating the AssociateData class
const rule1 = new Precondition("App", "isConfigured", true);
const rule2 = new Precondition("Clinician", "hasBaseline", false);
const rule3 = new Precondition("Procedure", "ADC", ProcedureConst.ACTIVE);

// Actionframe of the AssociateData class
const af_AssociateData = new Actionframe(
  "AF_AssociateData",
  [rule1, rule2, rule3],
  new AssociateData()
);

export default af_AssociateData;
