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
import {
  createMedicationConfiguration,
  updatePatientBaseline
} from "rc_agents/agents/data-assistant/action-frames/medical-record-device-configuration/StoreBaseline";

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

      // Get locally stored medication configurations
      const medConfigurations =
        await LocalStorage.getPatientMedicationConfigurations();

      if (baselines && medConfigurations) {
        // Indicator of whether all patient configurations have been synced
        let configurationsSuccessful = true;
        let medConfigurationSuccessful = true;

        // Keeps track of configuration updates that have succeeded
        const succeedIndices: number[] = [];
        // Keeps track of the medication configuration updates that have failed
        const failedSyncMedInfo: number[] = [];

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

        // Create med info for each med config and add them into DB
        const syncedMedConfig = await Promise.all(
          medConfigurations.map(async (medConfiguration) => {
            try {
              const medInfoResponse =
                createMedicationConfiguration(medConfiguration);
              return medInfoResponse;
            } catch (error) {
              // eslint-disable-next-line no-console
              console.log(error);
            }
          })
        );

        // Get the index of the med configs that have failed syncing
        syncedMedConfig.forEach((medConfig) => {
          if (!medConfig) {
            failedSyncMedInfo.push(syncedMedConfig.indexOf(medConfig));
            medConfigurationSuccessful = false;
          }
        });

        // Remove AsyncStorage entry if all configurations and medication configurations are updated
        if (configurationsSuccessful && medConfigurationSuccessful) {
          await LocalStorage.removeItem(AsyncStorageKeys.PATIENT_BASELINES);
          await LocalStorage.removeItem(
            AsyncStorageKeys.MEDICATION_CONFIGURATIONS
          );
        } else {
          if (succeedIndices.length > 0) {
            await LocalStorage.setPatientBaselines(
              baselines.filter((_, index) => !succeedIndices.includes(index))
            );
          }
          if (failedSyncMedInfo.length > 0) {
            // Store the unsynced medication configurations back into local storage
            await LocalStorage.setPatientMedicationConfigurations(
              medConfigurations.filter((_, index) =>
                failedSyncMedInfo.includes(index)
              )
            );
          }
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
