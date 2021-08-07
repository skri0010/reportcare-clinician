import {
  Actionframe,
  Agent,
  Communicate,
  Belief,
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
 * The class represents the activity for requesting retrieval of all patients specific to a role.
 * This happens in Procedure HF Outcome Trends (HF-OTP-I).
 */
class RequestRetrieveAll extends Communicate {
  /**
   * Constructor for the RequestRetrieveAll class
   */
  constructor() {
    super(
      ActionFrameIDs.UXSA.REQUEST_RETRIEVE_ALL,
      Performative.REQUEST,
      // Triggers RetrieveRolePatients action frame of DTA
      new Belief(BeliefKeys.PATIENT, PatientAttributes.RETRIEVE_ALL, true),
      [AgentIDs.DTA]
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

// Rules or preconditions for activating the RequestRetrieveAll class
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

// Actionframe of the RequestRetrieveAll class
const af_RequestRetrieveAll = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.REQUEST_RETRIEVE_ALL}`,
  [rule1, rule2],
  new RequestRetrieveAll()
);

export default af_RequestRetrieveAll;
