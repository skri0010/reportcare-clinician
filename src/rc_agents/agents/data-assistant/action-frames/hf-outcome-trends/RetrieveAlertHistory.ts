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
import { listPatientAlertsByDateTime } from "aws";
import { AlertInfo } from "rc_agents/model";
import { Alert, ModelSortDirection } from "aws/API";
import { queryAlertInfo } from "../triage-alert-hf-clinic/RetrieveDetailedAlertInfo";
import { store } from "util/useRedux";
import { setFetchingPatientAlertHistory } from "ic-redux/actions/agents/actionCreator";
import { convertAlertsToAlertInfos } from "util/utilityFunctions";

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

      // Get patient id from facts
      const patientId: string =
        facts[BeliefKeys.PATIENT]?.[PatientAttributes.ALERT_PATIENT_ID];

      // Get online status from facts
      const isOnline: boolean = facts[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      if (patientId) {
        // AlertInfo[] with vitals and symptom reports
        let alertHistory: AlertInfo[] | undefined;

        if (isOnline) {
          // Device is online

          // Retrieve alerts for patient
          const query = await listPatientAlertsByDateTime({
            patientID: patientId,
            sortDirection: ModelSortDirection.DESC
          });

          if (query.data.listPatientAlertsByDateTime?.items) {
            // Get alerts without full details
            const alerts: Alert[] =
              query.data.listPatientAlertsByDateTime.items.flatMap((item) =>
                item ? [item] : []
              );
            if (alerts) {
              // Get alerts with full details
              alertHistory = await Promise.all(
                alerts.map(async (alert) => {
                  return queryAlertInfo(alert);
                })
              )
                .then((values) =>
                  values.flatMap((value) => (value ? [value] : []))
                )
                .then((values) => convertAlertsToAlertInfos(values));

              if (alertHistory) {
                // Store alert history
                await LocalStorage.setAlertInfos(alertHistory);
              }
            }
          }
        } else {
          // Device is offline: get alert infos of current patient from local storage
          const localAlertInfos = await LocalStorage.getAlertInfosByPatientId(
            patientId
          );
          if (localAlertInfos) {
            alertHistory = localAlertInfos;
          }
        }

        if (alertHistory) {
          // Update Facts
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.ALERT_HISTORY,
              alertHistory
            ),
            false
          );
          // Trigger request to dispatch alert history to UXSA for frontend display
          agent.addBelief(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.PATIENT_ALERT_HISTORY_RETRIEVED,
              true
            )
          );
        }

        // Remove item
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

      // Update Facts
      // End the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.HF_OTP_II,
          ProcedureConst.INACTIVE
        ),
        true,
        true
      );
      // Dispatch to store to indicate fetching has ended
      store.dispatch(setFetchingPatientAlertHistory(false));
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
