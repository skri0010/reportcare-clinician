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
import { ClinicianRecord } from "aws/API";
import {
  setFetchingIcdCrtRecords,
  setIcdCrtRecords
} from "ic-redux/actions/agents/patientActionCreator";

/**
 * Class to represent the activity for displaying patient's ICD/CRT records
 * This happens in Procedure HF Outcome Trends (HF-OTP-IV)
 */
class DisplayIcdCrtRecords extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_ICDCRT_RECORDS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    // Get retrieved ICD/CRT records from facts
    const icdCrtRecords: ClinicianRecord[] =
      agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
        PatientAttributes.ICDCRT_RECORDS
      ];

    if (icdCrtRecords) {
      // Dispatch ICD/CRT records to store
      store.dispatch(setIcdCrtRecords(icdCrtRecords));

      // Update Facts
      // Remove item
      agentAPI.addFact(
        new Belief(BeliefKeys.PATIENT, PatientAttributes.ICDCRT_RECORDS, null),
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
    store.dispatch(setFetchingIcdCrtRecords(false));
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
  PatientAttributes.ICDCRT_RECORDS_RETRIEVED,
  true
);

// Actionframe
export const af_DisplayIcdCrtRecords = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_ICDCRT_RECORDS}`,
  [rule1, rule2],
  new DisplayIcdCrtRecords()
);
