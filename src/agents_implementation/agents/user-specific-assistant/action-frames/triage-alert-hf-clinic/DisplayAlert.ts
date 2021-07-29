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
  setNewAlert,
  setProcedureOngoing
} from "ic-redux/actions/agents/actionCreator";

/**
 * Class to represent an activity for triggering the display of a newly received alert.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class DisplayAlert extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_ALERT);
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
        PatientAttributes.ALERT_INFO_RETRIEVED,
        false
      )
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      const alertInfo: AlertInfo =
        agentAPI.getFacts()[BeliefKeys.PATIENT]?.[PatientAttributes.ALERT_INFO];

      if (alertInfo) {
        // Dispatch new alert info to front end for display
        store.dispatch(setNewAlert(alertInfo));

        // Removes alert info from facts
        agentAPI.addFact(
          new Belief(BeliefKeys.PATIENT, PatientAttributes.ALERT_INFO, null),
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

    // Dispatch to front end that procedure has been completed
    store.dispatch(setProcedureOngoing(false));
  }
}

// Preconditions for activating the DisplayAlert class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  BeliefKeys.PATIENT,
  PatientAttributes.ALERT_INFO_RETRIEVED,
  true
);

// Action Frame for DisplayAlert class
const af_DisplayAlert = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_ALERT}`,
  [rule1, rule2],
  new DisplayAlert()
);

export default af_DisplayAlert;
