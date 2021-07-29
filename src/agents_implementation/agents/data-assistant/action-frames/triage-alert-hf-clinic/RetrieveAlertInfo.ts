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
import { Alert, AlertInfo } from "../../../../agent_framework/model";
import agentAPI from "../../../../agent_framework/AgentAPI";
import {
  listPatientInfos,
  listMedCompliantsByDate,
  getMedicationInfo,
  getActivityInfo
} from "aws";
import { ModelSortDirection } from "aws/API";
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

      if (alert && isOnline) {
        const alertInfo: AlertInfo = {
          patientId: alert.patientId,
          alertDateTime: alert.dateTime
        };

        // Queries patientInfo to get diagnosis and NHYA class
        const patientInfoQuery = await listPatientInfos({
          filter: { patientID: { eq: alert.patientId } }
        });

        if (patientInfoQuery.data) {
          const results = patientInfoQuery.data.listPatientInfos?.items;
          if (results && results.length > 0) {
            const patientInfo = results[0];
            alertInfo.NHYAclass = patientInfo?.NHYAclass;
            alertInfo.diagnosis = patientInfo?.diagnosisInfo;
          }
        }

        // Queries verified medication intake in descending order of date
        const medCompliantQuery = await listMedCompliantsByDate({
          sortDirection: ModelSortDirection.DESC,
          patientID: alert.patientId,
          filter: { Verification: { eq: true } }
        });

        if (medCompliantQuery.data) {
          const results = medCompliantQuery.data.listMedCompliantsByDate?.items;
          if (results && results.length > 0) {
            const latestMedCompliant = results[0];

            // Queries medication and dosage
            const medicationInfoQuery = await getMedicationInfo({
              id: latestMedCompliant?.MedId
            });
            if (medicationInfoQuery.data) {
              const medicationInfo = medicationInfoQuery.data.getMedicationInfo;
              alertInfo.lastMedication = medicationInfo?.medname;
              alertInfo.medicationQuantity = medicationInfo?.dosage;
            }
          }
        }

        // Queries activity associated with symptom report
        const activityInfoQuery = await getActivityInfo({
          id: alert.symptomsReport.ActId
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
          if (alerts[alert.patientId]) {
            const patientAlerts: AlertInfo[] = JSON.parse(
              alerts[alert.patientId]
            );

            // Checks if alert already exists
            let existingAlert = false;
            patientAlerts.forEach((patientAlert) => {
              if (patientAlert.alertDateTime === alertInfo.alertDateTime) {
                existingAlert = true;
              }
            });

            // Push non existing alert into the list
            if (!existingAlert) {
              patientAlerts.push(alertInfo);
              alerts[alert.patientId] = JSON.stringify(patientAlerts);
            }
          } else {
            // No alert of the current patient has been stored previously
            alerts[alert.patientId] = JSON.stringify([alertInfo]);
          }
        }
        // Alert key does not exist
        else {
          alerts = {};
          alerts[alert.patientId] = JSON.stringify([alertInfo]);
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
