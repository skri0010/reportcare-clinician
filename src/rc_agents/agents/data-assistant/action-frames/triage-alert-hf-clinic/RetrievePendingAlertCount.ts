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
import { AsyncStorageKeys, AsyncStorageType, Storage } from "rc_agents/storage";
import agentAPI from "rc_agents/framework/AgentAPI";
import { Alert, ModelSortDirection } from "aws/API";
import { mockPendingAlerts } from "mock/mockAlerts";
import { AlertStatus, listPendingAlertsByDateTime } from "aws";
import { AlertColorCode } from "rc_agents/model";
import { RiskLevel } from "models/RiskLevel";

/**
 * Class to represent an activity for retrieving pending alerts.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class RetrievePendingAlertCount extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_PENDING_ALERT_COUNT);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    try {
      let results: Alert[];
      const localAlerts = await Storage.getAlerts();

      if (agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
        // Device is online
        const query = await listPendingAlertsByDateTime({
          pending: AlertStatus.PENDING,
          sortDirection: ModelSortDirection.DESC
        });

        if (query.data && query.data.listPendingAlertsByDateTime) {
          results = query.data.listPendingAlertsByDateTime.items as Alert[];
        }
        // LS-TODO: To be removed
        results = mockPendingAlerts;

        if (results && results.length > 0) {
          // Adds pending alerts to facts to be retrieved by UXSA
          agentAPI.addFact(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.ALERTS,
              results
            ),
            false
          );
          await this.mergeIntoLocalAlerts(localAlerts, results);
        }
      } else {
        // Device is offline
        const localPendingAlerts: Alert[] = [];
        if (localAlerts) {
          const keys = Object.values(RiskLevel);
          await Promise.all(
            keys.map((key) => {
              const riskAlerts = localAlerts![key];
              riskAlerts.map((alert) => {
                if (alert.pending === AlertStatus.PENDING) {
                  localPendingAlerts.push(alert);
                }
                return alert;
              });
              return key;
            })
          );
        }

        if (localPendingAlerts.length > 0) {
          agentAPI.addFact(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.ALERTS,
              localPendingAlerts
            ),
            false
          );
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }

  /**
   * Merges retrieved pending alerts into local alerts.
   * @param localAlerts local alerts
   * @param alerts newly retrieved alerts
   */
  // eslint-disable-next-line class-methods-use-this
  async mergeIntoLocalAlerts(
    localAlerts: AsyncStorageType[AsyncStorageKeys.ALERTS] | null,
    alerts: Alert[]
  ): Promise<void> {
    await Promise.all(
      alerts.map((alert) => {
        // Maps color code to risk level
        const riskLevel = mapColorCodeToRiskLevel(alert.colorCode);
        // Stores alerts according to risk level
        if (localAlerts) {
          if (localAlerts[riskLevel]) {
            const riskAlerts = localAlerts[riskLevel]!;
            const existIndex = riskAlerts.findIndex((a) => a.id === alert.id);
            if (existIndex >= 0) {
              riskAlerts[existIndex] = alert;
            } else {
              riskAlerts.push(alert);
            }
          } else {
            localAlerts[riskLevel] = [alert];
          }
        } else {
          localAlerts = {
            [RiskLevel.HIGH]: [],
            [RiskLevel.MEDIUM]: [],
            [RiskLevel.LOW]: [],
            [RiskLevel.UNASSIGNED]: []
          };
          localAlerts[riskLevel] = [alert];
        }
        return alert;
      })
    );

    if (localAlerts) {
      await Storage.setAlerts(localAlerts);
    }
  }
}

/**
 * Maps alert's color code to risk level.
 * @param colorCode alert's color code
 * @returns risk level corresponding to the color code
 */
const mapColorCodeToRiskLevel = (colorCode: string): RiskLevel => {
  switch (colorCode) {
    case AlertColorCode.HIGH:
      return RiskLevel.HIGH;
    case AlertColorCode.MEDIUM:
      return RiskLevel.MEDIUM;
    case AlertColorCode.LOW:
      return RiskLevel.LOW;
    case AlertColorCode.UNASSIGNED:
      return RiskLevel.UNASSIGNED;
    default:
      return RiskLevel.UNASSIGNED;
  }
};

// Preconditions for activating the RetrievePendingAlertCount class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_PENDING_ALERT_COUNT,
  true
);

// Action Frame for RetrievePendingAlertCount class
export const af_RetrievePendingAlertCount = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_PENDING_ALERT_COUNT}`,
  [rule1, rule2],
  new RetrievePendingAlertCount()
);
