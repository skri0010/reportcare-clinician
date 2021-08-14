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
  ClinicianAttributes,
  CommonAttributes,
  Performative,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";

/**
 * Class to represent the activity for requesting retrieval of clinician's role
 * This happens in Procedure HF Outcome Trends (HF-OTP-I).
 */
class RequestRetrieveRole extends Communicate {
  constructor() {
    // Triggers RetrieveRole of UXSA agent
    super(
      ActionFrameIDs.DTA.REQUEST_RETRIEVE_ROLE,
      Performative.REQUEST,
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.RETRIEVE_ROLE, true),
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
  ProcedureAttributes.HF_OTP_I,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.DTA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.DTA.RETRIEVE_PATIENTS_BY_ROLE
);
const rule3 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_ROLE,
  true
);

// Actionframe
export const af_RequestRetrieveRole = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_RETRIEVE_ROLE}`,
  [rule1, rule2, rule3],
  new RequestRetrieveRole()
);
