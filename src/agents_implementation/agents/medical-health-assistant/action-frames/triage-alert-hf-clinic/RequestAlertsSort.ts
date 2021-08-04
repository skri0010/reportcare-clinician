import Actionframe from "../../../../agent_framework/base/Actionframe";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Communicate from "../../../../agent_framework/base/Communicate";
import Precondition from "../../../../agent_framework/base/Precondition";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  CommonAttributes,
  PatientAttributes,
  Performative,
  ProcedureAttributes,
  ProcedureConst
} from "../../../../agent_framework/AgentEnums";

/**
 * Class to represent the activity for requesting sorting of new alerts.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RequestAlertsSort extends Communicate {
  /**
   * Constructor for the RequestAlertsSort class
   */
  constructor() {
    super(
      ActionFrameIDs.MHA.REQUEST_ALERTS_SORT,
      Performative.REQUEST,
      // Triggers SortAlerts action frame of ALA
      new Belief(BeliefKeys.PATIENT, PatientAttributes.NEW_ALERTS, true),
      [AgentIDs.ALA]
    );
  }

  /**
   * Perform the activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    try {
      await super.doActivity(agent);

      // Update Beliefs
      agent.addBelief(
        new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Rules or preconditions for activating the RequestAlertsSort class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.MHA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.MHA.RECEIVE_ALERTS
);

// Actionframe of the RequestAlertsSort class
const af_RequestAlertsSort = new Actionframe(
  `AF_${ActionFrameIDs.MHA.REQUEST_ALERTS_SORT}`,
  [rule1, rule2],
  new RequestAlertsSort()
);

export default af_RequestAlertsSort;
