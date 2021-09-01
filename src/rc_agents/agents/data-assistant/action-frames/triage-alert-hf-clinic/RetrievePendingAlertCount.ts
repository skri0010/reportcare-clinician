import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { Storage } from "rc_agents/storage";
import { Alert, ModelSortDirection } from "aws/API";
import { listPendingAlertsByDateTime } from "aws";
import { AlertColorCode, AlertInfo, AlertStatus } from "rc_agents/model";
import { RiskLevel } from "models/RiskLevel";
import { store } from "util/useRedux";
import { setFetchingPendingAlerts } from "ic-redux/actions/agents/actionCreator";

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
      let results: Alert[] | undefined;
      store.dispatch(setFetchingPendingAlerts(true));

      if (agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
        // Device is online
        const query = await listPendingAlertsByDateTime({
          pending: AlertStatus.PENDING,
          sortDirection: ModelSortDirection.DESC
        });

        if (query.data.listPendingAlertsByDateTime?.items) {
          results = query.data.listPendingAlertsByDateTime.items as Alert[];
        }

        if (results) {
          const pendingAlerts: AlertInfo[] = [];
          results.map((alert) => {
            const currentAlert: AlertInfo = {
              id: alert.id,
              patientID: alert.patientID,
              patientName: alert.patientName,
              vitalsReportID: alert.vitalsReportID,
              symptomReportID: alert.symptomReportID,
              riskLevel: mapColorCodeToRiskLevel(alert.colorCode),
              dateTime: alert.dateTime,
              summary: alert.summary,
              completed: alert.completed === AlertStatus.COMPLETED,
              _version: alert._version
            };

            pendingAlerts.push(currentAlert);
            return alert;
          });
          // Adds pending alerts to facts to be retrieved by UXSA
          agentAPI.addFact(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.PENDING_ALERTS,
              pendingAlerts
            ),
            false
          );
          await Storage.setMultipleAlerts(pendingAlerts);
        }
      } else {
        // Device is offline
        const localPendingAlerts = await Storage.getPendingAlerts();
        if (localPendingAlerts) {
          agentAPI.addFact(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.PENDING_ALERTS,
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
}

/**
 * Maps alert's color code to risk level.
 * @param colorCode alert's color code
 * @returns risk level corresponding to the color code
 */
export const mapColorCodeToRiskLevel = (colorCode: string): RiskLevel => {
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

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP_I,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_PENDING_ALERT_COUNT,
  true
);

// Actionframe
export const af_RetrievePendingAlertCount = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_PENDING_ALERT_COUNT}`,
  [rule1, rule2],
  new RetrievePendingAlertCount()
);
