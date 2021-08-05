import {
  Actionframe,
  Agent,
  Belief,
  Communicate,
  Precondition
} from "agents_implementation/agent_framework";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  CommonAttributes,
  PatientAttributes,
  Performative,
  ProcedureAttributes,
  ProcedureConst
} from "agents_implementation/agent_framework/AgentEnums";

/**
 * Class to represent the activity for requesting display of retrieved pending patient assignments.
 * This happens in Procedure HF Outcome Trends (HF-OTP-III).
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
  ProcedureAttributes.HF_OTP_III,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.DTA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.DTA.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS
);

// Actionframe of the RequestPendingPatientAssignment class
export const af_RequestPendingPatientAssignments = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_PENDING_PATIENT_ASSIGNMENTS}`,
  [rule1, rule2],
  new RequestPendingPatientAssignments()
);
