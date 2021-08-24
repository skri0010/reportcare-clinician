import {
  Actionframe,
  Agent,
  Belief,
  Activity,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  ActionFrameIDs,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { store } from "util/useRedux";
import {
  setFetchingPendingPatientAssignments,
  setPendingPatientAssignments
} from "ic-redux/actions/agents/actionCreator";

/**
 * Class to represent an activity for displaying pending patient assignments.
 * This happens in Procedure Storing Data (SRD-I).
 */
class DisplayPendingPatientAssignments extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_PENDING_PATIENT_ASSIGNMENTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    // Reset preconditions
    await super.doActivity(agent, [rule2]);

    const pendingPatientAssignments =
      agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
        PatientAttributes.PENDING_PATIENT_ASSIGNMENTS
      ];

    if (pendingPatientAssignments) {
      // Dispatch to store retrieved pending patient assignments
      store.dispatch(setPendingPatientAssignments(pendingPatientAssignments));

      // Update Facts
      // Remove item
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PATIENT,
          PatientAttributes.PENDING_PATIENT_ASSIGNMENTS,
          null
        ),
        false
      );
    }

    // Update Facts
    // End the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.SRD_I,
        ProcedureConst.INACTIVE
      )
    );

    // Dispatch to store to indicate fetching has ended
    store.dispatch(setFetchingPendingPatientAssignments(false));
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD_I,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.PENDING_PATIENT_ASSIGNMENTS_RETRIEVED,
  true
);

// Actionframe
export const af_DisplayPendingPatientAssignments = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_PENDING_PATIENT_ASSIGNMENTS}`,
  [rule1, rule2],
  new DisplayPendingPatientAssignments()
);
