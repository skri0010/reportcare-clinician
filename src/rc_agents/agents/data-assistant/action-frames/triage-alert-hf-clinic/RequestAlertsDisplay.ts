import {
  Actionframe,
  Communicate,
  Agent,
  Belief,
  Precondition
} from "agents-framework";
import {
  ProcedureConst,
  Performative,
  CommonAttributes
} from "agents-framework/Enums";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";

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
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.ALERTS_RETRIEVED,
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
      await super.doActivity(agent);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.DTA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.DTA.RETRIEVE_ALERTS
);

// Actionframe
export const af_RequestAlertsDisplay = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_ALERTS_DISPLAY}`,
  [rule1, rule2],
  new RequestAlertsDisplay()
);
