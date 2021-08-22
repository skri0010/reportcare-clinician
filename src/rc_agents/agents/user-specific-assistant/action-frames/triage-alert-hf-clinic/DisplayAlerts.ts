import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import agentAPI from "rc_agents/framework/AgentAPI";
import { store } from "util/useRedux";
import {
  setPendingAlerts,
  setCompletedAlerts,
  setFetchingPendingAlerts,
  setFetchingCompletedAlerts
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
    try {
      if (alerts) {
        // LS-TODO: Irrelevant alerts should be filtered out depending on user's role

        // Dispatch alerts to front end for display
        const filteredAlerts: AlertInfo[] = [];
        const { alertRiskFilters } = store.getState().agents;
        let shouldFilter = false;

        // If one of the risk filters is true, we must proceed to filter
        Object.values(alertRiskFilters).forEach((value) => {
          if (value) {
            shouldFilter = true;
          }
        });

        // Filter patients if needed
        if (shouldFilter && alertStatus === AlertStatus.PENDING) {
          // case where needs filtering and getting pending
          alerts.forEach((alert) => {
            // We can assert RiskLevel in this condition
            if (
              alertRiskFilters[alert.riskLevel as RiskLevel] &&
              alert.completed === false
            ) {
              filteredAlerts.push(alert);
            }
          });
        } else if (shouldFilter && alertStatus === AlertStatus.COMPLETED) {
          // case where needs filtering and getting completed
          alerts.forEach((alert) => {
            // We can assert RiskLevel in this condition
            if (
              alertRiskFilters[alert.riskLevel as RiskLevel] &&
              alert.completed === true
            ) {
              filteredAlerts.push(alert);
            }
          });
        } else if (alertStatus === AlertStatus.PENDING) {
          // case where no filtering is needed and pending required
          alerts.forEach((alert) => {
            // We can assert RiskLevel in this condition
            if (alert.completed === false) {
              filteredAlerts.push(alert);
            }
          });
        } else if (alertStatus === AlertStatus.COMPLETED) {
          // case where no filtering is needed and completing requried
          alerts.forEach((alert) => {
            // We can assert RiskLevel in this condition
            if (alert.completed === true) {
              filteredAlerts.push(alert);
            }
          });
        }

        // Dispatch filtered list based on status
        if (alertStatus === AlertStatus.PENDING) {
          store.dispatch(setPendingAlerts(filteredAlerts));
        } else {
          store.dispatch(setCompletedAlerts(filteredAlerts));
        }

        // Removes alert info from facts
        agentAPI.addFact(
          new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ALERTS, null),
          false
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Stops the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.AT_CP,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );

    // Dispatch to indicate process has ended
    if (alertStatus === AlertStatus.PENDING) {
      store.dispatch(setFetchingPendingAlerts(false));
    } else {
      store.dispatch(setFetchingCompletedAlerts(false));
    }
  }
}

// Preconditions for activating the DisplayAlerts class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
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
