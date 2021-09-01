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
import { Storage } from "rc_agents/storage";
import { listPatientAlertsByDateTime } from "aws";
import { AlertInfo } from "rc_agents/model";
import { Alert, ModelSortDirection } from "aws/API";
import { queryAlertInfo } from "../triage-alert-hf-clinic/RetrieveAlertInfo";
import {
  alertToAlertInfo,
  sortAlertsByDateTime
} from "../triage-alert-hf-clinic/RetrieveAlerts";
import { store } from "util/useRedux";
import { setFetchingPatientAlertHistory } from "ic-redux/actions/agents/actionCreator";

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

    // Dispatch to frontend that the patient alert history is being fetched
    store.dispatch(setFetchingPatientAlertHistory(true));

    try {
      const facts = agentAPI.getFacts();

      // Gets alert patientId from facts
      const patientId: string =
        facts[BeliefKeys.PATIENT]?.[PatientAttributes.ALERT_PATIENT_ID];

      if (patientId) {
        // Alert Infos with vital and symptom report
        const alertDetails: AlertInfo[] = [];

        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Device is online: retrieves alerts of the current patient
          const query = await listPatientAlertsByDateTime({
            patientID: patientId,
            sortDirection: ModelSortDirection.DESC
          });

          if (query.data.listPatientAlertsByDateTime?.items) {
            const result = query.data.listPatientAlertsByDateTime
              .items as Alert[];
            if (result && result.length > 0) {
              // Alert Info without vitals and symptoms
              const alertInfos = alertToAlertInfo(result);

              // Get the current local alert history
              let localAlertHistory = await Storage.getAlertInfos();

              // If local alert history is null, add an empty object
              if (!localAlertHistory) {
                localAlertHistory = {};
              }
              // Retrieve the vitals and symptoms report
              await Promise.all(
                alertInfos.map(async (alert) => {
                  const alertInfo = queryAlertInfo(alert);
                  return alertInfo;
                })
              ).then((allAlertDetails) => {
                allAlertDetails.forEach((alertDetail) => {
                  if (alertDetail) {
                    alertDetails.push(alertDetail);
                    if (localAlertHistory) {
                      // If there's no alert history for the patient, add an entry for the patient
                      if (!localAlertHistory[alertDetail.patientID]) {
                        localAlertHistory[alertDetail.patientID] = {};
                      }
                      // Update the patient's alert history
                      localAlertHistory[alertDetail.patientID][alertDetail.id] =
                        alertDetail;
                    }
                  }
                });
              });
              // Store the updated alert histories into local storage
              if (localAlertHistory) {
                await Storage.setAlertInfos(localAlertHistory);
              }
            }
          }

          if (alertDetails.length > 0) {
            const sortedPatientAlerts = sortAlertsByDateTime(alertDetails);
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

        // Trigger request to dispatch alert history to UXSA for frontend display
        agent.addBelief(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.PATIENT_ALERT_HISTORY_RETRIEVED,
            true
          )
        );

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
    // Dispatch to frontend that the fetching of patient alert history has ended
    store.dispatch(setFetchingPatientAlertHistory(false));
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
