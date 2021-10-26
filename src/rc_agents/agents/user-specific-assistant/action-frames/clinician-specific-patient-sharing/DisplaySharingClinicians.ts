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
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { store } from "util/useRedux";
import {
  setFetchingSharingClinicians,
  setSharingClinicians
} from "ic-redux/actions/agents/clinicianActionCreator";

/**
 * Represents the activity for displaying clinicians to share a patient.
 * This happens in Procedure Clinician Specific - Patient Sharing (CP-PS).
 */
class DisplaySharingClinicians extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_SHARING_CLINICIANS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    // Reset preconditions
    await super.doActivity(agent, [rule2]);

    const clinicians =
      agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[
        ClinicianAttributes.SHARING_CLINICIANS
      ];

    if (clinicians) {
      // Dispatch to display list of sharing clinicians
      store.dispatch(setSharingClinicians(clinicians));

      // Update Facts
      // Remove item
      agentAPI.addFact(
        new Belief(
          BeliefKeys.CLINICIAN,
          ClinicianAttributes.SHARING_CLINICIANS,
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
        ProcedureAttributes.CP_PS,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );

    // Dispatch to store to indicate that fetching has ended
    store.dispatch(setFetchingSharingClinicians(false));
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.CP_PS,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.DISPLAY_SHARING_CLINICIANS,
  true
);

// Actionframe
export const af_DisplaySharingClinicians = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_SHARING_CLINICIANS}`,
  [rule1, rule2],
  new DisplaySharingClinicians()
);
