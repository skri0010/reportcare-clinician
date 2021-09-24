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
import { getDetailedAlert, listClinicianPatientMaps } from "aws";
import { AlertInfo, FetchAlertsMode } from "rc_agents/model";
import { convertAlertToAlertInfo } from "util/utilityFunctions";
import { replaceAlertNotifications } from "rc_agents/storage/setItem";
import { AgentTrigger } from "rc_agents/trigger";

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
      let alertNotifications = await Storage.getAlertNotifications();

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
            patientMappings.data.listClinicianPatientMaps.items.flatMap(
              (item) => (item ? [item.patientID] : [])
            );

          // Filter alert notifications that the clinician has no access to
          alertNotifications = alertNotifications.flatMap((notification) =>
            patientIDs.includes(notification.patientID) ? [notification] : []
          );

          // Indicator of whether alert notifications have been synced (alerts have been retrieved)
          const successfulIds: string[] = [];

          // Alerts that will be stored
          const retrievedAlerts: AlertInfo[] = [];

          // Get new alerts
          const promises = await Promise.all(
            alertNotifications.map(async (notification) => {
              try {
                // Retrieve alert
                return getDetailedAlert({
                  id: notification.alertID
                });
              } catch (error) {
                // eslint-disable-next-line no-console
                console.log(error);
              }
            })
          );

          // Collect retrieved alerts and successful ids
          for (let i = 0; i < promises.length; i++) {
            const index = i;
            const item = promises[index];
            if (item?.data.getAlert) {
              const alertInfo = convertAlertToAlertInfo(item.data.getAlert);
              retrievedAlerts.push(alertInfo);
              successfulIds.push(alertInfo.id);
            }
          }

          // Remove notifications based on indices
          if (successfulIds.length === alertNotifications.length) {
            await Storage.removeItem(AsyncStorageKeys.ALERT_NOTIFICATIONS);
          } else {
            // Removes successfully sync alert notifications (retrieved alerts)
            successfulIds.forEach((id) => {
              if (alertNotifications) {
                const index = alertNotifications.findIndex(
                  (notification) => notification.id === id
                );
                if (index >= 0) {
                  delete alertNotifications[index];
                }
              }
            });

            // Store locally
            await replaceAlertNotifications(alertNotifications);

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

          // Store retrieved alerts
          await Storage.setAlertInfos(retrievedAlerts);

          if (successfulIds.length > 0) {
            // Trigger procedure to retrieve alerts locally
            AgentTrigger.triggerRetrieveAlerts(FetchAlertsMode.ALL, true);
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
