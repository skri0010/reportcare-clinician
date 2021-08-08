import {
  Actionframe,
  Agent,
  Belief,
  Communicate,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  CommonAttributes,
  PatientAttributes,
  Performative,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";

/**
 * Class to represent the activity for requesting display of retrieved pending patient assignments.
 * This happens in Procedure Storing Data (SRD).
 */
class RequestPendingPatientAssignments extends Communicate {
  constructor() {
    // Trigger DisplayPendingPatientAssignments of UXSA agent
    super(
      ActionFrameIDs.DTA.REQUEST_DETAILS_DISPLAY,
      Performative.REQUEST,
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.DISPLAY_PENDING_ASSIGNMENTS_REQUESTED,
        true
      ),
      [AgentIDs.UXSA]
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
  ProcedureAttributes.SRD,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.DTA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.DTA.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS
);
const rule3 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.PENDING_PATIENT_ASSIGNMENTS_RETRIEVED,
  true
);

// Actionframe
export const af_RequestPendingPatientAssignments = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_PENDING_PATIENT_ASSIGNMENTS}`,
  [rule1, rule2, rule3],
  new RequestPendingPatientAssignments()
);
