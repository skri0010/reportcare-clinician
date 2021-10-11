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
import { AlertInfo } from "rc_agents/model";
import {
  setAlertInfo,
  setFetchingAlertInfo
} from "ic-redux/actions/agents/alertActionCreator";

/**
 * Class to represent an activity for triggering the display of alert with patient's information.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP-II).
 */
class DisplayDetailedAlertInfo extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_DETAILED_ALERT_INFO);
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
          ClinicianAttributes.DETAILED_ALERT_INFO
        ];

      if (alertInfo) {
        store.dispatch(setAlertInfo(alertInfo));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Update Facts
    // Remove item
    agentAPI.addFact(
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.DETAILED_ALERT_INFO,
        null
      ),
      false
    );

    // End the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.AT_CP_II,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );

    // Dispatch to store that fetching has ended
    store.dispatch(setFetchingAlertInfo(false));
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP_II,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.DETAILED_ALERT_INFO_RETRIEVED,
  true
);

// Actionframe
export const af_DisplayDetailedAlertInfo = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_DETAILED_ALERT_INFO}`,
  [rule1, rule2],
  new DisplayDetailedAlertInfo()
);
