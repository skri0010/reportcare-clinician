import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  ActionFrameIDs,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { AlertInfo, AlertsCount } from "rc_agents/model";
import { displayAlerts } from "rc_agents/agents/user-specific-assistant/action-frames/triage-alert-hf-clinic/DisplayAlerts";
import { getAlertsCount } from "rc_agents/agents/data-assistant/action-frames/triage-alert-hf-clinic/RetrieveAlerts";

/**
 * Class to represent an activity for triggering the display of refreshed alerts.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class DisplayRefreshedAlerts extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_REFRESHED_ALERTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    // OPTIONAL: Get pending refreshed AlertInfo[]
    const pendingAlertInfos: AlertInfo[] | null =
      agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[
        ClinicianAttributes.REFRESHED_PENDING_ALERTS
      ];

    // OPTIONAL: Get completed AlertInfo[]
    const completedAlertInfos: AlertInfo[] | null =
      agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[
        ClinicianAttributes.REFRESHED_COMPLETED_ALERTS
      ];

    try {
      // Sort
      let pendingAlertsCount: AlertsCount | null = null;
      if (pendingAlertInfos) {
        pendingAlertsCount = getAlertsCount(pendingAlertInfos);
      }

      // Display alerts
      displayAlerts({
        pendingAlertInfos: pendingAlertInfos,
        pendingAlertsCount: pendingAlertsCount,
        completedAlertInfos: completedAlertInfos
      });

      // Update Facts
      // Remove item
      agentAPI.addFact(
        new Belief(
          BeliefKeys.CLINICIAN,
          ClinicianAttributes.REFRESHED_PENDING_ALERTS,
          null
        ),
        false
      );
      agentAPI.addFact(
        new Belief(
          BeliefKeys.CLINICIAN,
          ClinicianAttributes.REFRESHED_COMPLETED_ALERTS,
          null
        ),
        false
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // End the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.AT_CP_III,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP_III,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.REFRESHED_ALERTS_RETRIEVED,
  true
);

// Actionframe
export const af_DisplayRefreshedAlerts = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_REFRESHED_ALERTS}`,
  [rule1, rule2],
  new DisplayRefreshedAlerts()
);
