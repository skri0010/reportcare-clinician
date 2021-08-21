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
  AppAttributes,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import { Storage } from "rc_agents/storage";
import agentAPI from "rc_agents/framework/AgentAPI";
import { listCompletedRiskAlerts, listPendingAlertsByDateTime } from "aws";
import { AlertInfo, AlertStatus } from "rc_agents/model";
import { Alert, ModelSortDirection } from "aws/API";

// LS-TODO: To be tested with actual Alerts.
// NOTE: This is originally MHA's action frame.

/**
 * Class to represent the activity for retrieving alerts.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RetrieveAlerts extends Activity {
  /**
   * Constructor for the RetrieveAlerts class
   */
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_ALERTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    try {
      const facts = agentAPI.getFacts();

      // Gets alert status and risk level from facts
      const alertStatus: AlertStatus =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.ALERT_STATUS];

      if (alertStatus) {
        if (facts[BeliefKeys.APP][AppAttributes.ONLINE]) {
          // Device is online
          let alerts: Alert[] | undefined;
          // Pending alerts
          // Changed to get all alert sorted by date time
          if (alertStatus === AlertStatus.PENDING) {
            const query = await listPendingAlertsByDateTime({
              pending: AlertStatus.PENDING,
              sortDirection: ModelSortDirection.DESC
            });
            if (query.data && query.data.listPendingAlertsByDateTime) {
              const result = query.data.listPendingAlertsByDateTime.items;
              if (result && result.length > 0) {
                alerts = result as Alert[];
              }
            }
          }
          // Completed alerts
          else if (alertStatus === AlertStatus.COMPLETED) {
            const query = await listCompletedRiskAlerts({
              completed: AlertStatus.COMPLETED
            });
            if (query.data && query.data.listCompletedRiskAlerts) {
              const result = query.data.listCompletedRiskAlerts.items;
              if (result && result.length > 0) {
                alerts = result as Alert[];
              }
            }
          }

          if (alerts) {
            // LS-TODO: Previously using Alerts_To_Sort key to be sorted by SortAlerts of ALA first
            // Broadcast alert to facts to be used by RetrieveAlertInfos action frame of DTA.
            // Can be removed if there is a similar function for getting completed alerts by dateTime
            const sortedAlerts = sortAlertsByDateTime(alerts);

            agentAPI.addFact(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.ALERTS,
                sortedAlerts
              ),
              false
            );

            // Merges newly retrieved alerts into locally stored alerts
            await Storage.setMultipleAlerts(alerts);
          }
        } else {
          // Device is offline
          const localRiskAlerts = await Storage.getRiskOrStatusAlerts(
            // probably can be removed
            undefined,
            alertStatus
          );
          if (localRiskAlerts) {
            const sortedAlerts = sortAlertsByDateTime(localRiskAlerts);
            // this triggers requestAlertsDisplay most likely
            agentAPI.addFact(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.ALERTS,
                sortedAlerts
              ),
              false
            );
          }
        }

        // Removes alert status and risk level from facts
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.ALERT_STATUS,
            null
          ),
          false
        );
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.ALERT_RISK_LEVEL,
            null
          ),
          false
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

/**
 * Sorts alerts / alert infos in descending order of datetime.
 * @param alerts List of alerts / alert infos to be sorted
 * @returns list of sorted alerts / alert infos
 */
export const sortAlertsByDateTime = (
  alerts: Alert[] | AlertInfo[]
): Alert[] | AlertInfo[] => {
  return alerts.sort((a, b) => {
    const date1 = new Date(a.dateTime);
    const date2 = new Date(b.dateTime);
    return date2.getTime() - date1.getTime();
  });
};

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_ALERTS,
  true
);

// Actionframe
export const af_RetrieveAlerts = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_ALERTS}`,
  [rule1, rule2],
  new RetrieveAlerts()
);
