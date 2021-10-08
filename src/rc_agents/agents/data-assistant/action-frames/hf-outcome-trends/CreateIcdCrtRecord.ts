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
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import {
  setCreateIcdCrtRecordSuccessful,
  setCreatingIcdCrtRecord
} from "ic-redux/actions/agents/patientActionCreator";
import { store } from "util/useRedux";
import { ClinicianRecordInput } from "rc_agents/model";
import { uploadPDF } from "util/pdfUtilities";
import { ClinicianRecord } from "aws/API";

/**
 * Class to represent an activity for creating a patient's ICD/CRT record.
 * This happens in Procedure HF Outcome Trends (HF-OTP-IV).
 */
class CreateIcdCrtRecord extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.CREATE_ICDCRT_RECORD);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    // Reset preconditions
    await super.doActivity(agent, [rule2]);

    try {
      const facts = agentAPI.getFacts();
      // Get ICD/CRT record input from facts
      const icdCrtRecordInput: ClinicianRecordInput =
        facts[BeliefKeys.PATIENT]?.[PatientAttributes.ICDCRT_RECORD_TO_CREATE];

      if (icdCrtRecordInput) {
        let newIcdCrtRecord: ClinicianRecord | undefined;

        // Ensure that device is online
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Upload the file
          newIcdCrtRecord = await uploadPDF({
            recordInput: icdCrtRecordInput,
            recordType: "IcdCrt"
          });
        }

        if (newIcdCrtRecord) {
          // Dispatch to front end that create is successful
          store.dispatch(setCreateIcdCrtRecordSuccessful(true));

          // Add new ICD/CRT record into the existing list of ICD/CRT records
          let existingIcdCrtRecords = store.getState().patients.icdCrtRecords;
          if (!existingIcdCrtRecords) {
            existingIcdCrtRecords = [];
          }
          existingIcdCrtRecords.unshift(newIcdCrtRecord);

          // Update Facts
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.ICDCRT_RECORDS,
              existingIcdCrtRecords
            ),
            false
          );
          // Trigger request to dispatch ICD/CRT records to UXSA for frontend display
          agent.addBelief(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.ICDCRT_RECORDS_RETRIEVED,
              true
            )
          );
          // Remove ICD/CRT record input from facts
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.ICDCRT_RECORD_TO_CREATE,
              null
            ),
            false
          );
        }
      }
      // Dispatch to front end that create has ended
      store.dispatch(setCreatingIcdCrtRecord(false));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

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
      // Dispatch to front end that create has ended
      store.dispatch(setCreatingIcdCrtRecord(false));
    }
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
  PatientAttributes.CREATE_ICDCRT_RECORD,
  true
);

// Actionframe
export const af_CreateIcdCrtRecord = new Actionframe(
  `AF_${ActionFrameIDs.DTA.CREATE_ICDCRT_RECORD}`,
  [rule1, rule2],
  new CreateIcdCrtRecord()
);
