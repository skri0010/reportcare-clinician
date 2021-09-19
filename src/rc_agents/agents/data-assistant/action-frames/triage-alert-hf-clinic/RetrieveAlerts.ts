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
  AppAttributes,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { LocalStorage } from "rc_agents/storage";
import { listCompletedRiskAlerts, listPendingRiskAlerts } from "aws";
import { AlertInfo, AlertStatus } from "rc_agents/model";
import { Alert } from "aws/API";
import { store } from "util/useRedux";
import {
  setFetchingAlerts,
  setFetchingCompletedAlerts,
  setFetchingPendingAlerts
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
      } else if (alertStatus === AlertStatus.COMPLETED) {
        store.dispatch(setFetchingCompletedAlerts(true));
      } else if (alertStatus === AlertStatus.ALL) {
        store.dispatch(setFetchingAlerts(true));
      }

      if (alertStatus) {
        if (facts[BeliefKeys.APP][AppAttributes.ONLINE]) {
          // Device is online
          let alerts: Alert[] | undefined;
          let additionalAlerts: Alert[] | undefined;

          if (
            alertStatus === AlertStatus.PENDING ||
            alertStatus === AlertStatus.COMPLETED
          ) {
            // retrieve alerts by status
            alerts = await getAlertsByStatus(alertStatus);
          } else {
            // case when all alert is required
            // both pending and completed alerts must be concatenated
            // default for each is empty list [] if undefined
            alerts = (await getAlertsByStatus(AlertStatus.PENDING)) || [];
            additionalAlerts =
              (await getAlertsByStatus(AlertStatus.COMPLETED)) || [];
            alerts = alerts.concat(additionalAlerts);
          }

          // Convert Alert[] to AlertInfo[]
          const alertsToDispatch = alertToAlertInfo(alerts);

          if (alerts) {
            // Merges newly retrieved alerts into locally stored alerts
            await LocalStorage.setMultipleAlerts(alertsToDispatch);

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
        } else {
          // Device is offline need to add get pending
          await dispatchFromMemory(AlertStatus.ALL);
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

/**
 * Gets locally stored alerts, pending or completed, and dispatch to redux
 * @param alertStatus status of alerts, pending or completed
 */
export const dispatchFromMemory = async (
  alertStatus: AlertStatus
): Promise<void> => {
  let alertsToDispatch: AlertInfo[] | null = null;

  if (alertStatus === AlertStatus.PENDING) {
    alertsToDispatch = await LocalStorage.getPendingAlerts();
  } else if (alertStatus === AlertStatus.COMPLETED) {
    alertsToDispatch = await LocalStorage.getCompletedAlerts();
  } else if (alertStatus === AlertStatus.ALL) {
    alertsToDispatch = await LocalStorage.getAlerts();
  }
  if (alertsToDispatch) {
    agentAPI.addFact(
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.ALERTS,
        alertsToDispatch
      ),
      false
    );
  }
};

/**
 * Convert lit of Alerts to AlertInfo
 * @param alerts list of alerts
 * @returns list of alert Infos
 */
export const alertToAlertInfo = (alerts: Alert[] | undefined): AlertInfo[] => {
  const alertsToDispatch: AlertInfo[] = [];
  if (alerts) {
    alerts.map((alert) => {
      const currentAlert: AlertInfo = {
        id: alert.id,
        patientID: alert.patientID,
        patientName: alert.patientName,
        vitalsReportID: alert.vitalsReportID,
        symptomReportID: alert.symptomReportID,
        riskLevel: mapColorCodeToRiskLevel(alert.colorCode),
        dateTime: alert.dateTime,
        summary: alert.summary,
        completed: alert.completed === AlertStatus.COMPLETED,
        _version: alert._version
      };

      alertsToDispatch.push(currentAlert);
      return null;
    });
  }
  return alertsToDispatch;
};

/**
 * Gets list of alerts by status
 * @param alertStatus status of alert, Pending or Completed
 * @returns list of Alerts if found
 */
export const getAlertsByStatus = async (
  alertStatus: AlertStatus
): Promise<Alert[] | undefined> => {
  let alerts: Alert[] | undefined;

  if (alertStatus === AlertStatus.PENDING) {
    const query = await listPendingRiskAlerts({
      pending: AlertStatus.PENDING
    });
    if (query.data && query.data.listPendingRiskAlerts) {
      const result = query.data.listPendingRiskAlerts.items;
      if (result && result.length > 0) {
        alerts = result as Alert[];
      }
    }
  } else {
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
  return alerts;
};

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
  ProcedureAttributes.AT_CP_I,
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
