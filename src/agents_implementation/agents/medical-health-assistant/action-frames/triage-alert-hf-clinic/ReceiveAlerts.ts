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
import { mockAlerts } from "mock/mockAlerts";

// LS-TODO: To be revised regarding communication between MHA agents of patient and clinician

/**
 * Class to represent the activity for receiving alerts.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class ReceiveAlerts extends Activity {
  /**
   * Constructor for the ReceiveAlerts class
   */
  constructor() {
    super(ActionFrameIDs.MHA.RECEIVE_ALERTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);

    // Update beliefs to stop the procedure from repeating
    agent.addBelief(
      new Belief(BeliefKeys.PATIENT, PatientAttributes.INCOMING_ALERTS, false)
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      // LS-TODO: Retrieve alert information and pack into Alert

      // Broadcast alert to facts to be sorted by SortAlerts action frame of ALA.
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PATIENT,
          PatientAttributes.ALERTS_TO_SORT,
          mockAlerts
        ),
        false
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Rules or preconditions for activating the ReceiveAlerts class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.INCOMING_ALERTS,
  true
);

// Actionframe of the ReceiveAlerts class
const af_ReceiveAlerts = new Actionframe(
  `AF_${ActionFrameIDs.MHA.RECEIVE_ALERTS}`,
  [rule1, rule2],
  new ReceiveAlerts()
);

export default af_ReceiveAlerts;
