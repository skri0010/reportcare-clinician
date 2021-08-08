import {
  Actionframe,
  Agent,
  Activity,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  AppAttributes,
  AsyncStorageKeys,
  BeliefKeys
} from "rc_agents/AgentEnums";
import { PatientAssignmentResolution } from "rc_agents/model";
import { resolvePatientAssignment } from "rc_agents/agents/data-assistant/action-frames/storing-data/ResolvePatientAssignment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "ic-redux/store";
import { setFetchingPendingPatientAssignments } from "ic-redux/actions/agents/actionCreator";

/**
 * Class to represent the activity for syncing local resolutions of patient assignments.
 *
 * JH-TODO:
 * - Update once ResolvePatientAssignment is ready
 * - Requires Communicate from DTA to NWA
 */
class SyncPatientAssignmentResolutions extends Activity {
  /**
   * Constructor for the SyncPatientAssignment class
   */
  constructor() {
    super(ActionFrameIDs.NWA.SYNC_PATIENT_ASSIGNMENT_RESOLUTIONS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent, [rule2]);

    try {
      // Get locally stored list of assignments to resolve
      const assignmentListJSON = await AsyncStorage.getItem(
        AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS
      );

      // Get locally stored clinicianId
      const clinicianId = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN_ID
      );

      if (assignmentListJSON && clinicianId) {
        const remainingList: PatientAssignmentResolution[] = [];
        const assignmentList: PatientAssignmentResolution[] =
          JSON.parse(assignmentListJSON);

        // JH-TODO: Assignment should have an expiry date and this loop should flush if past expiry
        for (let i = 0; i < assignmentList.length; i++) {
          try {
            // Resolve (APPROVE or REASSIGN based on assignment)
            // eslint-disable-next-line no-await-in-loop
            await resolvePatientAssignment({
              assignment: assignmentList[i],
              ownClinicianId: clinicianId
            });
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
            // Collect failed assignments to store back into local storage
            remainingList.push(assignmentList[i]);
          }
        }

        // Store failed assignments back into local storage
        await AsyncStorage.setItem(
          AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS,
          JSON.stringify(remainingList)
        );
        // Dispatch to store boolean to fetch updated patient assignments
        store.dispatch(setFetchingPendingPatientAssignments(true));
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
  AppAttributes.SYNC_PATIENT_ASSIGNMENT_RESOLUTIONS,
  true
);

// Actionframe
export const af_SyncPatientAssignmentResolutions = new Actionframe(
  `AF_${ActionFrameIDs.NWA.SYNC_PATIENT_ASSIGNMENT_RESOLUTIONS}`,
  [rule1, rule2],
  new SyncPatientAssignmentResolutions()
);
