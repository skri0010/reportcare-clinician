import {
  Actionframe,
  Communicate,
  Agent,
  Belief,
  Precondition
} from "rc-agents/framework";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  ClinicianAttributes,
  CommonAttributes,
  Performative,
  ProcedureAttributes,
  ProcedureConst
} from "rc-agents/framework/AgentEnums";

// LS-TODO: This is previously an action frame for ALA with condition LastActivity = SortAlerts.

/**
 * Class to represent the activity for requesting patient's information associated with alerts.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RequestAlertInfos extends Communicate {
  /**
   * Constructor for the RequestAlertInfos class
   */
  constructor() {
    super(
      ActionFrameIDs.MHA.REQUEST_ALERT_INFOS,
      Performative.REQUEST,
      // Triggers RetrieveAlertInfos action frame of DTA
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ALERTS_SORTED, true),
      [AgentIDs.DTA]
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

// Rules or preconditions for activating the RequestAlertInfos class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.MHA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.MHA.RETRIEVE_ALERTS
);

// Actionframe of the RequestAlertInfos class
const af_RequestAlertInfos = new Actionframe(
  `AF_${ActionFrameIDs.MHA.REQUEST_ALERT_INFOS}`,
  [rule1, rule2],
  new RequestAlertInfos()
);

export default af_RequestAlertInfos;
