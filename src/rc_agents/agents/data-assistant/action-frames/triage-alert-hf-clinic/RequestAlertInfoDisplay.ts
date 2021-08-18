import {
  Actionframe,
  Communicate,
  Agent,
  Belief,
  Precondition
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  ClinicianAttributes,
  CommonAttributes,
  Performative,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";

/**
 * Class to represent the activity for requesting display of information associated with an alert.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RequestAlertInfoDisplay extends Communicate {
  /**
   * Constructor for the RequestAlertInfoDisplay class
   */
  constructor() {
    super(
      ActionFrameIDs.DTA.REQUEST_ALERT_INFO_DISPLAY,
      Performative.REQUEST,
      // Triggers DisplayAlertInfo action frame of UXSA
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.ALERT_INFO_RETRIEVED,
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
  ActionFrameIDs.DTA.RETRIEVE_ALERT_INFO
);

// Actionframe
export const af_RequestAlertInfoDisplay = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_ALERT_INFO_DISPLAY}`,
  [rule1, rule2],
  new RequestAlertInfoDisplay()
);
