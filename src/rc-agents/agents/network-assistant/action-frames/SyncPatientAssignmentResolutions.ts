import {
  Actionframe,
  Agent,
  Belief,
  Activity,
  Precondition
} from "rc-agents/framework";
import {
  ActionFrameIDs,
  AppAttributes,
  AsyncStorageKeys,
  BeliefKeys,
  CommonAttributes
} from "rc-agents/framework/AgentEnums";
import { PatientAssignmentResolution } from "rc-agents/model";
import { resolvePatientAssignment } from "rc-agents/agents/data-assistant/action-frames/storing-data/ResolvePatientAssignment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "ic-redux/store";
import { setFetchNewPatientAssignments } from "ic-redux/actions/agents/actionCreator";

// LS-TODO: To be tested once ApprovePatientAssignment is working

/**
 * Class to represent the activity for syncing local approval of patient assignments.
 */
class SyncPatientAssignment extends Activity {
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
    super.doActivity(agent);

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
        store.dispatch(setFetchNewPatientAssignments(true));
      }

      // Update Beliefs
      // Reset precondition
      agent.addBelief(
        new Belief(
          BeliefKeys.APP,
          AppAttributes.PENDING_PATIENT_ASSIGNMENT_SYNC,
          false
        )
      );
      // Set last activity
      agent.addBelief(
        new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Rules or preconditions for activating the SyncPatientAssignments class
const rule1 = new Precondition(BeliefKeys.APP, AppAttributes.ONLINE, true);
const rule2 = new Precondition(
  BeliefKeys.APP,
  AppAttributes.PENDING_PATIENT_ASSIGNMENT_SYNC,
  true
);

// Actionframe of the SyncPatientAssignments class
const af_SyncPatientAssignmentResolutions = new Actionframe(
  `AF_${ActionFrameIDs.NWA.SYNC_PATIENT_ASSIGNMENT_RESOLUTIONS}`,
  [rule1, rule2],
  new SyncPatientAssignment()
);

export default af_SyncPatientAssignmentResolutions;
