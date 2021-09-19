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
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes,
  setRetryLaterTimeout
} from "rc_agents/clinician_framework";
import { getAlert } from "aws";
import { LocalStorage } from "rc_agents/storage";
// eslint-disable-next-line no-restricted-imports
import { alertToAlertInfo } from "rc_agents/agents/data-assistant/action-frames/triage-alert-hf-clinic/RetrieveAlerts";
import { store } from "util/useRedux";
import { RiskLevel } from "models/RiskLevel";
import {
  setPendingAlertCount,
  setPendingAlerts
} from "ic-redux/actions/agents/actionCreator";

/**
 * Class to represent the activity for sorting a new alert.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class SortNewAlert extends Activity {
  /**
   * Constructor
   */
  constructor() {
    super(ActionFrameIDs.ALA.SORT_NEW_ALERT);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    try {
      // Gets alert Id to sort from facts
      const alertId: string =
        agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[
          ClinicianAttributes.ALERT_ID_TO_SORT
        ];

      if (alertId) {
        // Removes alert id from facts
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.ALERT_ID_TO_SORT,
            null
          ),
          false
        );

        // Retrieves Alert using alert Id
        const alertQuery = await getAlert({ id: alertId });

        if (alertQuery.data.getAlert) {
          const alertToDispatch = alertToAlertInfo([
            alertQuery.data.getAlert
          ])[0];

          // Accesses current state
          const currentState = store.getState().agents;
          // Adds on to pending alert count according to alert's risk level
          const currentPendingAlertCounts = currentState.pendingAlertCount;
          switch (alertToDispatch.riskLevel) {
            case RiskLevel.HIGH:
              currentPendingAlertCounts.highRisk += 1;
              break;
            case RiskLevel.MEDIUM:
              currentPendingAlertCounts.mediumRisk += 1;
              break;
            case RiskLevel.LOW:
              currentPendingAlertCounts.lowRisk += 1;
              break;
            case RiskLevel.UNASSIGNED:
              currentPendingAlertCounts.unassignedRisk += 1;
              break;
            default:
              break;
          }

          // Dispatch updated alert counts
          store.dispatch(setPendingAlertCount(currentPendingAlertCounts));

          // Adds alert into the list of pending alerts
          let currentPendingAlerts = currentState.pendingAlerts;
          if (currentPendingAlerts) {
            currentPendingAlerts.unshift(alertToDispatch);
          } else {
            currentPendingAlerts = [alertToDispatch];
          }
          // Dispatch updated list of pending alerts
          store.dispatch(setPendingAlerts(currentPendingAlerts));

          // Stores alert locally
          await LocalStorage.setAlert(alertToDispatch);
        }
      }
      // Stops the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.AT_CP_III,
          ProcedureConst.INACTIVE
        ),
        true,
        true
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      setRetryLaterTimeout(() => {
        agent.addBelief(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.SORT_NEW_ALERT,
            true
          )
        );
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PROCEDURE,
            ProcedureAttributes.AT_CP_III,
            ProcedureConst.ACTIVE
          )
        );
      });

      // Update Facts
      // Stops the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.AT_CP_III,
          ProcedureConst.INACTIVE
        ),
        true,
        true
      );
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP_III,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.SORT_NEW_ALERT,
  true
);

// Actionframe
export const af_SortNewAlert = new Actionframe(
  `AF_${ActionFrameIDs.ALA.SORT_NEW_ALERT}`,
  [rule1, rule2],
  new SortNewAlert()
);
