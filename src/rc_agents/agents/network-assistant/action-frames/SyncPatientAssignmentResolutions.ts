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
  AsyncStorageType,
  BeliefKeys
} from "rc_agents/AgentEnums";
import { PatientAssignmentResolution } from "rc_agents/model";
import { resolvePatientAssignment } from "rc_agents/agents/data-assistant/action-frames/storing-data/ResolvePatientAssignment";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
      const resolutionListJSON = await AsyncStorage.getItem(
        AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS
      );

      // Get locally stored clinicianId
      const clinicianId = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN_ID
      );

      if (resolutionListJSON && clinicianId) {
        const resolutionList: AsyncStorageType[AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS] =
          JSON.parse(resolutionListJSON);

        Object.keys(resolutionList).forEach(async (key) => {
          const resolution: PatientAssignmentResolution = resolutionList[key];
          try {
            // Resolve (APPROVE or REASSIGN based on assignment)
            // This function handles conflicts as well
            await resolvePatientAssignment({
              resolution: resolution,
              ownClinicianId: clinicianId
            });
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
          }
          // Remove assignment from the list
          delete resolutionList[key];
        });

        // Reset AsyncStorage key
        await AsyncStorage.removeItem(
          AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS
        );
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
