import {
  Actionframe,
  Communicate,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
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
 * Class to represent the activity for requesting display of information associated with an alert.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RequestDisplayDetailedAlertInfo extends Communicate {
  constructor() {
    super(
      ActionFrameIDs.DTA.REQUEST_DISPLAY_DETAILED_ALERT_INFO,
      Performative.REQUEST,
      // Triggers DisplayAlertInfo action frame of UXSA
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.DETAILED_ALERT_INFO_RETRIEVED,
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
      await super.doActivity(agent, [rule3]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP_II,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.DTA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.DTA.RETRIEVE_DETAILED_ALERT_INFO
);
const rule3 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.DETAILED_ALERT_INFO_RETRIEVED,
  true
);

// Actionframe
export const af_RequestDisplayDetailedAlertInfo = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_DISPLAY_DETAILED_ALERT_INFO}`,
  [rule1, rule2, rule3],
  new RequestDisplayDetailedAlertInfo()
);
