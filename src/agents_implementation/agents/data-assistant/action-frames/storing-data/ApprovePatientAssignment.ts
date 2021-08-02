import Actionframe from "agents_implementation/agent_framework/base/Actionframe";
import Activity from "agents_implementation/agent_framework/base/Activity";
import Agent from "agents_implementation/agent_framework/base/Agent";
import Belief from "agents_implementation/agent_framework/base/Belief";
import Precondition from "agents_implementation/agent_framework/base/Precondition";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ProcedureConst,
  AsyncStorageKeys,
  CommonAttributes,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes,
  AppAttributes,
  ActionFrameIDs
} from "agents_implementation/agent_framework/AgentEnums";
import agentAPI from "agents_implementation/agent_framework/AgentAPI";
import {
  PatientAssignmentResolution,
  createClinicianPatientMap,
  updatePatientAssignment,
  AssignmentParams
} from "aws";
import { store } from "ic-redux/store";
import { setProcedureSuccessful } from "ic-redux/actions/agents/actionCreator";
import agentNWA from "agents_implementation/agents/network-assistant/NWA";
import Auth from "@aws-amplify/auth";

/**
 * LS-TODO: To be updated
 * Currently unable to get PatientInfo of the new patient
 * Add front end trigger to start this activity
 */

/**
 * Class to represent an activity for assigning self as patient's clinician.
 * This happens in Procedure Storing Data (SRD) when a clinician approves a patient's assignment.
 */
class ApprovePatientAssignment extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.APPROVE_PATIENT_ASSIGNMENT);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);

    // Update Beliefs
    agent.addBelief(
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.PENDING_APPROVE_PATIENT_ASSIGNMENT,
        false
      )
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      // Get assignment
      const assignment: AssignmentParams =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.APPROVE_PATIENT_ASSIGNMENT
        ];

      // Get locally stored clinicianId
      const clinicianId = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN_ID
      );

      if (assignment && clinicianId === assignment.clinicianID) {
        // Device is online
        if (agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Approve
          await approve(assignment);
        }
        // Device is offline: Save locally in PatientAssignments
        else {
          // Append current reassignment into list of other pending reassignments
          const localData = await AsyncStorage.getItem(
            AsyncStorageKeys.PATIENT_ASSIGNMENTS
          );
          // Key exists in AsyncStorage
          if (localData) {
            // Insert and store if this assignment does not exist (ie same patientID)
            const pendingAssignments: AssignmentParams[] =
              JSON.parse(localData);
            const assignmentExists = pendingAssignments.find(
              (storedAssignment) =>
                storedAssignment.patientID === assignment.patientID
            );

            if (!assignmentExists) {
              pendingAssignments.push(assignment);
              await AsyncStorage.setItem(
                AsyncStorageKeys.PATIENT_ASSIGNMENTS,
                JSON.stringify(pendingAssignments)
              );
            }
          }
          // Key does not exist in AsyncStorage
          else {
            // No other pending requests: create a new list
            await AsyncStorage.setItem(
              AsyncStorageKeys.PATIENT_ASSIGNMENTS,
              JSON.stringify([assignment])
            );
          }

          // Notify NWA
          agentNWA.addBelief(
            new Belief(
              BeliefKeys.APP,
              AppAttributes.PENDING_PATIENT_ASSIGNMENT_SYNC,
              true
            )
          );
        }

        // Dispatch to front end to indicate that procedure is successful
        store.dispatch(setProcedureSuccessful(true));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Update Facts
    // Remove AssignParams from facts
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.APPROVE_PATIENT_ASSIGNMENT,
        null
      ),
      false
    );
    // Stop the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.SRD,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );
  }
}

/**
 * Approve API calls for online device
 */
export const approve: (params: AssignmentParams) => Promise<void> = async ({
  patientID,
  clinicianID,
  _version
}) => {
  // Query to get _version and ensure
  // Insert ClinicianPatientMap, update PatientAssignment status, update access token
  await createClinicianPatientMap({
    patientID: patientID,
    clinicianID: clinicianID,
    owner: clinicianID
  });
  await updatePatientAssignment({
    patientID: patientID,
    clinicianID: clinicianID,
    pending: null, // Removes it from GSI to ensure it is sparse
    resolution: PatientAssignmentResolution.APPROVED,
    _version: _version
  });
  await Auth.currentAuthenticatedUser({ bypassCache: true }); // pre token generation Lambda is triggered
};

// Preconditions for activating the ApprovePatientAssignment class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.PENDING_APPROVE_PATIENT_ASSIGNMENT,
  true
);

// Action Frame for ApprovePatientAssignment class
const af_ApprovePatientAssignment = new Actionframe(
  `AF_${ActionFrameIDs.DTA.APPROVE_PATIENT_ASSIGNMENT}`,
  [rule1, rule2],
  new ApprovePatientAssignment()
);

export default af_ApprovePatientAssignment;
