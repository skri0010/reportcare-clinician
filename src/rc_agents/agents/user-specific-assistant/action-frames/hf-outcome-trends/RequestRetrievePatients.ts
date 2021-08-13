import {
  Actionframe,
  Agent,
  Communicate,
  Belief,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  ClinicianAttributes,
  CommonAttributes,
  PatientAttributes,
  Performative,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";

/**
 * The class represents the activity for requesting retrieval of all patients specific to a role.
 * This happens in Procedure HF Outcome Trends (HF-OTP-I).
 */
class RequestRetrievePatients extends Communicate {
  constructor() {
    super(
      ActionFrameIDs.UXSA.REQUEST_RETRIEVE_PATIENTS,
      Performative.REQUEST,
      // Trigger RetrivePatientsByRole of DTA agent
      new Belief(BeliefKeys.PATIENT, PatientAttributes.RETRIEVE_PATIENTS, true),
      [AgentIDs.DTA]
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
  AgentIDs.UXSA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.UXSA.RETRIEVE_ROLE
);
const rule3 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.ROLE_RETRIEVED,
  true
);

// Actionframe
export const af_RequestRetrievePatients = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.REQUEST_RETRIEVE_PATIENTS}`,
  [rule1, rule2],
  new RequestRetrievePatients()
);
