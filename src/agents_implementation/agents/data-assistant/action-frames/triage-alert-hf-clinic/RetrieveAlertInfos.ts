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
import { AlertInfo, AlertInfos } from "../../../../agent_framework/model";
import agentAPI from "../../../../agent_framework/AgentAPI";
import {
  listMedCompliantsByDate,
  getMedicationInfo,
  getActivityInfo,
  getReportVitals,
  getReportSymptom,
  getPatientInfo
} from "aws";
import { Alert, ModelSortDirection } from "aws/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RiskLevel } from "models/RiskLevel";

interface SortedAlerts {
  highRisk: Alert[];
  mediumRisk: Alert[];
  lowRisk: Alert[];
  unassignedRisk: Alert[];
}

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
      new Belief(BeliefKeys.PATIENT, PatientAttributes.ALERTS_SORTED, false)
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      // Gets sorted alerts from facts
      const sortedAlerts: SortedAlerts =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.SORTED_ALERTS
        ];

      // Checks whether device is online
      const isOnline =
        agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      // Retrieves local alerts to save new alerts locally
      const alertsStr = await AsyncStorage.getItem(AsyncStorageKeys.ALERTS);
      let localAlerts: LocalAlerts | null = null;
      if (alertsStr) {
        localAlerts = JSON.parse(alertsStr);
      }

      // Device is online
      if (sortedAlerts && isOnline) {
        const alertInfos: AlertInfos = {
          highRisk: [],
          mediumRisk: [],
          lowRisk: [],
          unassignedRisk: []
        };

        if (sortedAlerts.highRisk.length > 0) {
          await Promise.all(
            sortedAlerts.highRisk.map(async (alert) => {
              const result = await this.queryAlertInfo(alert, localAlerts);
              if (result && result.updatedLocalAlerts) {
                localAlerts = result.updatedLocalAlerts;
              }
              if (result && result.alertInfo) {
                result.alertInfo.riskLevel = RiskLevel.HIGH;
                if (alertInfos.highRisk) {
                  alertInfos.highRisk.push(result.alertInfo);
                } else {
                  alertInfos.highRisk = [result.alertInfo];
                }
              }
            })
          );
        }

        if (sortedAlerts.mediumRisk.length > 0) {
          await Promise.all(
            sortedAlerts.mediumRisk.map(async (alert) => {
              const result = await this.queryAlertInfo(alert, localAlerts);
              if (result && result.updatedLocalAlerts) {
                localAlerts = result.updatedLocalAlerts;
              }
              if (result && result.alertInfo) {
                result.alertInfo.riskLevel = RiskLevel.MEDIUM;
                if (alertInfos.mediumRisk) {
                  alertInfos.mediumRisk.push(result.alertInfo);
                } else {
                  alertInfos.mediumRisk = [result.alertInfo];
                }
              }
            })
          );
        }

        if (sortedAlerts.lowRisk.length > 0) {
          await Promise.all(
            sortedAlerts.lowRisk.map(async (alert) => {
              const result = await this.queryAlertInfo(alert, localAlerts);
              if (result && result.updatedLocalAlerts) {
                localAlerts = result.updatedLocalAlerts;
              }
              if (result && result.alertInfo) {
                result.alertInfo.riskLevel = RiskLevel.LOW;
                if (alertInfos.lowRisk) {
                  alertInfos.lowRisk.push(result.alertInfo);
                } else {
                  alertInfos.lowRisk = [result.alertInfo];
                }
              }
            })
          );
        }

        if (sortedAlerts.unassignedRisk.length > 0) {
          await Promise.all(
            sortedAlerts.unassignedRisk.map(async (alert) => {
              const result = await this.queryAlertInfo(alert, localAlerts);
              if (result && result.updatedLocalAlerts) {
                localAlerts = result.updatedLocalAlerts;
              }
              if (result && result.alertInfo) {
                result.alertInfo.riskLevel = RiskLevel.UNASSIGNED;
                if (alertInfos.unassignedRisk) {
                  alertInfos.unassignedRisk.push(result.alertInfo);
                } else {
                  alertInfos.unassignedRisk = [result.alertInfo];
                }
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

        // Adds alert infos to facts to be retrieved in DisplayAlert action frame of UXSA
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PATIENT,
            PatientAttributes.ALERT_INFOS,
            alertInfos
          ),
          false
        );
      }

      // Update Facts
      // Removes sorted alerts from facts
      agentAPI.addFact(
        new Belief(BeliefKeys.PATIENT, PatientAttributes.SORTED_ALERTS, null),
        false
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async queryAlertInfo(
    alert: Alert,
    localAlerts: { [k: string]: string } | null
  ): Promise<{
    alertInfo: AlertInfo;
    updatedLocalAlerts: { [k: string]: string } | null;
  } | null> {
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
      // LS-TODO: Figure out where to get HRV
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
      const patientInfoQuery = await getPatientInfo({
        patientID: alert.patientID
      });

      if (patientInfoQuery.data && patientInfoQuery.data.getPatientInfo) {
        alertInfo.patientInfo = patientInfoQuery.data.getPatientInfo;
      }

      // Queries verified medication intake in descending order of date to get latest medication
      const medCompliantQuery = await listMedCompliantsByDate({
        sortDirection: ModelSortDirection.DESC,
        patientID: alert.patientID,
        filter: { Verification: { eq: true } }
      });

      if (medCompliantQuery.data) {
        const results = medCompliantQuery.data.listMedCompliantByDate?.items;
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
      const activityInfoQuery = await getActivityInfo({
        id: alertSymptoms.ActId
      });
      if (activityInfoQuery.data) {
        const activityInfo = activityInfoQuery.data.getActivityInfo;
        alertInfo.activityDuringAlert = activityInfo?.Actname;
      }

      // Saves alert info locally using patientId as nested key
      if (localAlerts) {
        // One or more alerts of the current patient were stored previously
        if (localAlerts[alert.patientID]) {
          const patientAlerts: AlertInfo[] = JSON.parse(
            localAlerts[alert.patientID]
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
            localAlerts[alert.patientID] = JSON.stringify(patientAlerts);
          }
        } else {
          // No alert of the current patient has been stored previously
          localAlerts[alert.patientID] = JSON.stringify([alertInfo]);
        }
      }
      // Alert key does not exist
      else {
        localAlerts = {};
        localAlerts[alert.patientID] = JSON.stringify([alertInfo]);
      }
      return { alertInfo: alertInfo, updatedLocalAlerts: localAlerts };
    }
    return null;
  }
}

// Preconditions for activating the RetrieveAlertInfos class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.ALERTS_SORTED,
  true
);

// Action Frame for RetrieveAlertInfos class
const af_RetrieveAlertInfos = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_ALERT_INFOS}`,
  [rule1, rule2],
  new RetrieveAlertInfos()
);

export default af_RetrieveAlertInfos;
