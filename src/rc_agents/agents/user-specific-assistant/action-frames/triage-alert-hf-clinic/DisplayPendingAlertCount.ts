import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import agentAPI from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { ProcedureConst } from "rc_agents/framework/Enums";
import { AlertInfo, PendingAlertCount } from "rc_agents/model";
import { store } from "util/useRedux";
import {
  setFetchingPendingAlerts,
  setPendingAlertCount,
  setUpdatePendingAlerts
} from "ic-redux/actions/agents/actionCreator";
import { RiskLevel } from "models/RiskLevel";
import {
  ActionFrameIDs,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";

/**
 * Class to represent an activity for triggering the display of pending alert count.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class DisplayPendingAlertCount extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_PENDING_ALERT_COUNT);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    try {
      const pendingAlerts: AlertInfo[] | null =
        agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[
          ClinicianAttributes.PENDING_ALERTS
        ];

      if (pendingAlerts) {
        const pendingAlertCount: PendingAlertCount = {
          highRisk: 0,
          mediumRisk: 0,
          lowRisk: 0,
          unassignedRisk: 0
        };

        // LS-TODO: Irrelevant alerts should be filtered out depending on user's role

        pendingAlerts.forEach((alert) => {
          // Alert type is received if device is online or offline
          switch ((alert as AlertInfo).riskLevel) {
            case RiskLevel.HIGH:
              pendingAlertCount.highRisk += 1;
              break;
            case RiskLevel.MEDIUM:
              pendingAlertCount.mediumRisk += 1;
              break;
            case RiskLevel.LOW:
              pendingAlertCount.lowRisk += 1;
              break;
            case RiskLevel.UNASSIGNED:
              pendingAlertCount.unassignedRisk += 1;
              break;
            default:
              break;
          }
        });

        // Dispatch pending alert count to front end
        store.dispatch(setPendingAlertCount(pendingAlertCount));

        // Removes pending alerts from facts
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.PENDING_ALERTS,
            null
          ),
          false
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Reset updatePendingAlerts to false
    store.dispatch(setUpdatePendingAlerts(false));

    // Stops the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.AT_CP_I,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );

    store.dispatch(setFetchingPendingAlerts(false));
  }
}

// Preconditions for activating the DisplayPendingAlertCount class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP_I,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.PENDING_ALERT_COUNT_RETRIEVED,
  true
);

// Action Frame for DisplayPendingAlertCount class
export const af_DisplayPendingAlertCount = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_PENDING_ALERT_COUNT}`,
  [rule1, rule2],
  new DisplayPendingAlertCount()
);
