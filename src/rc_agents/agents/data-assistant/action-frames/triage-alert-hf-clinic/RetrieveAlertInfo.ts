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
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import { AsyncStorageKeys } from "rc_agents/storage";
import { AlertColorCode, AlertInfo } from "rc_agents/model";
import agentAPI from "rc_agents/framework/AgentAPI";
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

interface LocalAlertInfos {
  [patientId: string]: string;
}

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
    await super.doActivity(agent, [rule2]);

    try {
      const facts = agentAPI.getFacts();

      // Retrieves alert from facts
      const alert: Alert =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.ALERT];

      if (alert) {
        let alertInfo: AlertInfo | null | undefined;

        // Retrieves local alerts to save new alert locally
        let alertInfosJSON = await AsyncStorage.getItem(
          AsyncStorageKeys.ALERT_INFOS
        );

        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Device is online: queries information associated with the alert
          const queryResult = await queryAlertInfo(alert);
          if (queryResult) {
            alertInfo = queryResult;
            alertInfosJSON = await mergeIntoLocalAlertInfos(
              queryResult,
              alertInfosJSON
            );
            // Saves updated JSON into local storage
            await AsyncStorage.setItem(
              AsyncStorageKeys.ALERT_INFOS,
              alertInfosJSON
            );
          }
        } else if (alertInfosJSON) {
          // Device is offline: get alert info from local storage
          alertInfo = await this.retrieveLocalAlertInfo(alertInfosJSON, alert);
        }

        if (alertInfo) {
          // Adds alert info to facts to be retrieved in DisplayAlertInfo action frame of UXSA
          agentAPI.addFact(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.ALERT_INFO,
              alertInfo
            ),
            false
          );
        }
      }

      // Update Facts
      // Removes alert from facts
      agentAPI.addFact(
        new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ALERT, null),
        false
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async retrieveLocalAlertInfo(
    alertInfosJSON: string,
    alert: Alert
  ): Promise<AlertInfo | undefined | null> {
    const alertInfos: LocalAlertInfos = JSON.parse(alertInfosJSON);
    if (alertInfos[alert.patientID]) {
      const patientAlertInfos: AlertInfo[] = JSON.parse(
        alertInfos[alert.patientID]
      );
      return patientAlertInfos.find((a) => a.id === alert.id);
    }
    return null;
  }
}

/**
 * Merges current alert info into alertInfoJSON for local storage.
 * @param alertInfo current alert info
 * @param alertInfoJSON localAlertInfos JSON
 * @returns merged localAlertsInfos JSON
 */
// eslint-disable-next-line class-methods-use-this
export const mergeIntoLocalAlertInfos = async (
  alertInfo: AlertInfo,
  alertInfoJSON: string | null
): Promise<string> => {
  let localAlertInfos: LocalAlertInfos;

  // Saves alert info locally using patientId as nested key
  if (alertInfoJSON) {
    localAlertInfos = JSON.parse(alertInfoJSON);
    // One or more alert infos of the current patient were stored previously
    if (localAlertInfos[alertInfo.patientId]) {
      const patientAlertInfos: AlertInfo[] = JSON.parse(
        localAlertInfos[alertInfo.patientId]
      );

      // Replaces existing alert info, otherwise inserts into the list
      const existIndex = patientAlertInfos.findIndex(
        (a) => a.id === alertInfo.id
      );
      if (existIndex >= 0) {
        patientAlertInfos[existIndex] = alertInfo;
      } else {
        patientAlertInfos.push(alertInfo);
      }
      localAlertInfos[alertInfo.patientId] = JSON.stringify(patientAlertInfos);
    } else {
      // No alert info of the current patient exists
      localAlertInfos[alertInfo.patientId] = JSON.stringify([alertInfo]);
    }
  }
  // Alert info key does not exist
  else {
    localAlertInfos = {};
    localAlertInfos[alertInfo.patientId] = JSON.stringify([alertInfo]);
  }

  return JSON.stringify(localAlertInfos);
};

export const queryAlertInfo = async (
  alert: Alert
): Promise<AlertInfo | null> => {
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
};

// Preconditions for activating the RetrieveAlertInfo class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_ALERT_INFO,
  true
);

// Action Frame for RetrieveAlertInfo class
export const af_RetrieveAlertInfo = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_ALERT_INFO}`,
  [rule1, rule2],
  new RetrieveAlertInfo()
);
