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
  AppAttributes,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import {
  sharePatientAssignment,
  SharePatientAssignmentNarrowedVariables
} from "aws";
import { store } from "util/useRedux";
import {
  setSharePatientSuccessful,
  setSharingPatient
} from "ic-redux/actions/agents/clinicianActionCreator";

/**
 * Represents the activity for retrieving clinicians for sharing a patient.
 * This happens in Procedure Clinician Specific - Patient Sharing (CP-PS).
 */
class SharePatient extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.SHARE_PATIENT);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    try {
      const facts = agentAPI.getFacts();

      // Get patientId of current patient to share
      const sharePatientInput: SharePatientAssignmentNarrowedVariables =
        facts[BeliefKeys.CLINICIAN]?.[
          ClinicianAttributes.SHARE_PATIENT_ASSIGNMENT
        ];

      if (sharePatientInput) {
        // Ensure that device is online
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          const response = await sharePatientAssignment(sharePatientInput);
          if (response.success) {
            // Dispatch to front end to indicate that sharing is successful
            store.dispatch(setSharePatientSuccessful(true));
          }
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Remove input from facts
    agentAPI.addFact(
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.SHARE_PATIENT_ASSIGNMENT,
        null
      ),
      false
    );

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

    // Dispatch to front end to indicate that procedure has ended
    store.dispatch(setSharingPatient(false));
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
  ClinicianAttributes.SHARE_PATIENT,
  true
);

// Actionframe
export const af_SharePatient = new Actionframe(
  `AF_${ActionFrameIDs.DTA.SHARE_PATIENT}`,
  [rule1, rule2],
  new SharePatient()
);
