import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import { ProcedureConst } from "rc_agents/framework/Enums";
import agentAPI from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { Storage } from "rc_agents/storage";
import { mockCompletedAlerts, mockPendingAlerts } from "mock/mockAlerts";
import { listCompletedRiskAlerts, listPendingRiskAlerts } from "aws";
import { AlertColorCode, AlertInfo, AlertStatus } from "rc_agents/model";
import { RiskLevel } from "models/RiskLevel";
import { Alert } from "aws/API";

// LS-TODO: To be tested with actual Alerts.
// NOTE: This is originally MHA's action frame.

/**
 * Class to represent the activity for retrieving alerts.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RetrieveAlerts extends Activity {
  /**
   * Constructor for the RetrieveAlerts class
   */
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_ALERTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

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
          const alertColorCode: AlertColorCode =
            mapRiskLevelToColorCode(alertRiskLevel);

          let alerts: Alert[] | undefined;
          // Pending alerts
          if (alertStatus === AlertStatus.PENDING && alertColorCode) {
            const query = await listPendingRiskAlerts({
              pending: AlertStatus.PENDING,
              colorCode: { eq: alertColorCode }
            });
            if (query.data && query.data.listPendingRiskAlerts) {
              const result = query.data.listPendingRiskAlerts.items;
              if (result && result.length > 0) {
                alerts = result as Alert[];
              } else {
                // LS-TODO: To be removed
                const mockAlerts = JSON.parse(
                  JSON.stringify(mockPendingAlerts)
                );
                switch (alertColorCode) {
                  case AlertColorCode.HIGH:
                    alerts = mockAlerts.splice(0, 2);
                    break;
                  case AlertColorCode.MEDIUM:
                    alerts = mockAlerts.splice(2, 1);
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
                alerts = result as Alert[];
              } else {
                // LS-TODO: To be removed
                const mockAlerts = JSON.parse(
                  JSON.stringify(mockCompletedAlerts)
                );
                switch (alertColorCode) {
                  case AlertColorCode.HIGH:
                    alerts = mockAlerts.splice(0, 1);
                    break;
                  case AlertColorCode.MEDIUM:
                    alerts = mockAlerts.splice(1, 1);
                    break;
                  case AlertColorCode.LOW:
                    alerts = mockAlerts.splice(2, 1);
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
            const sortedAlerts = sortAlertsByDateTime(alerts);

            agentAPI.addFact(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.ALERTS,
                sortedAlerts
              ),
              false
            );

            // Merges newly retrieved alerts into locally stored alerts
            await Storage.setMultipleAlerts(alerts);
          }
        } else {
          // Device is offline
          const localRiskAlerts = await Storage.getRiskOrStatusAlerts(
            alertRiskLevel,
            alertStatus
          );
          if (localRiskAlerts) {
            const sortedAlerts = sortAlertsByDateTime(localRiskAlerts);
            agentAPI.addFact(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.ALERTS,
                sortedAlerts
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
}

const mapRiskLevelToColorCode = (alertRiskLevel: RiskLevel): AlertColorCode => {
  switch (alertRiskLevel) {
    case RiskLevel.HIGH:
      return AlertColorCode.HIGH;
    case RiskLevel.MEDIUM:
      return AlertColorCode.MEDIUM;
    case RiskLevel.LOW:
      return AlertColorCode.LOW;
    case RiskLevel.UNASSIGNED:
      return AlertColorCode.UNASSIGNED;
    default:
      return AlertColorCode.UNASSIGNED;
  }
};

/**
 * Sorts alerts / alert infos in descending order of datetime.
 * @param alerts List of alerts / alert infos to be sorted
 * @returns list of sorted alerts / alert infos
 */
export const sortAlertsByDateTime = (
  alerts: Alert[] | AlertInfo[]
): Alert[] | AlertInfo[] => {
  return alerts.sort((a, b) => {
    const date1 = new Date(a.dateTime);
    const date2 = new Date(b.dateTime);
    return date2.getTime() - date1.getTime();
  });
};

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP_I,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_ALERTS,
  true
);

// Actionframe
export const af_RetrieveAlerts = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_ALERTS}`,
  [rule1, rule2],
  new RetrieveAlerts()
);
