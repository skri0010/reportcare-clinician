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
 * Class to represent the activity for requesting display of alerts.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RequestAlertsDisplay extends Communicate {
  /**
   * Constructor for the RequestAlertsDisplay class
   */
  constructor() {
    super(
      ActionFrameIDs.DTA.REQUEST_ALERTS_DISPLAY,
      Performative.REQUEST,
      // Triggers DisplayAlerts action frame of UXSA
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.ALERT_INFOS_RETRIEVED,
        true
      ),
      [AgentIDs.UXSA]
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

// Rules or preconditions for activating the RequestAlertsDisplay class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.DTA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.DTA.RETRIEVE_ALERT_INFOS
);

// Actionframe of the RequestAlertsDisplay class
const af_RequestAlertsDisplay = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_ALERTS_DISPLAY}`,
  [rule1, rule2],
  new RequestAlertsDisplay()
);

export default af_RequestAlertsDisplay;
