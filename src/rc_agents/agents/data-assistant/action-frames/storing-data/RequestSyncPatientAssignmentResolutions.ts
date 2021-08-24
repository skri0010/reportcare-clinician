import {
  Actionframe,
  Agent,
  Belief,
  Communicate,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import {
  ProcedureConst,
  Performative,
  CommonAttributes
} from "agents-framework/Enums";
import {
  ActionFrameIDs,
  AgentIDs,
  AppAttributes,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";

/**
 * Class to represent the activity for requesting syncing of local patient assignment resolutions.
 * This happens in Procedure Storing Data (SRD-I).
 */
class RequestSyncPatientAssignmentResolutions extends Communicate {
  constructor() {
    // Trigger SyncPatientAssignmentResolution of NWA agent
    super(
      ActionFrameIDs.NWA.SYNC_PATIENT_ASSIGNMENT_RESOLUTIONS,
      Performative.REQUEST,
      new Belief(
        BeliefKeys.PATIENT,
        AppAttributes.SYNC_PATIENT_ASSIGNMENT_RESOLUTIONS,
        true
      ),
      [AgentIDs.NWA]
    );
  }

  /**
   * Perform the activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    try {
      // Reset preconditions
      await super.doActivity(agent, [rule3]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD_I,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.DTA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.DTA.RESOLVE_PATIENT_ASSIGNMENT
);
const rule3 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.PATIENT_ASSIGNMENT_RESOLVED,
  true
);

// Actionframe
export const af_RequestSyncPatientAssignmentResolutions = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_SYNC_PATIENT_ASSIGNMENT_RESOLUTIONS}`,
  [rule1, rule2, rule3],
  new RequestSyncPatientAssignmentResolutions()
);
