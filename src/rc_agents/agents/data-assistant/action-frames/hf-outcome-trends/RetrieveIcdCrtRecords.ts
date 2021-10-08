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
import { LocalStorage } from "rc_agents/storage";
import { ClinicianRecord, ModelSortDirection } from "aws/API";
import { store } from "util/useRedux";
import { setFetchingIcdCrtRecords } from "ic-redux/actions/agents/actionCreator";
import {
  listUploadedClinicianRecordsByPatientID,
  PresignedUrlRecordType
} from "aws";

/**
 * Class to represent the activity for retrieving ICD/CRT records of a patient.
 * This happens in Procedure HF Outcome Trends (HF-OTP-IV).
 */
class RetrieveIcdCrtRecords extends Activity {
  /**
   * Constructor
   */
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_ICDCRT_RECORDS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    // Dispatch to frontend that the patient's ICD/CRT records are being fetched
    store.dispatch(setFetchingIcdCrtRecords(true));

    try {
      const facts = agentAPI.getFacts();

      // Get patient id from facts
      const patientId: string =
        facts[BeliefKeys.PATIENT]?.[
          PatientAttributes.PATIENT_TO_VIEW_ICDCRT_RECORDS
        ];

      // Get online status from facts
      const isOnline: boolean = facts[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      if (patientId) {
        let icdCrtRecords: ClinicianRecord[] | undefined;

        if (isOnline) {
          // Device is online - retrieve ICD/CRT records of current patient
          const recordType: PresignedUrlRecordType = "IcdCrt";
          const query = await listUploadedClinicianRecordsByPatientID({
            patientID: patientId,
            filter: { type: { eq: recordType } },
            sortDirection: ModelSortDirection.DESC
          });

          if (
            query.data.listUploadedClinicianRecordsByPatientID?.items &&
            query.data.listUploadedClinicianRecordsByPatientID?.items.length > 0
          ) {
            icdCrtRecords = query.data.listUploadedClinicianRecordsByPatientID
              .items as ClinicianRecord[];

            // Stores ICD/CRT records locally
            await LocalStorage.setPatientIcdCrtRecords(icdCrtRecords);
          }
        } else {
          // Device is offline: get ICD/CRT records of current patient from local storage
          const localIcdCrtRecords = await LocalStorage.getPatientIcdCrtRecords(
            patientId
          );

          if (localIcdCrtRecords) {
            icdCrtRecords = localIcdCrtRecords;
          }
        }

        if (icdCrtRecords) {
          // Update Facts
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.ICDCRT_RECORDS,
              icdCrtRecords
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
          // Remove patientId from facts
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.PATIENT_TO_VIEW_ICDCRT_RECORDS,
              null
            ),
            false
          );
        } else {
          // Update Facts
          // Remove patientId from facts
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.PATIENT_TO_VIEW_ICDCRT_RECORDS,
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
          // Dispatch to store to indicate fetching has ended
          store.dispatch(setFetchingIcdCrtRecords(false));
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      // Update Facts
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
      // Dispatch to store to indicate fetching has ended
      store.dispatch(setFetchingIcdCrtRecords(false));
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
  PatientAttributes.RETRIEVE_ICDCRT_RECORDS,
  true
);

// Actionframe
export const af_RetrieveIcdCrtRecords = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_ICDCRT_RECORDS}`,
  [rule1, rule2],
  new RetrieveIcdCrtRecords()
);
