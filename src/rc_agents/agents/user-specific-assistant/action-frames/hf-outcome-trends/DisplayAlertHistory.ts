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
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import agentAPI from "rc_agents/framework/AgentAPI";
import { AlertInfo } from "rc_agents/model";
import { store } from "util/useRedux";
import { setAlertHistory } from "ic-redux/actions/agents/actionCreator";

/**
 * Class to represent the activity for displaying the alert history
 * This happens in Procedure HF Outcome Trends (HF-OTP-II)
 */
class DisplayAlertHistory extends Activity {
  /**
   * Constructor for DisplayAlertHistory class
   */
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_ALERT_HISTORY);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    // Get list of sorted by datetime alerts from the facts
    const alertHistory: AlertInfo[] =
      agentAPI.getFacts()[BeliefKeys.PATIENT]?.[
        PatientAttributes.ALERT_HISTORY
      ];

    if (alertHistory) {
      // Store the alert history into redux
      store.dispatch(setAlertHistory(alertHistory));

      // Remove the alert history from the facts
      agentAPI.addFact(
        new Belief(BeliefKeys.PATIENT, PatientAttributes.ALERT_HISTORY, null),
        false
      );

      // Stops the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.HF_OTP_II,
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
  ProcedureAttributes.HF_OTP_II,
  ProcedureConst.ACTIVE
);

const rule2 = new ResettablePrecondition(
  BeliefKeys.PATIENT,
  PatientAttributes.PATIENT_ALERT_HISTORY_RETRIEVED,
  true
);

// Actionframe
export const af_DisplayAlertHistory = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_ALERT_HISTORY}`,
  [rule1, rule2],
  new DisplayAlertHistory()
);
