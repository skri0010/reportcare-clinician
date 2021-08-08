import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys,
  ClinicianAttributes,
  CommonAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import { AsyncStorageKeys } from "rc_agents/storage";
import agentAPI from "rc_agents/framework/AgentAPI";
import { mockCompletedAlerts, mockPendingAlerts } from "mock/mockAlerts";
import {
  AlertStatus,
  listCompletedRiskAlerts,
  listPendingRiskAlerts
} from "aws";
import { AlertColorCode, AlertInfo } from "rc_agents/model";
import { RiskLevel } from "models/RiskLevel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "aws/API";

// LS-TODO: To be tested with actual Alerts

/**
 * Class to represent the activity for retrieving alerts.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RetrieveAlerts extends Activity {
  /**
   * Constructor for the RetrieveAlerts class
   */
  constructor() {
    super(ActionFrameIDs.MHA.RETRIEVE_ALERTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent);

    // Update beliefs to stop the procedure from repeating
    agent.addBelief(
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.RETRIEVE_ALERTS,
        false
      )
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      const facts = agentAPI.getFacts();

      // Gets alert status and risk level from facts
      const alertStatus: AlertStatus =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.ALERT_STATUS];

      const alertRiskLevel: RiskLevel =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.ALERT_RISK_LEVEL];

      // Retrieves all alerts with a specific status and risk level
      if (alertStatus && alertRiskLevel) {
        if (facts[BeliefKeys.APP][AppAttributes.ONLINE]) {
          // Device is online

          // Maps risk level to color code for query
          let alertColorCode: AlertColorCode | undefined;
          switch (alertRiskLevel) {
            case RiskLevel.HIGH:
              alertColorCode = AlertColorCode.HIGH;
              break;
            case RiskLevel.MEDIUM:
              alertColorCode = AlertColorCode.MEDIUM;
              break;
            case RiskLevel.LOW:
              alertColorCode = AlertColorCode.LOW;
              break;
            case RiskLevel.UNASSIGNED:
              alertColorCode = AlertColorCode.UNASSIGNED;
              break;
            default:
              break;
          }

          let alerts: (Alert | null)[] | undefined;
          // Pending alerts
          if (alertStatus === AlertStatus.PENDING && alertColorCode) {
            const query = await listPendingRiskAlerts({
              pending: AlertStatus.PENDING,
              colorCode: { eq: alertColorCode }
            });
            if (query.data && query.data.listPendingRiskAlerts) {
              const result = query.data.listPendingRiskAlerts.items;
              if (result && result.length > 0) {
                alerts = result;
              } else {
                // LS-TODO: To be removed
                switch (alertColorCode) {
                  case AlertColorCode.HIGH:
                    alerts = mockPendingAlerts.splice(0, 2);
                    break;
                  case AlertColorCode.MEDIUM:
                    alerts = mockPendingAlerts.splice(2, 1);
                    break;
                  default:
                    break;
                }
              }
            }
          }
          // Completed alerts
          else if (alertStatus === AlertStatus.COMPLETED && alertColorCode) {
            const query = await listCompletedRiskAlerts({
              completed: AlertStatus.COMPLETED,
              colorCode: { eq: alertColorCode }
            });
            if (query.data && query.data.listCompletedRiskAlerts) {
              const result = query.data.listCompletedRiskAlerts.items;
              if (result && result.length > 0) {
                alerts = result;
              } else {
                // LS-TODO: To be removed
                switch (alertColorCode) {
                  case AlertColorCode.HIGH:
                    alerts = mockCompletedAlerts.splice(0, 1);
                    break;
                  case AlertColorCode.MEDIUM:
                    alerts = mockCompletedAlerts.splice(1, 1);
                    break;
                  case AlertColorCode.LOW:
                    alerts = mockCompletedAlerts.splice(2, 1);
                    break;
                  default:
                    break;
                }
              }
            }
          }

          if (alerts) {
            // LS-TODO: Previously using Alerts_To_Sort key to be sorted by SortAlerts of ALA first
            // Broadcast alert to facts to be used by RetrieveAlertInfos action frame of DTA.
            agentAPI.addFact(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.SORTED_ALERTS,
                alerts
              ),
              false
            );
          }
        } else {
          // Device is offline
          const localAlertInfos = await this.retrieveLocalAlerts(
            alertStatus,
            alertRiskLevel
          );
          if (localAlertInfos) {
            agentAPI.addFact(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.SORTED_ALERTS,
                localAlertInfos
              ),
              false
            );
          }
        }

        // Removes alert status and risk level from facts
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.ALERT_STATUS,
            null
          ),
          false
        );
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.ALERT_RISK_LEVEL,
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

  // eslint-disable-next-line class-methods-use-this
  async retrieveLocalAlerts(
    alertStatus: AlertStatus,
    riskLevel: RiskLevel
  ): Promise<AlertInfo[] | null> {
    // Maps alert status to completed
    let completed: boolean | undefined;
    switch (alertStatus) {
      case AlertStatus.PENDING:
        completed = false;
        break;
      case AlertStatus.COMPLETED:
        completed = true;
        break;
      default:
        break;
    }

    if (completed !== undefined) {
      const alertsStr = await AsyncStorage.getItem(AsyncStorageKeys.ALERTS);
      if (alertsStr) {
        const localAlerts = JSON.parse(alertsStr);
        const localAlertInfos: AlertInfo[] = [];
        Object.keys(localAlerts).forEach((key) => {
          const patientAlerts: AlertInfo[] = JSON.parse(localAlerts[key]);
          patientAlerts.forEach((alert) => {
            if (
              alert.completed === completed &&
              alert.riskLevel === riskLevel
            ) {
              localAlertInfos.push(alert);
            }
          });
        });
        return localAlertInfos;
      }
    }

    return null;
  }
}

// Rules or preconditions for activating the RetrieveAlerts class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_ALERTS,
  true
);

// Actionframe of the RetrieveAlerts class
export const af_RetrieveAlerts = new Actionframe(
  `AF_${ActionFrameIDs.MHA.RETRIEVE_ALERTS}`,
  [rule1, rule2],
  new RetrieveAlerts()
);
