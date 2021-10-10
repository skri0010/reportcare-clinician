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
import { LocalStorage, AsyncStorageKeys } from "rc_agents/storage";
import { agentNWA } from "rc_agents/agents";
// eslint-disable-next-line no-restricted-imports
import { updatePatientBaseline } from "rc_agents/agents/data-assistant/action-frames/medical-record-device-configuration/StoreBaseline";

/**
 * Represents the activity for syncing local configurations of patient baseline data.
 */
class SyncPatientBaselines extends Activity {
  constructor() {
    super(ActionFrameIDs.NWA.SYNC_PATIENT_BASELINES);
  }

  /**
   * Performs the activity
   * @param {Agent} agent current agent
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent, [rule2]);

    try {
      // Get locally stored baselines
      const baselines = await LocalStorage.getPatientBaselines();

      if (baselines) {
        // Indicator of whether all patient baselines have been synced
        let configurationsSuccessful = true;
        // Keeps track of updates that have succeeded
        const succeedIndices: number[] = [];

        await Promise.all(
          baselines.map(async (baseline) => {
            try {
              // Updates patient info using baseline
              const updateSuccessful = await updatePatientBaseline(baseline);
              if (updateSuccessful) {
                // Pushes index of succeeded update into the list
                succeedIndices.push(baselines.indexOf(baseline));
              } else {
                configurationsSuccessful = false;
              }
            } catch (error) {
              // eslint-disable-next-line no-console
              console.log(error);
            }
            return baseline;
          })
        );

        // Remove AsyncStorage entry if all baselines are updated
        if (configurationsSuccessful) {
          await LocalStorage.removeItem(AsyncStorageKeys.PATIENT_BASELINES);
        }
        // Store configurations that failed to be updated
        else if (succeedIndices.length > 0) {
          await LocalStorage.setPatientBaselines(
            baselines.filter((_, index) => !succeedIndices.includes(index))
          );
          setRetryLaterTimeout(() => {
            agentNWA.addBelief(
              new Belief(
                BeliefKeys.APP,
                AppAttributes.SYNC_PATIENT_BASELINES,
                true
              )
            );
          });
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions
const rule1 = new Precondition(BeliefKeys.APP, AppAttributes.ONLINE, true);
const rule2 = new ResettablePrecondition(
  BeliefKeys.APP,
  AppAttributes.SYNC_PATIENT_BASELINES,
  true
);

// Actionframe
export const af_SyncPatientBaselines = new Actionframe(
  `AF_${ActionFrameIDs.NWA.SYNC_PATIENT_BASELINES}`,
  [rule1, rule2],
  new SyncPatientBaselines()
);
