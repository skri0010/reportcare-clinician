import {
  Actionframe,
  Agent,
  Belief,
  Activity,
  Precondition
} from "agents_implementation/agent_framework";
import {
  ActionFrameIDs,
  BeliefKeys,
  CommonAttributes,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "agents_implementation/agent_framework/AgentEnums";
import agentAPI from "../../../../agent_framework/AgentAPI";
import { store } from "ic-redux/store";
import { setPendingPatientAssignments } from "ic-redux/actions/agents/actionCreator";

/**
 * Class to represent an activity for retrieving role of user for retrieving patients.
 * This happens in Procedure HF Outcome Trends (HF-OTP-I).
 */
class RetrievePendingPatientAssignments extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.RETRIEVE_ROLE);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);

    // Update Beliefs
    agent.addBelief(
      new Belief(
        BeliefKeys.PATIENT,
        PatientAttributes.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS,
        false
      )
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    const pendingPatientAssignments =
      agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
        PatientAttributes.PENDING_PATIENT_ASSIGNMENTS
      ];

    store.dispatch(setPendingPatientAssignments(pendingPatientAssignments));
  }
}

// Preconditions for activating the RetrieveRole class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_I,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS,
  true
);

// Action Frame for RetrieveRole class
const af_RetrievePendingPatientAssignments = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS}`,
  [rule1, rule2],
  new RetrievePendingPatientAssignments()
);

export { af_RetrievePendingPatientAssignments };
