import Actionframe from "../../../agent_framework/base/Actionframe";
import Activity from "../../../agent_framework/base/Activity";
import Agent from "../../../agent_framework/base/Agent";
import Belief from "../../../agent_framework/base/Belief";
import Precondition from "../../../agent_framework/base/Precondition";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ActionFrameIDs,
  AppAttributes,
  AsyncStorageKeys,
  BeliefKeys,
  CommonAttributes
} from "agents_implementation/agent_framework/AgentEnums";
import { resolvePatientAssignment } from "agents_implementation/agents/data-assistant/action-frames/storing-data/ResolvePatientAssignment";
import { Assignment } from "aws";

// LS-TODO: To be tested once ApprovePatientAssignment is working

/**
 * Class to represent the activity for syncing local approval of patient assignments.
 */
class SyncPatientAssignment extends Activity {
  /**
   * Constructor for the SyncPatientAssignment class
   */
  constructor() {
    super(ActionFrameIDs.NWA.SYNC_PATIENT_ASSIGNMENT);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent);

    // Update Beliefs
    // Prevent the activity from being executed multiple times while assignments are being synced
    agent.addBelief(
      new Belief(
        BeliefKeys.APP,
        AppAttributes.PENDING_PATIENT_ASSIGNMENT,
        false
      )
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      // Get locally stored list of assignments to resolve
      const assignmentListJSON = await AsyncStorage.getItem(
        AsyncStorageKeys.PATIENT_ASSIGNMENTS
      );

      // Get locally stored clinicianId
      const clinicianId = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN_ID
      );

      if (assignmentListJSON && clinicianId) {
        const remainingList: Assignment[] = [];
        const assignmentList: Assignment[] = JSON.parse(assignmentListJSON);

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
          AsyncStorageKeys.PATIENT_ASSIGNMENTS,
          JSON.stringify(remainingList)
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      // Activity did not succeed
      agent.addBelief(
        new Belief(
          BeliefKeys.APP,
          AppAttributes.PENDING_PATIENT_ASSIGNMENT,
          true
        )
      );
    }
  }
}

// Rules or preconditions for activating the SyncPatientAssignments class
const rule1 = new Precondition(BeliefKeys.APP, AppAttributes.ONLINE, true);
const rule2 = new Precondition(
  BeliefKeys.APP,
  AppAttributes.PENDING_PATIENT_ASSIGNMENT,
  true
);

// Actionframe of the SyncPatientAssignments class
const af_SyncPatientAssignment = new Actionframe(
  `AF_${ActionFrameIDs.NWA.SYNC_PATIENT_ASSIGNMENT}`,
  [rule1, rule2],
  new SyncPatientAssignment()
);

export default af_SyncPatientAssignment;
