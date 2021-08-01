import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import {
  ActionFrameIDs,
  AppAttributes,
  AsyncStorageKeys,
  BeliefKeys,
  CommonAttributes,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "../../../../agent_framework/AgentEnums";
import { AlertInfo } from "../../../../agent_framework/model";
import agentAPI from "../../../../agent_framework/AgentAPI";
import {
  listPatientInfos,
  listMedCompliantsByDate,
  getMedicationInfo,
  getActivityInfo,
  getReportVitals,
  getReportSymptom
} from "aws";
import { Alert, ModelSortDirection } from "aws/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Class to represent an activity for retrieving patient's information associated with an alert.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RetrieveAlertInfo extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_ALERT_INFO);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);

    // Update Beliefs
    agent.addBelief(
      new Belief(BeliefKeys.PATIENT, PatientAttributes.ALERT_SORTED, false)
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      // Gets sorted alert from facts
      const alert: Alert =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[PatientAttributes.ALERT];
      const isOnline =
        agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      // Device is offline
      if (alert && isOnline) {
        // Ensures vitals and symptoms are present
        let alertVitals = alert.vitalsReport;
        let alertSymptoms = alert.symptomReport;

        // Retrieves vitals
        if (!alertVitals) {
          const query = await getReportVitals({ id: alert.vitalsReportID });
          if (query.data && query.data.getReportVitals) {
            alertVitals = query.data.getReportVitals;
          }
        }

        // Retrieves symptoms
        if (!alertSymptoms) {
          const query = await getReportSymptom({ id: alert.symptomReportID });
          if (query.data && query.data.getReportSymptom) {
            alertSymptoms = query.data.getReportSymptom;
          }
        }

        if (alertVitals && alertSymptoms) {
          /**
           * LS-TODO:
           * 1. Figure out where to get HRV
           * 2. Clarify severity of ReportSymptom vs severity of Alert
           */
          const alertInfo: AlertInfo = {
            id: alert.id,
            patientId: alert.patientID,
            dateTime: alert.dateTime,
            summary: alert.summary,
            vitals: alertVitals,
            symptoms: alertSymptoms,
            completed: alert.completed
          };

          // Queries patientInfo
          const patientInfoQuery = await listPatientInfos({
            filter: { patientID: { eq: alert.patientID } }
          });

          if (patientInfoQuery.data) {
            const results = patientInfoQuery.data.listPatientInfos?.items;
            if (results && results.length > 0) {
              const patientInfo = results[0];
              if (patientInfo) {
                alertInfo.patientInfo = patientInfo;
              }
            }
          }

          // Queries verified medication intake in descending order of date to get latest medication
          const medCompliantQuery = await listMedCompliantsByDate({
            sortDirection: ModelSortDirection.DESC,
            patientID: alert.patientID,
            filter: { Verification: { eq: true } }
          });

          if (medCompliantQuery.data) {
            const results =
              medCompliantQuery.data.listMedCompliantByDate?.items;
            if (results && results.length > 0) {
              const latestMedCompliant = results[0];

              // Queries medication and dosage
              if (latestMedCompliant) {
                const medicationInfoQuery = await getMedicationInfo({
                  id: latestMedCompliant.MedId
                });
                if (medicationInfoQuery.data) {
                  const medicationInfo =
                    medicationInfoQuery.data.getMedicationInfo;
                  alertInfo.lastMedication = medicationInfo?.medname;
                  alertInfo.medicationQuantity = medicationInfo?.dosage;
                }
              }
            }
          }

          // Queries activity associated with symptom report
          const activityInfoQuery = await getActivityInfo({
            id: alertSymptoms.ActId
          });
          if (activityInfoQuery.data) {
            const activityInfo = activityInfoQuery.data.getActivityInfo;
            alertInfo.activityDuringAlert = activityInfo?.Actname;
          }

          // Saves alert info locally using patientId as nested key
          const alertsStr = await AsyncStorage.getItem(AsyncStorageKeys.ALERTS);
          let alerts: { [k: string]: string };

          // Alert key exists
          if (alertsStr) {
            alerts = JSON.parse(alertsStr);

            // One or more alerts of the current patient were stored previously
            if (alerts[alert.patientID]) {
              const patientAlerts: AlertInfo[] = JSON.parse(
                alerts[alert.patientID]
              );

              // Checks if alert already exists
              let existingAlert = false;
              patientAlerts.forEach((patientAlert) => {
                if (patientAlert.id === alertInfo.id) {
                  patientAlert = alertInfo;
                  existingAlert = true;
                }
              });

              // Push non existing alert into the list
              if (!existingAlert) {
                patientAlerts.push(alertInfo);
                alerts[alert.patientID] = JSON.stringify(patientAlerts);
              }
            } else {
              // No alert of the current patient has been stored previously
              alerts[alert.patientID] = JSON.stringify([alertInfo]);
            }
          }
          // Alert key does not exist
          else {
            alerts = {};
            alerts[alert.patientID] = JSON.stringify([alertInfo]);
          }

          if (alerts) {
            await AsyncStorage.setItem(
              AsyncStorageKeys.ALERTS,
              JSON.stringify(alerts)
            );
          }

          // Adds alert info to facts to be retrieved in DisplayAlert action frame of UXSA
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.ALERT_INFO,
              alertInfo
            ),
            false
          );
        }
      }
      // Devices is offline
      else if (alert && !isOnline) {
        let localPatientAlert: AlertInfo | undefined;

        // Retrieves all stored alerts
        const alertsStr = await AsyncStorage.getItem(AsyncStorageKeys.ALERTS);
        if (alertsStr) {
          const localAlerts = JSON.parse(alertsStr);

          // Retrieves stored alerts for current patient
          const patientAlertsStr = localAlerts[alert.patientID];
          if (patientAlertsStr) {
            // Checks if the requested alert is previously stored
            const localPatientAlerts: AlertInfo[] =
              JSON.parse(patientAlertsStr);
            localPatientAlerts.forEach((localAlert) => {
              if (alert.id === localAlert.id) {
                localPatientAlert = localAlert;
              }
            });
          }
        }

        if (localPatientAlert) {
          // Adds alert info to facts to be retrieved in DisplayAlert action frame of UXSA
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PATIENT,
              PatientAttributes.ALERT_INFO,
              localPatientAlert
            ),
            false
          );
        }
      }

      // Update Facts
      // Removes alert from facts
      agentAPI.addFact(
        new Belief(BeliefKeys.PATIENT, PatientAttributes.ALERT, null),
        false
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions for activating the RetrieveAlertInfo class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.ALERT_SORTED,
  true
);

// Action Frame for RetrieveAlertInfo class
const af_RetrieveAlertInfo = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_ALERT_INFO}`,
  [rule1, rule2],
  new RetrieveAlertInfo()
);

export default af_RetrieveAlertInfo;
