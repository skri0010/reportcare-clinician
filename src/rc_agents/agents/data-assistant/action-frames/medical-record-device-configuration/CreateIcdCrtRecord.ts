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
  setCreatingIcdCrtRecord,
  setPatientDetails
} from "ic-redux/actions/agents/actionCreator";
import { store } from "util/useRedux";
import { ClinicianRecordInput } from "rc_agents/model";
import { uploadPDF } from "util/pdfUtilities";
import { LocalStorage } from "rc_agents/storage";

/**
 * Represents the activity for creating a patient's ICD/CRT record.
 * This happens in Procedure App-Medical Records Device Configuration (MRDC) - P-RB.
 * Triggered directly when clinician uploads patient's ICD/CRT record.
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
        // let newIcdCrtRecord: ClinicianRecord | undefined;

        // Ensure that device is online
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Upload the file
          const newIcdCrtRecord = await uploadPDF({
            recordInput: icdCrtRecordInput,
            recordType: "IcdCrt"
          });

          if (newIcdCrtRecord) {
            // Add new ICD/CRT record into the existing list of ICD/CRT records in patient details
            const existingPatientDetails =
              store.getState().agents.patientDetails;
            if (existingPatientDetails) {
              const existingIcdCrtRecords =
                existingPatientDetails.icdCrtRecords;
              existingIcdCrtRecords.unshift(newIcdCrtRecord);
              existingPatientDetails.icdCrtRecords = existingIcdCrtRecords;

              // Dispatch updated patient details
              store.dispatch(setPatientDetails(existingPatientDetails));
            }

            // Stores record locally
            await LocalStorage.setIcdCrtRecord(newIcdCrtRecord);

            // Remove ICD/CRT record input from facts
            agentAPI.addFact(
              new Belief(
                BeliefKeys.PATIENT,
                PatientAttributes.ICDCRT_RECORD_TO_CREATE,
                null
              ),
              false
            );

            // End the procedure
            agentAPI.addFact(
              new Belief(
                BeliefKeys.PROCEDURE,
                ProcedureAttributes.MRDC,
                ProcedureConst.INACTIVE
              ),
              true,
              true
            );

            // Dispatch to front end that create is successful
            store.dispatch(setCreateIcdCrtRecordSuccessful(true));
          }
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
          ProcedureAttributes.MRDC,
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
  ProcedureAttributes.MRDC,
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
