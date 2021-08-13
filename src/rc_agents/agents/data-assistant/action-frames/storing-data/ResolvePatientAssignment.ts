import {
  Actionframe,
  Agent,
  Belief,
  Activity,
  Precondition,
  agentAPI,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  ProcedureConst,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes,
  AppAttributes,
  ActionFrameIDs
} from "rc_agents/AgentEnums";
import { Storage, AsyncStorageKeys, AsyncStorageType } from "rc_agents/storage";
import {
  PatientAssignmentResolution,
  PatientAssignmentStatus
} from "rc_agents/model";
import {
  createClinicianPatientMap,
  createPatientAssignment,
  updatePatientAssignment,
  getClinicianPatientMap,
  getPatientAssignment
} from "aws";
import Auth from "@aws-amplify/auth";

/**
 * Class to represent an activity for resolving patient assignment (APPROVE or REASSIGN) .
 * This happens in Procedure Storing Data (SRD-I) when clinician performs an action to resolve patient assignment.
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
    // Reset preconditions
    await super.doActivity(agent, [rule2]);
    let resolvedOnline = false;

    try {
      // Get assignment to resolve
      const resolution: PatientAssignmentResolution =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.PATIENT_ASSIGNMENT_RESOLUTION
        ];

      // Get locally stored clinicianId
      const clinicianId = await Storage.getClinicianID();

      if (resolution && clinicianId) {
        // Device is online
        if (agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Resolve (APPROVE or REASSIGN based on assignment)
          await resolvePatientAssignment({
            resolution: resolution,
            ownClinicianId: clinicianId
          });
          resolvedOnline = true;
        }
        // Device is offline: Save locally
        else {
          // Append current assignments to resolve to locally stored assignments to resolve
          const data = await Storage.getPatientAssignmentResolutions();
          let resolutionList: AsyncStorageType[AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS];
          // Key exists in AsyncStorage
          if (data) {
            // Insert/replace item
            resolutionList = data;
            resolutionList[resolution.patientName] = resolution;
          }
          // Key does not exist in AsyncStorage
          else {
            // Create new item
            resolutionList = { [resolution.patientName]: resolution };
          }
          // Store updated resolutions
          Storage.setPatientAssignmentResolutions(resolutionList);

          // Trigger request to Communicate to NWA
          agent.addBelief(
            new Belief(
              BeliefKeys.APP,
              AppAttributes.SYNC_PATIENT_ASSIGNMENT_RESOLUTIONS,
              true
            )
          );
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    if (resolvedOnline) {
      // Update Beliefs
      // Retrieve new pending patient assignments
      agent.addBelief(
        new Belief(
          BeliefKeys.PATIENT,
          PatientAttributes.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS,
          true
        )
      );
      // Trigger agent (self) to retrieve new patients
      agent.addBelief(
        new Belief(
          BeliefKeys.PATIENT,
          PatientAttributes.RETRIEVE_PATIENTS,
          true
        )
      );
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.HF_OTP_I,
          ProcedureConst.ACTIVE
        )
      );
    }

    // Update Facts
    // Remove item
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.PATIENT_ASSIGNMENT_RESOLUTION,
        null
      ),
      false
    );
  }
}

/**
 * Resolve (APPROVE or REASSIGN based on assignment)
 */
export const resolvePatientAssignment: (params: {
  resolution: PatientAssignmentResolution;
  ownClinicianId: string;
}) => Promise<void> = async ({ resolution, ownClinicianId }) => {
  // Approve patient to self
  if (
    resolution.resolution === PatientAssignmentStatus.APPROVED &&
    resolution.clinicianID === ownClinicianId
  ) {
    await approvePatientAssignment({ assignment: resolution });
  }
  // Reassign patient to another clinician
  else if (
    resolution.resolution === PatientAssignmentStatus.REASSIGNED &&
    resolution.clinicianID !== ownClinicianId
  ) {
    await reassignPatientAssignment({
      reassignment: resolution,
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
  // Create ClinicianPatientMap, update PatientAssignment status, update access token
  let createSuccessful = false;
  try {
    await createClinicianPatientMap({
      patientID: assignment.patientID,
      clinicianID: assignment.clinicianID,
      owner: assignment.clinicianID
    });
    createSuccessful = true;
  } catch (error) {
    // If clinician patient map is already created, proceed with patient assignment update
    const query = await getClinicianPatientMap({
      clinicianID: assignment.clinicianID,
      patientID: assignment.patientID
    });
    if (query.data.getClinicianPatientMap) {
      createSuccessful = true;
    }
  }

  if (createSuccessful) {
    await updatePatientAssignment({
      patientID: assignment.patientID,
      clinicianID: assignment.clinicianID,
      pending: null, // Removes it from GSI to ensure it is sparse
      resolution: PatientAssignmentStatus.APPROVED,
      _version: assignment._version
    });
    await Auth.currentAuthenticatedUser({ bypassCache: true }); // pre token generation Lambda is triggered
  }
};

/**
 * Reassign API calls for online device
 */
const reassignPatientAssignment: (params: {
  reassignment: PatientAssignmentResolution;
  ownClinicianId: string;
}) => Promise<void> = async ({ reassignment, ownClinicianId }) => {
  // Create PatientAssignment for another clinician and update PatientAssignment status
  let createSuccessful = false;
  try {
    await createPatientAssignment({
      patientID: reassignment.patientID,
      clinicianID: reassignment.clinicianID,
      pending: PatientAssignmentStatus.PENDING,
      patientName: reassignment.patientName
    });
    createSuccessful = true;
  } catch (error) {
    // If patient assignment is already created, proceed with patient assignment update
    const query = await getPatientAssignment({
      clinicianID: reassignment.clinicianID,
      patientID: reassignment.patientID
    });
    if (query.data.getPatientAssignment) {
      createSuccessful = true;
    }
  }

  if (createSuccessful) {
    await updatePatientAssignment({
      patientID: reassignment.patientID,
      clinicianID: ownClinicianId,
      pending: null, // Removes it from GSI to ensure it is sparse
      resolution: PatientAssignmentStatus.REASSIGNED,
      _version: reassignment._version
    });
  }
};

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD_I,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.RESOLVE_PATIENT_ASSIGNMENT,
  true
);

// Actionframe
export const af_ResolvePatientAssignment = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RESOLVE_PATIENT_ASSIGNMENT}`,
  [rule1, rule2],
  new ResolvePatientAssignment()
);
