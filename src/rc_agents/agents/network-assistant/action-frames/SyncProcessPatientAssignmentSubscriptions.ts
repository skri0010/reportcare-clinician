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
import { store } from "util/useRedux";
import { PatientAssignment } from "aws/API";
import { getPatientAssignment } from "aws";
import { setPendingPatientAssignments } from "ic-redux/actions/agents/actionCreator";

/**
 * Class to represent the activity for processing local patient assignment subscriptions.
 */
class SyncProcessPatientAssignmentSubscriptions extends Activity {
  /**
   * Constructor
   */
  constructor() {
    super(ActionFrameIDs.NWA.SYNC_PROCESS_PATIENT_ASSIGNMENT_SUBSCRIPTIONS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent, [rule2]);

    try {
      // Get locally stored patient assignment subscriptions
      const patientAssignmentSubscriptions =
        await LocalStorage.getPatientAssignmentSubscriptions();

      if (patientAssignmentSubscriptions) {
        // Indicator of whether all patient assignment subscriptions have been processed
        let processSuccessful = true;

        // Keeps track of patient assignment subscriptions that have been processed
        const processedIndices: number[] = [];

        // Stores retrieved patient assignments
        const retrievedPatientAssignments: PatientAssignment[] = [];

        await Promise.all(
          patientAssignmentSubscriptions.map(async (subscription) => {
            // Retrieve patient assignment
            const query = await getPatientAssignment({
              clinicianID: subscription.clinicianID,
              patientID: subscription.patientID
            });
            if (query.data.getPatientAssignment) {
              // Patient assignment retrieved: stores into list and pushes the corresponding subscription index
              retrievedPatientAssignments.push(query.data.getPatientAssignment);
              processedIndices.push(
                patientAssignmentSubscriptions.indexOf(subscription)
              );
            } else {
              // Failed to retrieve patient assignment: update indicator
              processSuccessful = false;
            }
          })
        );

        if (retrievedPatientAssignments.length > 0) {
          // Inserts patient assignments into the locally stored list
          await LocalStorage.insertPendingPatientAssignments(
            retrievedPatientAssignments
          );

          // Adds to the front of current list of pending patient assignments
          let currentPendingPatientAssignments =
            store.getState().agents.pendingPatientAssignments;
          if (!currentPendingPatientAssignments) {
            currentPendingPatientAssignments = [];
          }
          currentPendingPatientAssignments = retrievedPatientAssignments.concat(
            currentPendingPatientAssignments
          );

          // Dispatch updated list of pending patient assignments
          store.dispatch(
            setPendingPatientAssignments(currentPendingPatientAssignments)
          );
        }

        // Remove AsyncLocalStorage entry if all patient assignment subscriptions are processed
        if (processSuccessful) {
          await LocalStorage.removeItem(
            AsyncStorageKeys.PATIENT_ASSIGNMENT_SUBSCRIPTIONS
          );
        }

        // Store patient assignment subscriptions that failed to be processed
        else if (processedIndices.length > 0) {
          await LocalStorage.setPatientAssignmentSubscriptions(
            patientAssignmentSubscriptions.filter(
              (_, index) => !processedIndices.includes(index)
            )
          );
          setRetryLaterTimeout(() => {
            agentNWA.addBelief(
              new Belief(
                BeliefKeys.APP,
                AppAttributes.SYNC_PROCESS_PATIENT_ASSIGNMENT_SUBSCRIPTIONS,
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
            AppAttributes.SYNC_PROCESS_PATIENT_ASSIGNMENT_SUBSCRIPTIONS,
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
  AppAttributes.SYNC_PROCESS_PATIENT_ASSIGNMENT_SUBSCRIPTIONS,
  true
);

// Actionframe
export const af_SyncProcessPatientAssignmentSubscriptions = new Actionframe(
  `AF_${ActionFrameIDs.NWA.SYNC_PROCESS_PATIENT_ASSIGNMENT_SUBSCRIPTIONS}`,
  [rule1, rule2],
  new SyncProcessPatientAssignmentSubscriptions()
);
