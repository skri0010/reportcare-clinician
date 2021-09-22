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
import { MedicalRecord } from "aws/API";
import { store } from "util/useRedux";
import { setFetchingMedicalRecords } from "ic-redux/actions/agents/actionCreator";
import { listMedicalRecordsByPatientID } from "aws";

/**
 * Class to represent the activity for retrieving medical records of a patient.
 * This happens in Procedure HF Outcome Trends (HF-OTP-III).
 */
class RetrieveMedicalRecords extends Activity {
  /**
   * Constructor
   */
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_MEDICAL_RECORDS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    // Dispatch to frontend that the patient's medical records are being fetched
    store.dispatch(setFetchingMedicalRecords(true));

    try {
      const facts = agentAPI.getFacts();

      // Get patient id from facts
      const patientId: string =
        facts[BeliefKeys.PATIENT]?.[
          PatientAttributes.PATIENT_TO_VIEW_MEDICAL_RECORDS
        ];

      // Get online status from facts
      const isOnline: boolean = facts[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      if (patientId) {
        let medicalRecords: MedicalRecord[] | undefined;

        if (isOnline) {
          // Device is online - retrieve medical records of current patient
          const query = await listMedicalRecordsByPatientID({
            patientID: patientId
          });

          if (
            query.data.listMedicalRecordsByPatientID?.items &&
            query.data.listMedicalRecordsByPatientID?.items.length > 0
          ) {
            medicalRecords = query.data.listMedicalRecordsByPatientID
              .items as MedicalRecord[];

            // Stores medical records locally
            await LocalStorage.setPatientMedicalRecords(medicalRecords);
          }
        } else {
          // Device is offline: get medical records of current patient from local storage
          const localMedicalRecords =
            await LocalStorage.getPatientMedicalRecords(patientId);

          if (localMedicalRecords) {
            medicalRecords = localMedicalRecords;
          }
        }

        if (medicalRecords) {
          // Update Facts
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.MEDICAL_RECORDS,
              medicalRecords
            ),
            false
          );
          // Trigger request to dispatch medical records to UXSA for frontend display
          agent.addBelief(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.MEDICAL_RECORDS_RETRIEVED,
              true
            )
          );
          // Remove patientId from facts
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.PATIENT_TO_VIEW_MEDICAL_RECORDS,
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
              PatientAttributes.PATIENT_TO_VIEW_MEDICAL_RECORDS,
              null
            ),
            false
          );

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
          store.dispatch(setFetchingMedicalRecords(false));
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
          ProcedureAttributes.HF_OTP_III,
          ProcedureConst.INACTIVE
        ),
        true,
        true
      );
      // Dispatch to store to indicate fetching has ended
      store.dispatch(setFetchingMedicalRecords(false));
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
  PatientAttributes.RETRIEVE_MEDICAL_RECORDS,
  true
);

// Actionframe
export const af_RetrieveMedicalRecords = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_MEDICAL_RECORDS}`,
  [rule1, rule2],
  new RetrieveMedicalRecords()
);
