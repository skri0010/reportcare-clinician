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
import { store } from "util/useRedux";
import {
  setCompletedAlerts,
  setFetchingCompletedAlerts,
  setFetchingPendingAlerts,
  setPendingAlerts
} from "ic-redux/actions/agents/actionCreator";
import { mapColorCodeToRiskLevel } from "./RetrievePendingAlertCount";

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

      // Dispatch to store to indicate fetching of Alerts
      if (alertStatus === AlertStatus.PENDING) {
        store.dispatch(setFetchingPendingAlerts(true));
      } else {
        store.dispatch(setFetchingCompletedAlerts(true));
      }

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
            const alertsToDispatch: AlertInfo[] = [];
            alerts.map((alert) => {
              const currentAlert: AlertInfo = {
                id: alert.id,
                patientId: alert.patientID,
                patientName: alert.patientName,
                riskLevel: mapColorCodeToRiskLevel(alert.colorCode),
                dateTime: alert.dateTime,
                summary: alert.summary,
                completed: alert.completed === AlertStatus.COMPLETED,
                _version: alert._version
              };

              alertsToDispatch.push(currentAlert);
              return alert;
            });

            // Merges newly retrieved alerts into locally stored alerts
            await Storage.setMultipleAlerts(alertsToDispatch);

            // add to fact for displayAlert to retrieve
            agentAPI.addFact(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.ALERTS,
                alertsToDispatch
              ),
              false
            );
          }
        } else if (alertStatus === AlertStatus.PENDING) {
          // Device is offline Nneed to add get pending
          const alertsToDispatch = await Storage.getPendingAlerts();
          if (alertsToDispatch) {
            store.dispatch(
              setPendingAlerts(sortAlertsByDateTime(alertsToDispatch))
            );
          }
        } else if (alertStatus === AlertStatus.COMPLETED) {
          const alertsToDispatch = await Storage.getCompletedAlerts();
          if (alertsToDispatch) {
            store.dispatch(
              setCompletedAlerts(sortAlertsByDateTime(alertsToDispatch))
            );
          }
        }

        // // Removes alert status and risk level from facts
        // agentAPI.addFact(
        //   new Belief(
        //     BeliefKeys.CLINICIAN,
        //     ClinicianAttributes.ALERT_STATUS,
        //     null
        //   ),
        //   false
        // );
        // agentAPI.addFact(
        //   new Belief(
        //     BeliefKeys.CLINICIAN,
        //     ClinicianAttributes.ALERT_RISK_LEVEL,
        //     null
        //   ),
        //   false
        // );
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
export const sortAlertsByDateTime = (alerts: AlertInfo[]): AlertInfo[] => {
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
