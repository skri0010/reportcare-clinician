import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  setRetryLaterTimeout,
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys
} from "rc_agents/clinician_framework";
import { AsyncStorageKeys, Storage } from "rc_agents/storage";
import { getAlert } from "aws/TypedAPI/getQueries";
import { updateAlert } from "aws";
import { Alert, UpdateAlertInput } from "aws/API";
import { agentNWA } from "rc_agents/agents";
import { AlertInfo, AlertStatus } from "rc_agents/model";

// LS-TODO: To be tested once integrated with Alert.

/**
 * Class to represent the activity for syncing local update of Alerts.
 */
class SyncUpdateAlerts extends Activity {
  /**
   * Constructor for the SyncUpdateAlerts class
   */
  constructor() {
    super(ActionFrameIDs.NWA.SYNC_UPDATE_ALERTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent, [rule2]);

    try {
      // Gets locally stored clinicianId
      const clinicianId = await Storage.getClinicianID();

      // Gets alerts to be synced
      const alerts = await Storage.getAlertsSync();

      if (alerts && clinicianId) {
        // Indicator of whether all pending updates have been synced
        const successfulIds: string[] = [];

        await Promise.all(
          Object.values(alerts).map(async (alert) => {
            // Queries current alert
            const alertQuery = await getAlert({ id: alert.id });
            if (alertQuery.data.getAlert) {
              let alertToStore: Alert | AlertInfo | undefined;

              const latestAlert = alertQuery.data.getAlert;

              // Latest Alert has higher version than local alert
              if (latestAlert._version > alert._version) {
                // Replace local alert and alert info with information from latest alert
                alertToStore = latestAlert;
              } else {
                // This alert will be used for local merging later on
                latestAlert.pending = null;
                latestAlert.completed = AlertStatus.COMPLETED;

                // Constructs alert object to be updated
                const alertToUpdate: UpdateAlertInput = {
                  id: latestAlert.id,
                  completed: latestAlert.completed,
                  pending: latestAlert.pending,
                  _version: latestAlert._version
                };
                const updateResponse = await updateAlert(alertToUpdate);

                // Updates to indicate that alert is successfully updated
                if (updateResponse.data.updateAlert) {
                  latestAlert._version =
                    updateResponse.data.updateAlert._version;
                } else {
                  successfulIds.push(alert.id);
                }

                // Updates locally stored alert and alert info
                // Input is of type Alert
                alertToStore = latestAlert;
              }

              if (alertToStore) {
                await Storage.mergeAlert(alertToStore);
                await Storage.mergeAlertInfo(alertToStore);
              }
            }
          })
        );

        // Removes entry if all alerts are synced
        if (successfulIds.length === Object.values(alerts).length) {
          await Storage.removeItem(AsyncStorageKeys.ALERTS_SYNC);
        } else {
          // Removes successfully synced alerts
          await Promise.all(
            successfulIds.map((id) => {
              delete alerts[id];
              return id;
            })
          );

          setRetryLaterTimeout(() => {
            agentNWA.addBelief(
              new Belief(BeliefKeys.APP, AppAttributes.SYNC_UPDATE_ALERTS, true)
            );
          });
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setRetryLaterTimeout(() => {
        agentNWA.addBelief(
          new Belief(BeliefKeys.APP, AppAttributes.SYNC_UPDATE_ALERTS, true)
        );
      });
    }
  }
}

// Preconditions
const rule1 = new Precondition(BeliefKeys.APP, AppAttributes.ONLINE, true);
const rule2 = new ResettablePrecondition(
  BeliefKeys.APP,
  AppAttributes.SYNC_UPDATE_ALERTS,
  true
);

// Actionframe
const af_SyncUpdateAlerts = new Actionframe(
  `AF_${ActionFrameIDs.NWA.SYNC_UPDATE_ALERTS}`,
  [rule1, rule2],
  new SyncUpdateAlerts()
);

export default af_SyncUpdateAlerts;
