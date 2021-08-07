import {
  Actionframe,
  Agent,
  Belief,
  Communicate,
  Precondition
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
    // Trigger RetrievePendingPatientAssignments procedure of UXSA agent
    super(
      ActionFrameIDs.DTA.REQUEST_DETAILS_DISPLAY,
      Performative.REQUEST,
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.PENDING_PATIENT_ASSIGNMENTS_RETRIEVED,
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
      await super.doActivity(agent);
      // Update Beliefs
      // Reset precondition
      agent.addBelief(
        new Belief(
          BeliefKeys.PATIENT,
          PatientAttributes.PENDING_PATIENT_ASSIGNMENTS_RETRIEVED,
          false
        )
      );
      // Set last activity
      agent.addBelief(
        new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Rules or preconditions for activating the RequestPendingPatientAssignments class
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
const rule3 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.PENDING_PATIENT_ASSIGNMENTS_RETRIEVED,
  true
);

// Actionframe of the RequestPendingPatientAssignment class
export const af_RequestPendingPatientAssignments = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_PENDING_PATIENT_ASSIGNMENTS}`,
  [rule1, rule2, rule3],
  new RequestPendingPatientAssignments()
);
