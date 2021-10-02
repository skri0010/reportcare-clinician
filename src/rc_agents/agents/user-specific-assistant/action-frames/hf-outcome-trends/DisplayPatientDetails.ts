import {
  Actionframe,
  Activity,
  Agent,
  Belief,
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
import { PatientDetails } from "rc_agents/model";
import { store } from "util/useRedux";
import {
  setPatientDetails,
  setFetchingPatientDetails
} from "ic-redux/actions/agents/actionCreator";

/**
 * Represents the activity for displaying details of a specific patient.
 * This happens in Procedure HF Outcome Trends (HF-OTP-II).
 */
class DisplayPatientDetails extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_PATIENT_DETAILS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    // Reset preconditions
    await super.doActivity(agent, [rule2]);

    const patientDetails: PatientDetails =
      agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
        PatientAttributes.PATIENT_DETAILS
      ];

    if (patientDetails) {
      // LS-TODO-NEW: Perform filtering on data according to roles
      // Dispatch patient details to front end
      store.dispatch(setPatientDetails(patientDetails));

      // Update Facts
      // Remove item
      agentAPI.addFact(
        new Belief(BeliefKeys.PATIENT, PatientAttributes.PATIENT_DETAILS, null),
        false
      );
    }

    // Stops the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.HF_OTP_II,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );

    // Dispatch to store to indicate fetching has ended
    store.dispatch(setFetchingPatientDetails(false));
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_II,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.PATIENT_DETAILS_RETRIEVED,
  true
);

// Actionframe
export const af_DisplayPatientDetails = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_PATIENT_DETAILS}`,
  [rule1, rule2],
  new DisplayPatientDetails()
);
