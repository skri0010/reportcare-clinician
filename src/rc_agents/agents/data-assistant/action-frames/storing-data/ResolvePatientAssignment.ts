/* eslint-disable no-console */
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
import { handlePatientAssignment } from "aws";
import { agentNWA } from "rc_agents/agents";
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
      const clinicianId = await LocalStorage.getClinicianID();

      if (resolution && clinicianId) {
        // Device is online
        if (agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Approve or reassign resolution
          resolvedOnline = await resolvePatientAssignment({
            resolution: resolution,
            userClinicianID: clinicianId
          });
        }
        // Device is offline: Save locally
        else {
          // Append current assignments to resolve to locally stored assignments to resolve
          const data = await LocalStorage.getPatientAssignmentResolutions();
          console.log("triggered to do later");
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

          console.log(resolutionList);
          // Trigger request to Communicate to NWA
          agentNWA.addBelief(
            new Belief(
              BeliefKeys.APP,
              AppAttributes.SYNC_PATIENT_ASSIGNMENT_RESOLUTIONS,
              true
            )
          );
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

          if (resolution.resolution === PatientAssignmentStatus.APPROVED) {
            // Refresh access token with new patient
            Auth.currentAuthenticatedUser({ bypassCache: true });

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
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
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
 * Handle APPROVED or REASSIGNED resolution
 * Logic is handled by GraphQL Lambda resolver (patientassignmenthandler)
 */
export const resolvePatientAssignment: (params: {
  resolution: PatientAssignmentResolution;
  userClinicianID: string;
}) => Promise<boolean> = async ({ resolution, userClinicianID }) => {
  let success = false;
  try {
    if (resolution.clinicianID === userClinicianID) {
      // Call Lambda resolver to handle patient assignment
      const result = await handlePatientAssignment({
        patientID: resolution.patientID,
        resolution: resolution.resolution,
        reassignToClinicianID: resolution.reassignToClinicianID || ""
      });
      if (result.success) {
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
