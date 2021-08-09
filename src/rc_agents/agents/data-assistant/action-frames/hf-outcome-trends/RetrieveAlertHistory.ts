import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  AppAttributes,
  AsyncStorageKeys,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import agentAPI from "rc_agents/framework/AgentAPI";
import { listPatientAlertsByDateTime } from "aws";
import { AlertInfo } from "rc_agents/model";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ModelSortDirection } from "aws/API";
import {
  queryAlertInfo,
  mergeIntoLocalAlertInfos
} from "../triage-alert-hf-clinic/RetrieveAlertInfo";
import { sortAlertsByDateTime } from "../triage-alert-hf-clinic/RetrieveAlerts";

interface LocalAlertInfos {
  [patientId: string]: string;
}

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
        // Retrieves locally stored alert infos
        let alertInfosJSON = await AsyncStorage.getItem(
          AsyncStorageKeys.ALERT_INFOS
        );
        const alertInfos: AlertInfo[] = [];

        if (facts[BeliefKeys.APP][AppAttributes.ONLINE]) {
          // Device is online: retrieves alerts of the current patient
          const query = await listPatientAlertsByDateTime({
            patientID: patientId,
            sortDirection: ModelSortDirection.DESC
          });

          if (query.data && query.data.listPatientAlertsByDateTime?.items) {
            const result = query.data.listPatientAlertsByDateTime.items;
            if (result && result.length > 0) {
              await Promise.all(
                result.map(async (alert) => {
                  const alertInfo = await queryAlertInfo(alert!);
                  if (alertInfo) {
                    alertInfos.push(alertInfo);
                    alertInfosJSON = await mergeIntoLocalAlertInfos(
                      alertInfo,
                      alertInfosJSON
                    );
                  }
                })
              );
              if (alertInfosJSON) {
                // Saves updated JSON into local storage
                await AsyncStorage.setItem(
                  AsyncStorageKeys.ALERT_INFOS,
                  alertInfosJSON
                );
              }
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
        } else if (alertInfosJSON) {
          // Device is offline: get alert infos of current patient from local storage
          const patientAlerts = await this.retrieveLocalPatientAlerts(
            alertInfosJSON,
            patientId
          );
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

  /**
   * Gets locally stored alert infos of a patient.
   * @param alertInfosJSON locally stored JSON string
   * @param patientId patient Id
   * @returns a list of alert infos if any
   */
  // eslint-disable-next-line class-methods-use-this
  async retrieveLocalPatientAlerts(
    alertInfosJSON: string,
    patientId: string
  ): Promise<AlertInfo[] | null> {
    const alertInfos: LocalAlertInfos = JSON.parse(alertInfosJSON);
    const patientAlertsJSON = alertInfos[patientId];
    if (patientAlertsJSON) {
      return JSON.parse(patientAlertsJSON);
    }
    return null;
  }
}

// Rules or preconditions for activating the RetrieveAlertHistory class
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

// Actionframe of the RetrieveAlertHistory class
export const af_RetrieveAlertHistory = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_ALERT_HISTORY}`,
  [rule1, rule2],
  new RetrieveAlertHistory()
);
