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
import { IcdCrtRecord } from "aws/API";
import { store } from "util/useRedux";
import { setFetchingIcdCrtRecordContent } from "ic-redux/actions/agents/patientActionCreator";
import { Storage } from "@aws-amplify/storage";
import { StorageFolderPath } from "aws";

/**
 * Class to represent the activity for retrieving content of a patient's ICD/CRT record.
 * This happens in Procedure HF Outcome Trends (HF-OTP-IV).
 */
class RetrieveIcdCrtRecordContent extends Activity {
  /**
   * Constructor
   */
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_ICDCRT_RECORD_CONTENT);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    // Dispatch to frontend that the ICD/CRT record's content is being fetched
    store.dispatch(setFetchingIcdCrtRecordContent(true));

    try {
      const facts = agentAPI.getFacts();

      // Get ICD/CRT record from facts
      const icdCrtRecord: IcdCrtRecord =
        facts[BeliefKeys.PATIENT]?.[PatientAttributes.ICDCRT_RECORD_TO_VIEW];

      if (icdCrtRecord) {
        // Ensure that device is online
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Device is online - retrieve file from S3 bucket
          const fileURL = await Storage.get(
            `${StorageFolderPath.ICDCRT_RECORDS}${icdCrtRecord.fileKey}`,
            {
              level: "protected"
            }
          );

          if (fileURL) {
            // Update Facts
            agentAPI.addFact(
              new Belief(
                BeliefKeys.PATIENT,
                PatientAttributes.ICDCRT_RECORD_CONTENT,
                fileURL
              ),
              false
            );
            // Trigger request to dispatch ICD/CRT record content to UXSA for frontend display
            agent.addBelief(
              new Belief(
                BeliefKeys.PATIENT,
                PatientAttributes.ICDCRT_RECORD_CONTENT_RETRIEVED,
                true
              )
            );
          }
        }

        // Remove ICD/CRT record from facts
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.ICDCRT_RECORD_TO_VIEW,
            null
          ),
          false
        );
      }
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
      // Dispatch to store to indicate fetching has ended
      store.dispatch(setFetchingIcdCrtRecordContent(false));
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
  PatientAttributes.RETRIEVE_ICDCRT_RECORD_CONTENT,
  true
);

// Actionframe
export const af_RetrieveIcdCrtRecordContent = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_ICDCRT_RECORD_CONTENT}`,
  [rule1, rule2],
  new RetrieveIcdCrtRecordContent()
);
