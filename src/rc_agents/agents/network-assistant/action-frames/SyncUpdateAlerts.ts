import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import {
  setRetryLaterTimeout,
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys
} from "rc_agents/clinician_framework";
import { AsyncStorageKeys, Storage } from "rc_agents/storage";
import { agentNWA } from "rc_agents/agents";
import { setAlertsSync } from "rc_agents/storage/setItem";
import { updateAlertInfo } from "rc_agents/agents/data-assistant/action-frames/triage-alert-hf-clinic/UpdateAlert";

// LS-TODO: To be tested once integrated with Alert.

/**
 * Class to represent the activity for syncing local update of Alerts.
 */
class SyncUpdateAlerts extends Activity {
  /**
   * Constructor
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
      const alerts = await Storage.getAlertInfosSync();

      if (alerts && clinicianId) {
        // Indicator of whether all pending updates have been synced
        const successfulIds: string[] = [];

        const promises = await Promise.all(
          Object.values(alerts).map(async (alert) => {
            return updateAlertInfo(alert);
          })
        );

        promises.forEach((item) => {
          if (item.successful) {
            successfulIds.push(item.alertInfo.id);
          }
        });

        // Removes entry if all alerts are synced
        if (successfulIds.length === Object.values(alerts).length) {
          await Storage.removeItem(AsyncStorageKeys.ALERTS_SYNC);
        } else {
          // Removes successfully synced alerts
          successfulIds.forEach((id) => {
            const index = alerts.findIndex((alert) => alert.id === id);
            if (index >= 0) {
              delete alerts[index];
            }
          });

          // Store locally
          await setAlertsSync(alerts);

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
export const af_SyncUpdateAlerts = new Actionframe(
  `AF_${ActionFrameIDs.NWA.SYNC_UPDATE_ALERTS}`,
  [rule1, rule2],
  new SyncUpdateAlerts()
);
