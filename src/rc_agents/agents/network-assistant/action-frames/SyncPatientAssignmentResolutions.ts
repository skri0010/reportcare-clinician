import {
  Actionframe,
  Agent,
  Activity,
  Precondition,
  ResettablePrecondition,
  Belief
} from "agents-framework";
import {
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { LocalStorage, AsyncStorageKeys } from "rc_agents/storage";
// eslint-disable-next-line no-restricted-imports
import { resolvePatientAssignment } from "rc_agents/agents/data-assistant/action-frames/storing-data/ResolvePatientAssignment";
import { agentDTA } from "rc_agents/agents";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { ProcedureConst } from "agents-framework/Enums";

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
    // eslint-disable-next-line no-console
    console.log("Triggered sync patient assignment");

    try {
      // Get locally stored list of assignments to resolve
      const resolutionList =
        await LocalStorage.getPatientAssignmentResolutions();

      // Get locally stored clinicianId
      const clinicianId = await LocalStorage.getClinicianID();
      // eslint-disable-next-line no-console
      console.log(resolutionList);
      if (resolutionList && clinicianId) {
        Object.keys(resolutionList).forEach(async (key) => {
          const resolution = resolutionList[key];
          if (resolution) {
            try {
              // Resolve (APPROVE or REASSIGN based on assignment)
              // This function handles conflicts as well
              const resolved = await resolvePatientAssignment({
                resolution: resolution,
                userClinicianID: clinicianId
              });
              if (resolved) {
                delete resolutionList[key];
              }
              // Insert remaining resolutions back into storage
              LocalStorage.setPatientAssignmentResolutions(resolutionList);
            } catch (error) {
              // eslint-disable-next-line no-console
              console.log(error);
            }
          }
        });

        // Reset AsyncStorage key if none left
        if (Object.keys(resolutionList).length === 0) {
          LocalStorage.removeItem(
            AsyncStorageKeys.PATIENT_ASSIGNMENTS_RESOLUTIONS
          );
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Retrieve Pending Patient Assignment
    agentDTA.addBelief(
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS,
        true
      )
    );

    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.SRD_I,
        ProcedureConst.ACTIVE
      )
    );
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
