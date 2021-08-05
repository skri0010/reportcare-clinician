import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import {
  ActionFrameIDs,
  BeliefKeys,
  CommonAttributes,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "../../../../agent_framework/AgentEnums";
import agentAPI from "../../../../agent_framework/AgentAPI";
import { AlertInfo } from "agents_implementation/agent_framework/model";
import { store } from "util/useRedux";
import {
  setNewHighRiskAlerts,
  setNewLowRiskAlerts,
  setNewMediumRiskAlerts,
  setNewUnassignedRiskAlerts
} from "ic-redux/actions/agents/actionCreator";

/**
 * Class to represent an activity for triggering the display of newly received alerts.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class DisplayAllAlerts extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_ALL_ALERTS);
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
        BeliefKeys.PATIENT,
        PatientAttributes.ALERT_INFOS_RETRIEVED,
        false
      )
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      const alertInfos: {
        highRisk: AlertInfo[];
        mediumRisk: AlertInfo[];
        lowRisk: AlertInfo[];
        unassignedRisk: AlertInfo[];
      } =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
          PatientAttributes.ALERT_INFOS
        ];

      if (alertInfos) {
        // LS-TODO: Irrelevant alert infos should be filtered out depending on user's role

        // Dispatch new alert infos to front end for display
        if (alertInfos.highRisk.length > 0) {
          store.dispatch(setNewHighRiskAlerts(alertInfos.highRisk));
        }
        if (alertInfos.mediumRisk.length > 0) {
          store.dispatch(setNewMediumRiskAlerts(alertInfos.mediumRisk));
        }
        if (alertInfos.lowRisk.length > 0) {
          store.dispatch(setNewLowRiskAlerts(alertInfos.lowRisk));
        }
        if (alertInfos.unassignedRisk.length > 0) {
          store.dispatch(setNewUnassignedRiskAlerts(alertInfos.unassignedRisk));
        }

        // Removes alert info from facts
        agentAPI.addFact(
          new Belief(BeliefKeys.PATIENT, PatientAttributes.ALERT_INFOS, null),
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
      true
      // true
    );
  }
}

// Preconditions for activating the DisplayAllAlerts class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.ALERT_INFOS_RETRIEVED,
  true
);

// Action Frame for DisplayAllAlerts class
const af_DisplayAllAlerts = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_ALL_ALERTS}`,
  [rule1, rule2],
  new DisplayAllAlerts()
);

export default af_DisplayAllAlerts;
