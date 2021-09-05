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
 * Class to represent the activity for requesting display of refreshed alerts.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RequestDisplayRefreshedAlerts extends Communicate {
  constructor() {
    super(
      ActionFrameIDs.ALA.REQUEST_DISPLAY_REFRESHED_ALERTS,
      Performative.REQUEST,
      // Triggers DisplayAlerts action frame of UXSA
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.REFRESHED_ALERTS_RETRIEVED,
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
  ProcedureAttributes.AT_CP_III,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.ALA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.ALA.PROCESS_ALERT_NOTIFICATION
);
const rule3 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.REFRESHED_ALERTS_RETRIEVED,
  true
);

// Actionframe
export const af_RequestDisplayRefreshedAlerts = new Actionframe(
  `AF_${ActionFrameIDs.ALA.REQUEST_DISPLAY_REFRESHED_ALERTS}`,
  [rule1, rule2, rule3],
  new RequestDisplayRefreshedAlerts()
);
