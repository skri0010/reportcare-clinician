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
import { MedicalRecord } from "aws/API";
import { store } from "util/useRedux";
import { setFetchingMedicalRecordContent } from "ic-redux/actions/agents/actionCreator";
import { Storage } from "@aws-amplify/storage";

/**
 * Class to represent the activity for retrieving content of a patient's medical record.
 * This happens in Procedure HF Outcome Trends (HF-OTP-III).
 */
class RetrieveMedicalRecordContent extends Activity {
  /**
   * Constructor
   */
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_MEDICAL_RECORD_CONTENT);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    // Dispatch to frontend that the medical record's content is being fetched
    store.dispatch(setFetchingMedicalRecordContent(true));

    try {
      const facts = agentAPI.getFacts();

      // Get medical record from facts
      const medicalRecord: MedicalRecord =
        facts[BeliefKeys.PATIENT]?.[PatientAttributes.MEDICAL_RECORD_TO_VIEW];

      if (medicalRecord) {
        // Ensure that device is online
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Device is online - retrieve file from S3 bucket
          const fileURL = await Storage.get(medicalRecord.fileKey, {
            level: "private"
          });

          if (fileURL) {
            // Update Facts
            agentAPI.addFact(
              new Belief(
                BeliefKeys.PATIENT,
                PatientAttributes.MEDICAL_RECORD_CONTENT,
                fileURL
              ),
              false
            );
            // Trigger request to dispatch medical record content to UXSA for frontend display
            agent.addBelief(
              new Belief(
                BeliefKeys.PATIENT,
                PatientAttributes.MEDICAL_RECORD_CONTENT_RETRIEVED,
                true
              )
            );
          }
        }

        // Remove medical record from facts
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.MEDICAL_RECORD_TO_VIEW,
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
          ProcedureAttributes.HF_OTP_III,
          ProcedureConst.INACTIVE
        ),
        true,
        true
      );
      // Dispatch to store to indicate fetching has ended
      store.dispatch(setFetchingMedicalRecordContent(false));
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_III,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.RETRIEVE_MEDICAL_RECORD_CONTENT,
  true
);

// Actionframe
export const af_RetrieveMedicalRecordContent = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_MEDICAL_RECORD_CONTENT}`,
  [rule1, rule2],
  new RetrieveMedicalRecordContent()
);
