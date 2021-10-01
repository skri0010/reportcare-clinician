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
import { updatePatientConfiguration } from "rc_agents/agents/data-assistant/action-frames/hf-outcome-trends/ConfigurePatient";

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
      const configurations = await LocalStorage.getPatientConfigurations();

      if (configurations) {
        // Indicator of whether all patient configurations have been synced
        let configurationsSuccessful = true;
        // Keeps track of configuration updates that have succeeded
        const succeedIndices: number[] = [];

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

        // Remove AsyncStorage entry if all configurations are updated
        if (configurationsSuccessful) {
          await LocalStorage.removeItem(
            AsyncStorageKeys.PATIENT_CONFIGURATIONS
          );
        }
        // Store configurations that failed to be updated
        else if (succeedIndices.length > 0) {
          await LocalStorage.setPatientConfigurations(
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
