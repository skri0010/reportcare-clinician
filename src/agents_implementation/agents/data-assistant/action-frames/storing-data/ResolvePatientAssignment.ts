import {
  Actionframe,
  Agent,
  Belief,
  Activity,
  Precondition,
  agentAPI
} from "agents_implementation/agent_framework";
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
import {
  PatientAssignmentResolution,
  PatientAssignmentStatus
} from "agents_implementation/agent_framework/model";
import {
  createClinicianPatientMap,
  createPatientAssignment,
  updatePatientAssignment
} from "aws";
import { store } from "ic-redux/store";
import { setProcedureSuccessful } from "ic-redux/actions/agents/actionCreator";
import agentNWA from "agents_implementation/agents/network-assistant/NWA";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
class ResolvePatientAssignment extends Activity {
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
      // Get assignment to resolve
      const assignment: PatientAssignmentResolution =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.RESOLVE_PATIENT_ASSIGNMENT
        ];

      // Get locally stored clinicianId
      const clinicianId = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN_ID
      );

      if (assignment && clinicianId) {
        // Device is online
        if (agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Resolve (APPROVE or REASSIGN based on assignment)
          await resolvePatientAssignment({
            assignment: assignment,
            ownClinicianId: clinicianId
          });
        }
        // Device is offline: Save locally in PatientAssignmentResolutions
        else {
          // Append current assignments to resolve to locally stored assignments to resolve
          const localData = await AsyncStorage.getItem(
            AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS
          );
          // Key exists in AsyncStorage
          if (localData) {
            // Insert and store if this assignment does not exist (ie new patientID)
            const pendingAssignments: PatientAssignmentResolution[] =
              JSON.parse(localData);
            const assignmentExists = pendingAssignments.find(
              (storedAssignment) =>
                storedAssignment.patientID === assignment.patientID
            );

            if (!assignmentExists) {
              pendingAssignments.push(assignment);
              await AsyncStorage.setItem(
                AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS,
                JSON.stringify(pendingAssignments)
              );
            }
          }
          // Key does not exist in AsyncStorage
          else {
            // No other pending requests: create a new list
            await AsyncStorage.setItem(
              AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS,
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
 * Resolve (APPROVE or REASSIGN based on assignment)
 */
export const resolvePatientAssignment: (params: {
  assignment: PatientAssignmentResolution;
  ownClinicianId: string;
}) => Promise<void> = async ({ assignment, ownClinicianId }) => {
  // Approve patient to self
  if (
    assignment.resolution === PatientAssignmentStatus.APPROVED &&
    assignment.clinicianID === ownClinicianId
  ) {
    await approvePatientAssignment({ assignment: assignment });
  }
  // Reassign patient to another clinician
  else if (
    assignment.resolution === PatientAssignmentStatus.REASSIGNED &&
    assignment.clinicianID !== ownClinicianId
  ) {
    await reassignPatientAssignment({
      reassignment: assignment,
      ownClinicianId: ownClinicianId
    });
  }
};

/**
 * Approve API calls for online device
 */
const approvePatientAssignment: (params: {
  assignment: PatientAssignmentResolution;
}) => Promise<void> = async ({ assignment }) => {
  // Insert ClinicianPatientMap, update PatientAssignment status, update access token
  await createClinicianPatientMap({
    patientID: assignment.patientID,
    clinicianID: assignment.clinicianID,
    owner: assignment.clinicianID
  });
  await updatePatientAssignment({
    patientID: assignment.patientID,
    clinicianID: assignment.clinicianID,
    pending: null, // Removes it from GSI to ensure it is sparse
    resolution: PatientAssignmentStatus.APPROVED,
    _version: assignment._version
  });
  await Auth.currentAuthenticatedUser({ bypassCache: true }); // pre token generation Lambda is triggered
};

/**
 * Reassign API calls for online device
 */
const reassignPatientAssignment: (params: {
  reassignment: PatientAssignmentResolution;
  ownClinicianId: string;
}) => Promise<void> = async ({ reassignment, ownClinicianId }) => {
  // Insert PatientAssignment for another clinician and update PatientAssignment status
  await createPatientAssignment({
    patientID: reassignment.patientID,
    clinicianID: reassignment.clinicianID,
    pending: PatientAssignmentStatus.PENDING,
    patientName: reassignment.patientName
  });
  await updatePatientAssignment({
    patientID: reassignment.patientID,
    clinicianID: ownClinicianId,
    pending: null, // Removes it from GSI to ensure it is sparse
    resolution: PatientAssignmentStatus.REASSIGNED,
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
  new ResolvePatientAssignment()
);
