import {
  Actionframe,
  Agent,
  Belief,
  Activity,
  Precondition
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  BeliefKeys,
  CommonAttributes,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import agentAPI from "rc_agents/framework/AgentAPI";
import { store } from "ic-redux/store";
import { setPendingPatientAssignments } from "ic-redux/actions/agents/actionCreator";

/**
 * Class to represent an activity for retrieving pending patient assignments.
 * This happens in Procedure Storing Data (SRD).
 */
class RetrievePendingPatientAssignments extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);

    const pendingPatientAssignments =
      agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
        PatientAttributes.PENDING_PATIENT_ASSIGNMENTS
      ];

    if (pendingPatientAssignments) {
      // Dispatch to store boolean to store fetched pending patient assignments
      store.dispatch(setPendingPatientAssignments(pendingPatientAssignments));
    }

    // Update Facts and Belief
    // End procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.SRD,
        ProcedureConst.INACTIVE
      ),
      false
    );
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
  }
}

// Preconditions for activating the RetrievePendingPatientAssignments class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.PENDING_PATIENT_ASSIGNMENTS_RETRIEVED,
  true
);

// Action Frame for RetrievePendingPatientAssignments class
const af_RetrievePendingPatientAssignments = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.RETRIEVE_PENDING_PATIENT_ASSIGNMENTS}`,
  [rule1, rule2],
  new RetrievePendingPatientAssignments()
);

export { af_RetrievePendingPatientAssignments };
