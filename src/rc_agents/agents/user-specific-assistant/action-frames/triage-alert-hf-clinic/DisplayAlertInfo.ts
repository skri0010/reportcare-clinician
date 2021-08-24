import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import { ProcedureConst } from "rc_agents/framework/Enums";
import agentAPI from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  ActionFrameIDs,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { store } from "util/useRedux";
import { setAlertInfo } from "ic-redux/actions/agents/actionCreator";
import { AlertInfo } from "rc_agents/model";

/**
 * Class to represent an activity for triggering the display of alert info.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP-II).
 */
class DisplayAlertInfo extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_ALERT_INFO);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    try {
      const alertInfo: AlertInfo =
        agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[
          ClinicianAttributes.ALERT_INFO
        ];

      if (alertInfo) {
        // Dispatch alert info to front end for display
        store.dispatch(setAlertInfo(alertInfo));

        // Removes alert info from facts
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.ALERT_INFO,
            null
          ),
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
        ProcedureAttributes.AT_CP_II,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );
  }
}

// Preconditions for activating the DisplayAlertInfo class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP_II,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.ALERT_INFO_RETRIEVED,
  true
);

// Action Frame for DisplayAlertInfo class
export const af_DisplayAlertInfo = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_ALERT_INFO}`,
  [rule1, rule2],
  new DisplayAlertInfo()
);
