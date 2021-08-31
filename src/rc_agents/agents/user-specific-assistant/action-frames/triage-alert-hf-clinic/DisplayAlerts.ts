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
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { store } from "util/useRedux";
import { setAlerts } from "ic-redux/actions/agents/actionCreator";
import { Alert } from "aws/API";

/**
 * Class to represent an activity for triggering the display of alerts.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class DisplayAlerts extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_ALERTS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    try {
      const alerts: Alert[] =
        agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.ALERTS];

      if (alerts) {
        // LS-TODO: Irrelevant alerts should be filtered out depending on user's role

        // Dispatch alerts to front end for display
        store.dispatch(setAlerts(alerts));

        // Removes alert info from facts
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
        ProcedureAttributes.AT_CP_I,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );
  }
}

// Preconditions for activating the DisplayAlerts class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP_I,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.ALERTS_RETRIEVED,
  true
);

// Action Frame for DisplayAlerts class
export const af_DisplayAlerts = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_ALERTS}`,
  [rule1, rule2],
  new DisplayAlerts()
);
