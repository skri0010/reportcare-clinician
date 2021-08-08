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
 * Class to represent the activity for requesting display of pending alert count.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RequestPendingAlertCountDisplay extends Communicate {
  /**
   * Constructor for the RequestPendingAlertCountDisplay class
   */
  constructor() {
    super(
      ActionFrameIDs.DTA.REQUEST_PENDING_ALERT_COUNT_DISPLAY,
      Performative.REQUEST,
      // Triggers DisplayPendingAlertCount action frame of UXSA
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.PENDING_ALERT_COUNT_RETRIEVED,
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

// Rules or preconditions for activating the RequestPendingAlertCountDisplay class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.DTA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.DTA.RETRIEVE_PENDING_ALERT_COUNT
);

// Actionframe of the RequestPendingAlertCountDisplay class
export const af_RequestPendingAlertCountDisplay = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_PENDING_ALERT_COUNT_DISPLAY}`,
  [rule1, rule2],
  new RequestPendingAlertCountDisplay()
);
