import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition
} from "agents_implementation/agent_framework";
import {
  ActionFrameIDs,
  BeliefKeys,
  ClinicianAttributes,
  CommonAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "agents_implementation/agent_framework/AgentEnums";
import agentAPI from "agents_implementation/agent_framework/AgentAPI";
import {
  AlertColorCode,
  AlertInfo,
  PendingAlertCount
} from "agents_implementation/agent_framework/model";
import { store } from "util/useRedux";
import { Alert } from "aws/API";
import { setPendingAlertCount } from "ic-redux/actions/agents/actionCreator";
import { RiskLevel } from "models/RiskLevel";

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
    await super.doActivity(agent);

    // Update Beliefs
    agent.addBelief(
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.PENDING_ALERT_COUNT_RETRIEVED,
        false
      )
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      const pendingAlerts: Alert[] | AlertInfo[] | null =
        agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.ALERTS];

      if (pendingAlerts) {
        const pendingAlertCount: PendingAlertCount = {
          highRisk: 0,
          mediumRisk: 0,
          lowRisk: 0,
          unassignedRisk: 0
        };

        // LS-TODO: Irrelevant alerts should be filtered out depending on user's role

        pendingAlerts.forEach((alert) => {
          // Alert type is received if device is online
          if ((alert as Alert).colorCode) {
            switch ((alert as Alert).colorCode) {
              case AlertColorCode.HIGH:
                pendingAlertCount.highRisk += 1;
                break;
              case AlertColorCode.MEDIUM:
                pendingAlertCount.mediumRisk += 1;
                break;
              case AlertColorCode.LOW:
                pendingAlertCount.lowRisk += 1;
                break;
              case AlertColorCode.UNASSIGNED:
                pendingAlertCount.unassignedRisk += 1;
                break;
              default:
                break;
            }
          } else if ((alert as AlertInfo).riskLevel) {
            // AlertInfo type is received if device is offline
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
          }
        });

        // Dispatch pending alert count to front end
        store.dispatch(setPendingAlertCount(pendingAlertCount));

        // Removes pending alerts from facts
        agentAPI.addFact(
          new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.ALERTS, null),
          false
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Stops the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.AT_CP,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );
  }
}

// Preconditions for activating the DisplayPendingAlertCount class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.PENDING_ALERT_COUNT_RETRIEVED,
  true
);

// Action Frame for DisplayPendingAlertCount class
const af_DisplayPendingAlertCount = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_PENDING_ALERT_COUNT}`,
  [rule1, rule2],
  new DisplayPendingAlertCount()
);

export default af_DisplayPendingAlertCount;
