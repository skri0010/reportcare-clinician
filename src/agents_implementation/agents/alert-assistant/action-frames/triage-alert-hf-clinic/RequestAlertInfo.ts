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
 * Class to represent the activity for requesting patient's information associated with an alert.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RequestAlertInfo extends Communicate {
  /**
   * Constructor for the RequestAlertInfo class
   */
  constructor() {
    super(
      ActionFrameIDs.ALA.REQUEST_ALERT_INFO,
      Performative.REQUEST,
      // Triggers RetrieveAlertInfo action frame of DTA
      new Belief(BeliefKeys.PATIENT, PatientAttributes.ALERT_SORTED, true),
      [AgentIDs.DTA]
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

// Rules or preconditions for activating the RequestAlertInfo class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.ALA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.ALA.SORT_ALERT
);

// Actionframe of the RequestAlertInfo class
const af_RequestAlertInfo = new Actionframe(
  `AF_${ActionFrameIDs.ALA.REQUEST_ALERT_INFO}`,
  [rule1, rule2],
  new RequestAlertInfo()
);

export default af_RequestAlertInfo;
