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
  createPatientAssignment,
  updatePatientAssignment,
  AssignmentToResolve
} from "aws";
import { store } from "ic-redux/store";
import { setProcedureSuccessful } from "ic-redux/actions/agents/actionCreator";
import agentNWA from "agents_implementation/agents/network-assistant/NWA";
import Auth from "@aws-amplify/auth";

/**
 * LS-TODO: JH-TODO: To be updated
 * Currently unable to get PatientInfo of the new patient
 * Add front end trigger to start this activity
 */

/**
 * Class to represent an activity for resolving patient assignment (APPROVE or REASSIGN) .
 * This happens in Procedure Storing Data (SRD) when clinician performs an action to resolve patient assignment.
 */
class HandlePatientAssignment extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RESOLVE_PATIENT_ASSIGNMENT);
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
        PatientAttributes.PENDING_RESOLVE_PATIENT_ASSIGNMENT,
        false
      )
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      // Get assignment
      const assignment: AssignmentToResolve =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.RESOLVE_PATIENT_ASSIGNMENT
        ];

      // Get locally stored clinicianId
      const clinicianId = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN_ID
      );

      if (assignment && clinicianId === assignment.clinicianID) {
        // Device is online
        if (agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Approve patient to self
          if (
            assignment.resolution === PatientAssignmentResolution.APPROVED &&
            assignment.clinicianID === clinicianId
          ) {
            await approve(assignment);
          }
          // Reassign patient to another clinician
          else if (
            assignment.resolution === PatientAssignmentResolution.REASSIGNED &&
            assignment.clinicianID !== clinicianId
          ) {
            await reassign({
              reassignment: assignment,
              ownClinicianId: clinicianId
            });
          }
        }
        // Device is offline: Save locally in PatientAssignmentResolutions
        else {
          // Append current assignments to locally stored assignments
          const localData = await AsyncStorage.getItem(
            AsyncStorageKeys.PATIENT_ASSIGNMENT_RESOLUTIONS
          );
          // Key exists in AsyncStorage
          if (localData) {
            // Insert and store if this assignment does not exist (ie new patientID)
            const pendingAssignments: AssignmentToResolve[] =
              JSON.parse(localData);
            const assignmentExists = pendingAssignments.find(
              (storedAssignment) =>
                storedAssignment.patientID === assignment.patientID
            );

            if (!assignmentExists) {
              pendingAssignments.push(assignment);
              await AsyncStorage.setItem(
                AsyncStorageKeys.PATIENT_ASSIGNMENT_RESOLUTIONS,
                JSON.stringify(pendingAssignments)
              );
            }
          }
          // Key does not exist in AsyncStorage
          else {
            // No other pending requests: create a new list
            await AsyncStorage.setItem(
              AsyncStorageKeys.PATIENT_ASSIGNMENT_RESOLUTIONS,
              JSON.stringify([assignment])
            );
          }

          // Notify NWA
          agentNWA.addBelief(
            new Belief(
              BeliefKeys.APP,
              AppAttributes.PENDING_PATIENT_ASSIGNMENT,
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
    // Remove assignment from facts
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.RESOLVE_PATIENT_ASSIGNMENT,
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
export const approve: (params: AssignmentToResolve) => Promise<void> = async ({
  patientID,
  clinicianID,
  _version
}) => {
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

/**
 * Reassign API calls for online device
 */
const reassign: (params: {
  reassignment: AssignmentToResolve;
  ownClinicianId: string;
}) => Promise<void> = async ({ reassignment, ownClinicianId }) => {
  // Insert PatientAssignment for another clinician and update PatientAssignment status
  await createPatientAssignment({
    patientID: reassignment.patientID,
    clinicianID: reassignment.clinicianID,
    pending: PatientAssignmentResolution.PENDING
  });
  await updatePatientAssignment({
    patientID: reassignment.patientID,
    clinicianID: ownClinicianId,
    pending: null, // Removes it from GSI to ensure it is sparse
    resolution: PatientAssignmentResolution.REASSIGNED,
    _version: reassignment._version
  });
};

// Preconditions for activating the ApprovePatientAssignment class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.PENDING_RESOLVE_PATIENT_ASSIGNMENT,
  true
);

// Action Frame for ApprovePatientAssignment class
export const af_ResolvePatientAssignment = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RESOLVE_PATIENT_ASSIGNMENT}`,
  [rule1, rule2],
  new HandlePatientAssignment()
);
