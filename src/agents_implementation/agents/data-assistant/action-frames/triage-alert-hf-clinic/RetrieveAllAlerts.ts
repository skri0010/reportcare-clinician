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
import {
  AlertColorCode,
  AlertInfo,
  AlertInfos
} from "../../../../agent_framework/model";
import agentAPI from "../../../../agent_framework/AgentAPI";
import { getPatientInfo, listAlertsByDateTime } from "aws";
import { Alert, ModelSortDirection, PatientInfo } from "aws/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mockAlerts } from "mock/mockAlerts";

interface LocalAlerts {
  [k: string]: string;
}

// LS-TODO: To be tested again once actual Alerts are available.

/**
 * Class to represent an activity for retrieving patient's information associated with the sorted alerts.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RetrieveAllAlerts extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_ALL_ALERTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);

    // Update Beliefs
    agent.addBelief(
      new Belief(BeliefKeys.PATIENT, PatientAttributes.RETRIEVE_ALERTS, false)
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      // Checks whether device is online
      const isOnline =
        agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      // Device is online
      if (isOnline) {
        let results: (Alert | undefined | null)[] | undefined | null;

        const query = await listAlertsByDateTime({
          sortDirection: ModelSortDirection.DESC,
          filter: { completed: { eq: false } }
        });

        if (query.data && query.data.listAlertsByDateTime) {
          results = query.data.listAlertsByDateTime.items;
        } else {
          results = mockAlerts;
        }

        if (results && results.length > 0) {
          const alertInfos: AlertInfos = {
            highRisk: [],
            mediumRisk: [],
            lowRisk: [],
            unassignedRisk: []
          };

          // Retrieves local alerts to save current alerts locally
          const alertsStr = await AsyncStorage.getItem(AsyncStorageKeys.ALERTS);
          let localAlerts: LocalAlerts | null = null;
          if (alertsStr) {
            localAlerts = JSON.parse(alertsStr);
          }

          await Promise.all(
            results.map(async (result) => {
              switch (result?.colorCode) {
                case AlertColorCode.HIGH: {
                  // eslint-disable-next-line no-case-declarations
                  const patient = await this.queryPatientInfo(result.patientID);
                  if (patient) {
                    const alertInfo = {
                      id: result.id,
                      patientId: result.patientID,
                      patientInfo: patient,
                      dateTime: result.dateTime,
                      completed: result.completed,
                      summary: result.summary
                    };
                    alertInfos.highRisk.push(alertInfo);
                    localAlerts = this.storeCurrentAlert(
                      alertInfo,
                      localAlerts
                    );
                  }
                  break;
                }
                case AlertColorCode.MEDIUM: {
                  // eslint-disable-next-line no-case-declarations
                  const patient = await this.queryPatientInfo(result.patientID);
                  if (patient) {
                    const alertInfo = {
                      id: result.id,
                      patientId: result.patientID,
                      patientInfo: patient,
                      dateTime: result.dateTime,
                      completed: result.completed,
                      summary: result.summary
                    };
                    alertInfos.mediumRisk.push(alertInfo);
                    localAlerts = this.storeCurrentAlert(
                      alertInfo,
                      localAlerts
                    );
                  }
                  break;
                }
                case AlertColorCode.LOW: {
                  // eslint-disable-next-line no-case-declarations
                  const patient = await this.queryPatientInfo(result.patientID);
                  if (patient) {
                    const alertInfo = {
                      id: result.id,
                      patientId: result.patientID,
                      patientInfo: patient,
                      dateTime: result.dateTime,
                      completed: result.completed,
                      summary: result.summary
                    };
                    alertInfos.lowRisk.push(alertInfo);
                    localAlerts = this.storeCurrentAlert(
                      alertInfo,
                      localAlerts
                    );
                  }
                  break;
                }
                case AlertColorCode.UNASSIGNED: {
                  // eslint-disable-next-line no-case-declarations
                  const patient = await this.queryPatientInfo(result.patientID);
                  if (patient) {
                    const alertInfo = {
                      id: result.id,
                      patientId: result.patientID,
                      patientInfo: patient,
                      dateTime: result.dateTime,
                      completed: result.completed,
                      summary: result.summary
                    };
                    alertInfos.unassignedRisk.push(alertInfo);
                    localAlerts = this.storeCurrentAlert(
                      alertInfo,
                      localAlerts
                    );
                  }
                  break;
                }
                default:
                  break;
              }
            })
          );

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
  async queryPatientInfo(patientID: string): Promise<PatientInfo | null> {
    const query = await getPatientInfo({ patientID: patientID });
    if (query.data && query.data.getPatientInfo) {
      return query.data.getPatientInfo;
    }
    return null;
  }

  // eslint-disable-next-line class-methods-use-this
  storeCurrentAlert(alertInfo: AlertInfo, localAlerts: LocalAlerts | null) {
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

// Preconditions for activating the RetrieveAllAlerts class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.RETRIEVE_ALERTS,
  true
);

// Action Frame for RetrieveAllAlerts class
const af_RetrieveAllAlerts = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_ALL_ALERTS}`,
  [rule1, rule2],
  new RetrieveAllAlerts()
);

export default af_RetrieveAllAlerts;
