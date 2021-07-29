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
 * Class to represent the activity for requesting sorting of a new alert.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RequestAlertSort extends Communicate {
  /**
   * Constructor for the RequestAlertSort class
   */
  constructor() {
    super(
      ActionFrameIDs.MHA.REQUEST_ALERT_SORT,
      Performative.REQUEST,
      // Triggers SortAlert action frame of ALA
      new Belief(BeliefKeys.PATIENT, PatientAttributes.NEW_ALERT, true),
      [AgentIDs.ALA]
    );
  }

  /**
   * Perform the activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    try {
      super.doActivity(agent);

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

// Rules or preconditions for activating the RequestAlertSort class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.MHA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.MHA.RECEIVE_ALERT
);

// Actionframe of the RequestAlertSort class
const af_RequestAlertSort = new Actionframe(
  `AF_${ActionFrameIDs.MHA.REQUEST_ALERT_SORT}`,
  [rule1, rule2],
  new RequestAlertSort()
);

export default af_RequestAlertSort;
