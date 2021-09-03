import {
  Actionframe,
  Agent,
  Activity,
  Precondition,
  ResettablePrecondition,
  Belief
} from "agents-framework";
import {
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys,
  setRetryLaterTimeout
} from "rc_agents/clinician_framework";
import { Storage, AsyncStorageKeys } from "rc_agents/storage";
import { agentNWA } from "rc_agents/agents";
import { getAlert, listClinicianPatientMaps } from "aws";
import { store } from "util/useRedux";
import { AlertInfo } from "rc_agents/model";
import { Alert } from "aws/API";
// eslint-disable-next-line no-restricted-imports
import { alertToAlertInfo } from "rc_agents/agents/data-assistant/action-frames/triage-alert-hf-clinic/RetrieveAlerts";
import { RiskLevel } from "models/RiskLevel";
import {
  setPendingAlertCount,
  setPendingAlerts
} from "ic-redux/actions/agents/actionCreator";

/**
 * Class to represent the activity for processing local alert notifications.
 */
class SyncProcessAlertNotifications extends Activity {
  /**
   * Constructor
   */
  constructor() {
    super(ActionFrameIDs.NWA.SYNC_PROCESS_ALERT_NOTIFICATIONS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent, [rule2]);

    try {
      // Get locally stored alert notifications
      const alertNotifications = await Storage.getAlertNotifications();

      // Get locally stored clinicianID
      const clinicianID = await Storage.getClinicianID();

      if (alertNotifications) {
        // Retrieves all patient mappings of clinician
        const patientMappings = await listClinicianPatientMaps({
          clinicianID: clinicianID
        });

        if (
          patientMappings &&
          patientMappings.data.listClinicianPatientMaps?.items
        ) {
          // Maps mappings into array of patientIDs
          const patientIDs =
            patientMappings.data.listClinicianPatientMaps.items.map(
              (mapping) => mapping?.patientID
            );

          // Indicator of whether all alert notifications have been processed
          let processSuccessful = true;

          // Keeps track of alertNotifications that have been processed
          const processedIndices: number[] = [];

          // Stores retrieved alerts
          const retrievedAlerts: Alert[] = [];

          await Promise.all(
            alertNotifications.map(async (notification) => {
              if (patientIDs.includes(notification.patientID)) {
                // Clinician has access to patient: retrieve and sort alert
                const alertQuery = await getAlert({ id: notification.alertID });
                if (alertQuery.data.getAlert) {
                  // Alert retrieved: stores alert into list and pushes the corresponding alert notification index
                  retrievedAlerts.push(alertQuery.data.getAlert);
                  processedIndices.push(
                    alertNotifications.indexOf(notification)
                  );
                } else {
                  // Failed to retrieve alert: update indicator
                  processSuccessful = false;
                }
              }
            })
          );

          if (retrievedAlerts.length > 0) {
            // Converts retrieved alerts to AlertInfo type
            const alertsToDispatch: AlertInfo[] =
              alertToAlertInfo(retrievedAlerts);

            // Stores alerts locally
            await Storage.setMultipleAlerts(alertsToDispatch);

            // Accesses current state
            const currentState = store.getState().agents;

            // Adds on to pending alert count according to alerts' risk levels
            const currentPendingAlertCounts = currentState.pendingAlertCount;
            alertsToDispatch.forEach((alert) => {
              switch (alert.riskLevel) {
                case RiskLevel.HIGH:
                  currentPendingAlertCounts.highRisk += 1;
                  break;
                case RiskLevel.MEDIUM:
                  currentPendingAlertCounts.mediumRisk += 1;
                  break;
                case RiskLevel.LOW:
                  currentPendingAlertCounts.lowRisk += 1;
                  break;
                case RiskLevel.UNASSIGNED:
                  currentPendingAlertCounts.unassignedRisk += 1;
                  break;
                default:
                  break;
              }
            });
            // Dispatch updated alert counts
            store.dispatch(setPendingAlertCount(currentPendingAlertCounts));

            let currentPendingAlerts = currentState.pendingAlerts;
            if (currentPendingAlerts) {
              currentPendingAlerts =
                alertsToDispatch.concat(currentPendingAlerts);
            } else {
              currentPendingAlerts = alertsToDispatch;
            }

            // Dispatch updated list of pending alerts
            store.dispatch(setPendingAlerts(currentPendingAlerts));
          }

          // Remove AsyncStorage entry if all alert notifications are processed
          if (processSuccessful) {
            await Storage.removeItem(AsyncStorageKeys.ALERT_NOTIFICATIONS);
          }

          // Store alert notifications that failed to be updated
          else if (processedIndices.length > 0) {
            await Storage.setAlertNotifications(
              alertNotifications.filter(
                (_, index) => !processedIndices.includes(index)
              )
            );
            setRetryLaterTimeout(() => {
              agentNWA.addBelief(
                new Belief(
                  BeliefKeys.APP,
                  AppAttributes.SYNC_PROCESS_ALERT_NOTIFICATIONS,
                  true
                )
              );
            });
          }
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setRetryLaterTimeout(() => {
        agentNWA.addBelief(
          new Belief(
            BeliefKeys.APP,
            AppAttributes.SYNC_PROCESS_ALERT_NOTIFICATIONS,
            true
          )
        );
      });
    }
  }
}

// Preconditions
const rule1 = new Precondition(BeliefKeys.APP, AppAttributes.ONLINE, true);
const rule2 = new ResettablePrecondition(
  BeliefKeys.APP,
  AppAttributes.SYNC_PROCESS_ALERT_NOTIFICATIONS,
  true
);

// Actionframe
export const af_SyncProcessAlertNotifications = new Actionframe(
  `AF_${ActionFrameIDs.NWA.SYNC_PROCESS_ALERT_NOTIFICATIONS}`,
  [rule1, rule2],
  new SyncProcessAlertNotifications()
);
