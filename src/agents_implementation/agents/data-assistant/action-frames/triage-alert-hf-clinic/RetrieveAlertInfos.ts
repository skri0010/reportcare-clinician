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
  ClinicianAttributes,
  CommonAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "../../../../agent_framework/AgentEnums";
import { AlertColorCode, AlertInfo } from "../../../../agent_framework/model";
import agentAPI from "../../../../agent_framework/AgentAPI";
import {
  listMedCompliantsByDate,
  getMedicationInfo,
  getActivityInfo,
  getReportVitals,
  getReportSymptom,
  getPatientInfo,
  AlertStatus
} from "aws";
import { Alert, ModelSortDirection } from "aws/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RiskLevel } from "models/RiskLevel";

interface LocalAlerts {
  [k: string]: string;
}

/**
 * Class to represent an activity for retrieving patient's information associated with the sorted alerts.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RetrieveAlertInfos extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_ALERT_INFOS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);

    // Update Beliefs
    agent.addBelief(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ALERTS_SORTED, false)
    );

    try {
      const facts = agentAPI.getFacts();
      let alertInfos: AlertInfo[] = [];

      if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
        // Device is online: get alerts from facts
        const alerts: Alert[] =
          facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.SORTED_ALERTS];

        // Retrieves local alerts to save new alerts locally
        const alertsStr = await AsyncStorage.getItem(AsyncStorageKeys.ALERTS);
        let localAlerts: LocalAlerts | null = null;
        if (alertsStr) {
          localAlerts = JSON.parse(alertsStr);
        }

        if (alerts) {
          await Promise.all(
            alerts.map(async (alert) => {
              const alertInfo = await this.queryAlertInfo(alert);
              if (alertInfo) {
                alertInfos.push(alertInfo);
                localAlerts = this.mergeLocalAlerts(alertInfo, localAlerts);
              }
            })
          );
        }

        // Saves alert infos locally
        if (localAlerts) {
          await AsyncStorage.setItem(
            AsyncStorageKeys.ALERTS,
            JSON.stringify(localAlerts)
          );
        }
      } else {
        // Device is offline: get alert infos from facts
        alertInfos =
          facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.SORTED_ALERTS];
      }

      if (alertInfos && alertInfos.length > 0) {
        // Adds alert infos to facts to be retrieved in DisplayAlerts action frame of UXSA
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.ALERT_INFOS,
            alertInfos
          ),
          false
        );
      }

      // Update Facts
      // Removes sorted alerts from facts
      agentAPI.addFact(
        new Belief(
          BeliefKeys.CLINICIAN,
          ClinicianAttributes.SORTED_ALERTS,
          null
        ),
        false
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Updates belief last to prevent RequestAlertsDisplay from being triggered early
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async queryAlertInfo(alert: Alert): Promise<AlertInfo | null> {
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
      // LS-TODO: To include HRV
      const alertInfo: AlertInfo = {
        id: alert.id,
        patientId: alert.patientID,
        patientName: alert.patientName,
        dateTime: alert.dateTime,
        summary: alert.summary,
        vitals: alertVitals,
        symptoms: alertSymptoms,
        completed: alert.completed === AlertStatus.COMPLETED
      };

      // Assigns risk level according to color code
      switch (alert.colorCode) {
        case AlertColorCode.HIGH:
          alertInfo.riskLevel = RiskLevel.HIGH;
          break;
        case AlertColorCode.MEDIUM:
          alertInfo.riskLevel = RiskLevel.MEDIUM;
          break;
        case AlertColorCode.LOW:
          alertInfo.riskLevel = RiskLevel.LOW;
          break;
        case AlertColorCode.UNASSIGNED:
          alertInfo.riskLevel = RiskLevel.UNASSIGNED;
          break;
        default:
          alertInfo.riskLevel = RiskLevel.UNASSIGNED;
          break;
      }

      // Queries patientInfo to get diagnosis and NHYA class
      const patientInfoQuery = await getPatientInfo({
        patientID: alert.patientID
      });

      if (patientInfoQuery.data && patientInfoQuery.data.getPatientInfo) {
        const patientInfo = patientInfoQuery.data.getPatientInfo;
        alertInfo.diagnosis = patientInfo.diagnosisInfo;
        alertInfo.NHYAClass = patientInfo.NHYAclass;
      }

      // Queries verified medication intake in descending order of date to get latest medication
      const medCompliantQuery = await listMedCompliantsByDate({
        sortDirection: ModelSortDirection.DESC,
        patientID: alert.patientID,
        filter: { Verification: { eq: true } }
      });

      if (medCompliantQuery.data) {
        const results = medCompliantQuery.data.listMedCompliantsByDate?.items;
        if (results && results.length > 0) {
          const latestMedCompliant = results[0];

          // Queries medication and dosage
          if (latestMedCompliant) {
            const medicationInfoQuery = await getMedicationInfo({
              id: latestMedCompliant.MedId
            });
            if (medicationInfoQuery.data) {
              const medicationInfo = medicationInfoQuery.data.getMedicationInfo;
              alertInfo.lastMedication = medicationInfo?.medname;
              alertInfo.medicationQuantity = medicationInfo?.dosage;
            }
          }
        }
      }

      // Queries activity associated with symptom report
      if (alertSymptoms.ActivityInfo) {
        alertInfo.activityDuringAlert = alertSymptoms.ActivityInfo.Actname;
        // Prevents the entire ActivityInfo from being stored locally
        delete alertInfo.symptoms?.ActivityInfo;
      } else {
        const activityInfoQuery = await getActivityInfo({
          id: alertSymptoms.ActId
        });
        if (activityInfoQuery.data) {
          const activityInfo = activityInfoQuery.data.getActivityInfo;
          alertInfo.activityDuringAlert = activityInfo?.Actname;
        }
      }

      return alertInfo;
    }
    return null;
  }

  /**
   * Merges current alert info into localAlerts JSON for local storage.
   * @param alertInfo current alert info
   * @param localAlerts localAlerts JSON
   * @returns merged localAlerts JSON
   */
  // eslint-disable-next-line class-methods-use-this
  mergeLocalAlerts(alertInfo: AlertInfo, localAlerts: LocalAlerts | null) {
    // Saves alert info locally using patientId as nested key
    if (localAlerts) {
      // One or more alerts of the current patient were stored previously
      if (localAlerts[alertInfo.patientId]) {
        const patientAlerts: AlertInfo[] = JSON.parse(
          localAlerts[alertInfo.patientId]
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
          localAlerts[alertInfo.patientId] = JSON.stringify(patientAlerts);
        }
      } else {
        // No alert of the current patient has been stored previously
        localAlerts[alertInfo.patientId] = JSON.stringify([alertInfo]);
      }
    }
    // Alert key does not exist
    else {
      localAlerts = {};
      localAlerts[alertInfo.patientId] = JSON.stringify([alertInfo]);
    }

    return localAlerts;
  }
}

// Preconditions for activating the RetrieveAlertInfos class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.ALERTS_SORTED,
  true
);

// Action Frame for RetrieveAlertInfos class
const af_RetrieveAlertInfos = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_ALERT_INFOS}`,
  [rule1, rule2],
  new RetrieveAlertInfos()
);

export default af_RetrieveAlertInfos;
