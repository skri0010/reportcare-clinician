import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition
} from "rc-agents/framework";
import {
  ActionFrameIDs,
  AppAttributes,
  AsyncStorageKeys,
  BeliefKeys,
  ClinicianAttributes,
  CommonAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc-agents/framework/AgentEnums";
import agentAPI from "rc-agents/framework/AgentAPI";
import { Alert, ModelSortDirection } from "aws/API";
import { mockPendingAlerts } from "mock/mockAlerts";
import { AlertStatus, listPendingAlertsByDateTime } from "aws";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AlertInfo } from "rc-agents/framework/model";

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
    await super.doActivity(agent);

    // Update Beliefs
    agent.addBelief(
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.RETRIEVE_PENDING_ALERT_COUNT,
        false
      )
    );

    try {
      let results: (Alert | undefined | null)[] | undefined | null;

      if (agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
        // Device is online
        const query = await listPendingAlertsByDateTime({
          pending: AlertStatus.PENDING,
          sortDirection: ModelSortDirection.DESC
        });

        if (query.data && query.data.listPendingAlertsByDateTime) {
          results = query.data.listPendingAlertsByDateTime.items;
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
        }
      } else {
        // Device is offline
        const alertsStr = await AsyncStorage.getItem(AsyncStorageKeys.ALERTS);
        const localAlerts: AlertInfo[] = [];
        if (alertsStr) {
          const alerts = JSON.parse(alertsStr);
          Object.keys(alerts).forEach((key) => {
            const patientAlerts: AlertInfo[] = JSON.parse(alerts[key]);
            patientAlerts.forEach((alert) => {
              if (!alert.completed) {
                localAlerts.push(alert);
              }
            });
          });
        }

        if (localAlerts.length > 0) {
          agentAPI.addFact(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.ALERTS,
              localAlerts
            ),
            false
          );
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );
  }
}

// Preconditions for activating the RetrievePendingAlertCount class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_PENDING_ALERT_COUNT,
  true
);

// Action Frame for RetrievePendingAlertCount class
const af_RetrievePendingAlertCount = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_PENDING_ALERT_COUNT}`,
  [rule1, rule2],
  new RetrievePendingAlertCount()
);

export default af_RetrievePendingAlertCount;
