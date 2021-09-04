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
// eslint-disable-next-line no-restricted-imports
import {
  createMedicationConfiguration,
  updatePatientConfiguration
} from "rc_agents/agents/data-assistant/action-frames/hf-outcome-trends/ConfigurePatient";

/**
 * Class to represent the activity for syncing local patient configurations.
 */
class SyncConfigurePatients extends Activity {
  /**
   * Constructor
   */
  constructor() {
    super(ActionFrameIDs.NWA.SYNC_CONFIGURE_PATIENTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent, [rule2]);

    try {
      // Get locally stored configurations
      const configurations = await Storage.getPatientConfigurations();

      // Get locally stored medication configurations
      const medConfigurations =
        await Storage.getPatientMedicationConfigurations();

      if (configurations && medConfigurations) {
        // Indicator of whether all patient configurations have been synced
        let configurationsSuccessful = true;
        let medConfigurationSuccessful = true;

        // Keeps track of configuration updates that have succeeded
        const succeedIndices: number[] = [];
        // Keeps track of the medication configuration updates that have failed
        const failedSyncPatientID: string[] = [];

        await Promise.all(
          configurations.map(async (configuration) => {
            try {
              // Updates patient info using configuration
              const updateSuccessful = await updatePatientConfiguration(
                configuration
              );
              if (updateSuccessful) {
                // Pushes index of succeeded update into the list
                succeedIndices.push(configurations.indexOf(configuration));
              } else {
                configurationsSuccessful = false;
              }
            } catch (error) {
              // eslint-disable-next-line no-console
              console.log(error);
            }
            return configuration;
          })
        );

        // eslint-disable-next-line no-restricted-syntax
        Object.entries(medConfigurations).forEach(
          async ([patientId, medInput]) => {
            try {
              // For each entry of medication configurations,
              // creates a medication info entry for them
              const syncMedicationSuccessful =
                await createMedicationConfiguration(medInput, patientId);

              // If the creation of medication info is successful, delete the entry from the local storage
              if (syncMedicationSuccessful) {
                delete medConfigurations.patientId;
              } else {
                medConfigurationSuccessful = false;
                // Add the patient ID of the list of medication configurations into failedSyncPatientID
                failedSyncPatientID.push(patientId);
              }
            } catch (error) {
              // eslint-disable-next-line no-console
              console.log(error);
            }
          }
        );

        // Remove AsyncStorage entry if all configurations are updated
        if (configurationsSuccessful) {
          await Storage.removeItem(AsyncStorageKeys.PATIENT_CONFIGURATIONS);
        }
        // Store configurations that failed to be updated
        else if (succeedIndices.length > 0) {
          await Storage.setPatientConfigurations(
            configurations.filter((_, index) => !succeedIndices.includes(index))
          );
          setRetryLaterTimeout(() => {
            agentNWA.addBelief(
              new Belief(
                BeliefKeys.APP,
                AppAttributes.SYNC_CONFIGURE_PATIENTS,
                true
              )
            );
          });
        }

        // Remove all entry from the AsyncStorage if all medication infos are synced
        if (medConfigurationSuccessful) {
          await Storage.removeItem(AsyncStorageKeys.MEDICATION_CONFIGURATIONS);
        } else if (failedSyncPatientID.length > 0) {
          // Store the unsynced medication configurations back into local storage
          await Storage.setPatientMedicationConfigurations(medConfigurations);
          setRetryLaterTimeout(() => {
            agentNWA.addBelief(
              new Belief(
                BeliefKeys.APP,
                AppAttributes.SYNC_CONFIGURE_PATIENTS,
                true
              )
            );
          });
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setRetryLaterTimeout(() => {
        agentNWA.addBelief(
          new Belief(
            BeliefKeys.APP,
            AppAttributes.SYNC_CONFIGURE_PATIENTS,
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
  AppAttributes.SYNC_CONFIGURE_PATIENTS,
  true
);

// Actionframe
export const af_SyncConfigurePatients = new Actionframe(
  `AF_${ActionFrameIDs.NWA.SYNC_CONFIGURE_PATIENTS}`,
  [rule1, rule2],
  new SyncConfigurePatients()
);
