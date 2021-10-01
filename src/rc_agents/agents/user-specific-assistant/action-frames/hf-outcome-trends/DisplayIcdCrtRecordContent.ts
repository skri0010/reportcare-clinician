import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import {
  ActionFrameIDs,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { store } from "util/useRedux";
import {
  setFetchingIcdCrtRecordContent,
  setIcdCrtRecordContent
} from "ic-redux/actions/agents/actionCreator";

/**
 * Class to represent the activity for displaying patient's ICD/CRT record content
 * This happens in Procedure HF Outcome Trends (HF-OTP-IV)
 */
class DisplayIcdCrtRecordContent extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_ICDCRT_RECORD_CONTENT);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    // Get retrieved ICD/CRT record content from facts
    const icdCrtRecordContentURL: string =
      agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
        PatientAttributes.ICDCRT_RECORD_CONTENT
      ];

    if (icdCrtRecordContentURL) {
      // Dispatch ICD/CRT record content to store
      store.dispatch(setIcdCrtRecordContent(icdCrtRecordContentURL));

      // Update Facts
      // Remove ICD/CRT record content from facts
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PATIENT,
          PatientAttributes.ICDCRT_RECORD_CONTENT,
          null
        ),
        false
      );

      // End the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.HF_OTP_IV,
          ProcedureConst.INACTIVE
        ),
        true,
        true
      );
    }

    // Dispatch to store to indicate that fetching has ended
    store.dispatch(setFetchingIcdCrtRecordContent(false));
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_IV,
  ProcedureConst.ACTIVE
);

const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.ICDCRT_RECORD_CONTENT_RETRIEVED,
  true
);

// Actionframe
export const af_DisplayIcdCrtRecordContent = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_ICDCRT_RECORD_CONTENT}`,
  [rule1, rule2],
  new DisplayIcdCrtRecordContent()
);
