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
import { store } from "util/useRedux";
import {
  setPendingAlerts,
  setCompletedAlerts,
  setFetchingAlerts,
  setPendingAlertCount
} from "ic-redux/actions/agents/actionCreator";
import { AlertInfo, AlertsCount, AlertStatus } from "rc_agents/model";
import { sortAlertInfoByDescendingDateTime } from "util/utilityFunctions";

// LS-TODO: Irrelevant alerts should be filtered out depending on user's role

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

    // OPTIONAL: Get pending AlertInfo[]
    const pendingAlertInfos: AlertInfo[] | null =
      agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[
        ClinicianAttributes.PENDING_ALERTS
      ];

    // OPTIONAL: Get pending alert count
    const pendingAlertsCount: AlertsCount | null =
      agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[
        ClinicianAttributes.PENDING_ALERTS_COUNT
      ];

    // OPTIONAL: Get completed AlertInfo[]
    const completedAlertInfos: AlertInfo[] | null =
      agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[
        ClinicianAttributes.COMPLETED_ALERTS
      ];

    let filteredPendingAlerts: AlertInfo[] = [];
    let filteredCompletedAlerts: AlertInfo[] = [];

    try {
      const { alertRiskFilters } = store.getState().agents;
      let shouldFilter = false;

      // If one of the risk filters is true, we must proceed to filter
      Object.values(alertRiskFilters).forEach((value) => {
        if (value) {
          shouldFilter = true;
        }
      });

      // Pending AlertInfo[] exist
      if (pendingAlertInfos) {
        filteredPendingAlerts =
          sortAlertInfoByDescendingDateTime(pendingAlertInfos);

        if (shouldFilter) {
          // Filter pending alerts
          filteredPendingAlerts = pendingAlertInfos.filter(
            (alert) =>
              alertRiskFilters[alert.riskLevel] &&
              alert.pending === AlertStatus.PENDING
          );
        }

        // Dispatch pending alerts to store
        store.dispatch(setPendingAlerts(filteredPendingAlerts));
      }

      // Pending alerts count exist
      if (pendingAlertsCount) {
        // Dispatch pending alerts count to store
        store.dispatch(setPendingAlertCount(pendingAlertsCount));
      }

      // Completed AlertInfo[] exist
      if (completedAlertInfos) {
        filteredCompletedAlerts =
          sortAlertInfoByDescendingDateTime(completedAlertInfos);

        if (shouldFilter) {
          // Filter completed alerts
          filteredCompletedAlerts = completedAlertInfos.filter(
            (alert) =>
              alertRiskFilters[alert.riskLevel] &&
              alert.completed === AlertStatus.COMPLETED
          );
        }

        // Dispatch completed alerts to store
        store.dispatch(setCompletedAlerts(filteredCompletedAlerts));
      }

      // Dispatch to store to indicate fetching has ended
      store.dispatch(setFetchingAlerts(false));

      // Update Facts
      // Remove item
      agentAPI.addFact(
        new Belief(
          BeliefKeys.CLINICIAN,
          ClinicianAttributes.PENDING_ALERTS,
          null
        ),
        false
      );
      agentAPI.addFact(
        new Belief(
          BeliefKeys.CLINICIAN,
          ClinicianAttributes.COMPLETED_ALERTS,
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
        ProcedureAttributes.AT_CP_I,
        ProcedureConst.INACTIVE
      )
    );
  }
}

// Preconditions
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

// Actionframe
export const af_DisplayAlerts = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_ALERTS}`,
  [rule1, rule2],
  new DisplayAlerts()
);
