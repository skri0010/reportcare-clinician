import {
  Actionframe,
  Agent,
  Belief,
  Activity,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes,
  AppAttributes,
  ActionFrameIDs
} from "rc_agents/clinician_framework";
import {
  LocalStorage,
  AsyncStorageKeys,
  AsyncStorageType
} from "rc_agents/storage";
import {
  PatientAssignmentResolution,
  PatientAssignmentStatus
} from "rc_agents/model";
import { updatePatientAssignment } from "aws";

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
      const clinicianId = await LocalStorage.getClinicianID();

      if (resolution && clinicianId) {
        // Device is online
        if (agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Resolve (APPROVE or REASSIGN based on assignment)
          resolvedOnline = await resolvePatientAssignment({
            resolution: resolution,
            userClinicianID: clinicianId
          });
        }
        // Device is offline: Save locally
        else {
          // Append current assignments to resolve to locally stored assignments to resolve
          const data = await LocalStorage.getPatientAssignmentResolutions();
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
          LocalStorage.setPatientAssignmentResolutions(resolutionList);

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
 * Resolve patient assignment by updating it
 * Logic is handled by backend Lambda function (handle-patient-assignment-resolution)
 * Source for logic is in lambda-functions/handle-patient-assignment-resolution
 */
export const resolvePatientAssignment: (params: {
  resolution: PatientAssignmentResolution;
  userClinicianID: string;
}) => Promise<boolean> = async ({ resolution, userClinicianID }) => {
  let success = false;
  try {
    // Approve resolution
    if (
      resolution.resolution === PatientAssignmentStatus.APPROVED &&
      resolution.clinicianID === userClinicianID
    ) {
      const result = await updatePatientAssignment({
        patientID: resolution.patientID,
        clinicianID: resolution.clinicianID,
        pending: null, // Removes it from GSI to ensure it is sparse
        resolution: PatientAssignmentStatus.APPROVED,
        _version: resolution._version
      });
      if (result) {
        success = true;
      }
    }
    // Reassign resolution
    else if (
      resolution.resolution === PatientAssignmentStatus.REASSIGNED &&
      resolution.reassignToClinicianID &&
      resolution.clinicianID !== resolution.reassignToClinicianID &&
      resolution.clinicianID === userClinicianID
    ) {
      const result = await updatePatientAssignment({
        patientID: resolution.patientID,
        clinicianID: resolution.clinicianID,
        pending: null, // Removes it from GSI to ensure it is sparse
        resolution: PatientAssignmentStatus.REASSIGNED,
        reassignToClinicianID: resolution.reassignToClinicianID,
        _version: resolution._version
      });
      if (result) {
        success = true;
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  }
  return success;
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
