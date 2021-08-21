import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import agentAPI from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { Storage } from "rc_agents/storage";
import { listPatientAlertsByDateTime } from "aws";
import { AlertInfo } from "rc_agents/model";
import { ModelSortDirection } from "aws/API";
import { queryAlertInfo } from "../triage-alert-hf-clinic/RetrieveAlertInfo";
import { sortAlertsByDateTime } from "../triage-alert-hf-clinic/RetrieveAlerts";

/**
 * Class to represent the activity for retrieving alert history of a patient.
 * This happens in Procedure HF Outcome Trends (HF-OTP-II).
 */
class RetrieveAlertHistory extends Activity {
  /**
   * Constructor for the RetrieveAlertHistory class
   */
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_ALERT_HISTORY);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    try {
      const facts = agentAPI.getFacts();

      // Gets alert patientId from facts
      const patientId: string =
        facts[BeliefKeys.PATIENT]?.[PatientAttributes.ALERT_PATIENT_ID];

      if (patientId) {
        const alertInfos: AlertInfo[] = [];

        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Device is online: retrieves alerts of the current patient
          const query = await listPatientAlertsByDateTime({
            patientID: patientId,
            sortDirection: ModelSortDirection.DESC
          });

          if (query.data.listPatientAlertsByDateTime?.items) {
            const result = query.data.listPatientAlertsByDateTime.items;
            if (result && result.length > 0) {
              await Promise.all(
                result.map(async (alert) => {
                  const alertInfo = await queryAlertInfo(alert!);
                  if (alertInfo) {
                    alertInfos.push(alertInfo);
                    await Storage.setAlertInfo(alertInfo);
                  }
                })
              );
            }
          }

          if (alertInfos.length > 0) {
            const sortedPatientAlerts = sortAlertsByDateTime(alertInfos);
            agentAPI.addFact(
              new Belief(
                BeliefKeys.PATIENT,
                PatientAttributes.ALERT_HISTORY,
                sortedPatientAlerts
              ),
              false
            );
          }
        } else {
          // Device is offline: get alert infos of current patient from local storage
          const patientAlerts = await Storage.getPatientAlertInfos(patientId);
          if (patientAlerts) {
            const sortedPatientAlerts = sortAlertsByDateTime(patientAlerts);
            agentAPI.addFact(
              new Belief(
                BeliefKeys.PATIENT,
                PatientAttributes.ALERT_HISTORY,
                sortedPatientAlerts
              ),
              false
            );
          }
        }

        // Removes patientId from facts
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.ALERT_PATIENT_ID,
            null
          ),
          false
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_OTP_II,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.RETRIEVE_ALERT_HISTORY,
  true
);

// Actionframe
export const af_RetrieveAlertHistory = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_ALERT_HISTORY}`,
  [rule1, rule2],
  new RetrieveAlertHistory()
);
