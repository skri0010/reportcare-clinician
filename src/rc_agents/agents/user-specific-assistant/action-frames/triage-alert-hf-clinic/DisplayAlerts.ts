import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import { ProcedureConst } from "rc_agents/framework/Enums";
import agentAPI from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  ActionFrameIDs,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { store } from "util/useRedux";
import {
  setPendingAlerts,
  setCompletedAlerts,
  setFetchingPendingAlerts,
  setFetchingCompletedAlerts,
  setFetchingAlerts
} from "ic-redux/actions/agents/actionCreator";
import { AlertInfo, AlertStatus } from "rc_agents/model";
import { RiskLevel } from "models/RiskLevel";

/**
 * Class to represent an activity for triggering the display of alerts.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class DisplayAlerts extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_ALERTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);
    // Get list of alerts that was retrieved
    const alerts: AlertInfo[] =
      agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.ALERTS];

    // Gets alert status and risk level from facts
    const alertStatus: AlertStatus =
      agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[
        ClinicianAttributes.ALERT_STATUS
      ];
    const filteredPendingAlerts: AlertInfo[] = [];
    const filteredCompletedAlerts: AlertInfo[] = [];

    try {
      // Case where alerts are retrieved
      if (alerts) {
        // LS-TODO: Irrelevant alerts should be filtered out depending on user's role

        const { alertRiskFilters } = store.getState().agents;
        let shouldFilter = false;

        // If one of the risk filters is true, we must proceed to filter
        Object.values(alertRiskFilters).forEach((value) => {
          if (value) {
            shouldFilter = true;
          }
        });

        // Filter patients if needed
        if (shouldFilter) {
          // case where needs filtering
          alerts.forEach((alert) => {
            // We can assert RiskLevel in this condition
            if (
              alertRiskFilters[alert.riskLevel as RiskLevel] &&
              alert.completed === false
            ) {
              filteredPendingAlerts.push(alert);
            } else if (
              alertRiskFilters[alert.riskLevel as RiskLevel] &&
              alert.completed === true
            ) {
              filteredCompletedAlerts.push(alert);
            }
          });
        } else {
          // case where no filter is required
          alerts.forEach((alert) => {
            if (alert.completed === true) {
              filteredCompletedAlerts.push(alert);
            } else if (alert.completed === false) {
              filteredPendingAlerts.push(alert);
            }
          });
        }

        // Removes alert info from facts
        agentAPI.addFact(
          new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ALERTS, null),
          false
        );
        // Remove alert status from fact
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.ALERT_STATUS,
            null
          ),
          false
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Dispatch filtered list based on status
    if (alertStatus === AlertStatus.PENDING) {
      store.dispatch(setPendingAlerts(filteredPendingAlerts));
      // Dispatch to indicate process has ended
      store.dispatch(setFetchingPendingAlerts(false));
    } else if (alertStatus === AlertStatus.COMPLETED) {
      store.dispatch(setCompletedAlerts(filteredCompletedAlerts));
      // Dispatch to indicate process has ended
      store.dispatch(setFetchingCompletedAlerts(false));
    } else if (alertStatus === AlertStatus.ALL) {
      store.dispatch(setPendingAlerts(filteredPendingAlerts));
      store.dispatch(setCompletedAlerts(filteredCompletedAlerts));
      store.dispatch(setFetchingAlerts(false));
    }

    // Stops the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.AT_CP_I,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );
  }
}

// Preconditions for activating the DisplayAlerts class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP_I,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.ALERTS_RETRIEVED,
  true
);

// Action Frame for DisplayAlerts class
export const af_DisplayAlerts = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_ALERTS}`,
  [rule1, rule2],
  new DisplayAlerts()
);
