import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import {
  ActionFrameIDs,
  BeliefKeys,
  CommonAttributes,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "agents_implementation/agent_framework/AgentEnums";
import agentAPI from "agents_implementation/agent_framework/AgentAPI";
import { Alert } from "agents_implementation/agent_framework/model";

/**
 * Class to represent the activity for sorting alerts received from MHA.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class SortAlert extends Activity {
  /**
   * Constructor for the SortAlert class
   */
  constructor() {
    super(ActionFrameIDs.ALA.SORT_ALERT);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent);

    // Update beliefs to stop the procedure from repeating
    agent.addBelief(
      new Belief(BeliefKeys.PATIENT, PatientAttributes.NEW_ALERT, false)
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      const alert: Alert =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[PatientAttributes.ALERT];
      if (alert) {
        // LS-TODO: Figure out how to sort
        agentAPI.addFact(
          new Belief(BeliefKeys.PATIENT, PatientAttributes.ALERT, alert),
          false
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Rules or preconditions for activating the SortAlert class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.NEW_ALERT,
  true
);

// Actionframe of the SortAlert class
const af_SortAlert = new Actionframe(
  `AF_${ActionFrameIDs.ALA.SORT_ALERT}`,
  [rule1, rule2],
  new SortAlert()
);

export default af_SortAlert;
