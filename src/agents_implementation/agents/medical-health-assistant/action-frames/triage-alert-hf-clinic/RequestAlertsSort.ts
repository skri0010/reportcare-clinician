import {
  Actionframe,
  Communicate,
  Agent,
  Belief,
  Precondition
} from "agents_implementation/agent_framework";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  ClinicianAttributes,
  CommonAttributes,
  Performative,
  ProcedureAttributes,
  ProcedureConst
} from "agents_implementation/agent_framework/AgentEnums";

// LS-TODO: To be revised.
// NOTE: This file is currently unused.

/**
 * Class to represent the activity for requesting sorting of alerts.
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
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.SORT_ALERTS, true),
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
  ActionFrameIDs.MHA.RETRIEVE_ALERTS
);

// Actionframe of the RequestAlertsSort class
const af_RequestAlertsSort = new Actionframe(
  `AF_${ActionFrameIDs.MHA.REQUEST_ALERTS_SORT}`,
  [rule1, rule2],
  new RequestAlertsSort()
);

export default af_RequestAlertsSort;
