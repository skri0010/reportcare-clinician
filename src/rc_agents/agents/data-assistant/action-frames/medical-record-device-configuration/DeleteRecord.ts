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
import { store } from "util/useRedux";
import { LocalStorage } from "rc_agents/storage";
import {
  setDeleteRecordSuccessful,
  setDeletingRecord
} from "ic-redux/actions/agents/patientActionCreator";
import { ClinicianRecord } from "aws/API";
import { ClinicianRecordType, queryS3ClinicianRecordsBridge } from "aws";
import { AgentTrigger } from "rc_agents/trigger";

/**
 * Represents the activity for deleting a patient's medical or ICD/CRT record.
 * This happens in Procedure App-Medical Records Device Configuration (MRDC) - P-RB.
 * Triggered directly when clinician deletes a patient's record within grace period.
 */
class DeleteRecord extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.DELETE_RECORD);
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
      // Get record from facts
      const record: ClinicianRecord =
        facts[BeliefKeys.PATIENT]?.[PatientAttributes.RECORD_TO_DELETE];

      if (record) {
        // Ensure that device is online
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          const response = await queryS3ClinicianRecordsBridge({
            documentID: record.documentID,
            documentTitle: record.title,
            operation: "Delete",
            recordType: record.type as ClinicianRecordType,
            patientID: record.patientID
          });

          if (response.success) {
            // JH-TODO: Procedure for updating list of records
            const patientDetailsToUpdate = await LocalStorage.getPatientDetails(
              record.patientID
            );
            if (patientDetailsToUpdate) {
              // Remove item
              if (record.type === "IcdCrt") {
                patientDetailsToUpdate.icdCrtRecords =
                  patientDetailsToUpdate.icdCrtRecords.filter(
                    (item) => item.documentID !== record.documentID
                  );
              } else if (record.type === "Medical") {
                patientDetailsToUpdate.medicalRecords =
                  patientDetailsToUpdate.medicalRecords.filter(
                    (item) => item.documentID !== record.documentID
                  );
              }

              // Store back into local storage
              LocalStorage.setPatientDetails(patientDetailsToUpdate);

              // Trigger to retrieve PatientDetails locally
              AgentTrigger.triggerRetrievePatientDetails(
                patientDetailsToUpdate.patientInfo,
                true
              );
            }

            // End the procedure
            agentAPI.addFact(
              new Belief(
                BeliefKeys.PROCEDURE,
                ProcedureAttributes.MRDC,
                ProcedureConst.INACTIVE
              )
            );

            store.dispatch(setDeleteRecordSuccessful(true));
          }
        }
      }
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
    }

    // Remove record from facts
    agentAPI.addFact(
      new Belief(BeliefKeys.PATIENT, PatientAttributes.RECORD_TO_DELETE, null),
      false
    );

    // Dispatch to front end that delete has ended
    store.dispatch(setDeletingRecord(false));
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
  PatientAttributes.DELETE_RECORD,
  true
);

// Actionframe
export const af_DeleteRecord = new Actionframe(
  `AF_${ActionFrameIDs.DTA.DELETE_RECORD}`,
  [rule1, rule2],
  new DeleteRecord()
);
