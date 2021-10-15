import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import {
  ActionFrameIDs,
  BeliefKeys,
  PatientAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { AlertInfo } from "rc_agents/model";
import { store } from "util/useRedux";
import { sortAlertInfoByDescendingDateTime } from "util/utilityFunctions";
import {
  setAlertHistory,
  setFetchingPatientAlertHistory
} from "ic-redux/actions/agents/patientActionCreator";

/**
 * Class to represent the activity for displaying the alert history
 * This happens in Procedure HF Outcome Trends (HF-OTP-II)
 */
class DisplayAlertHistory extends Activity {
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
      // Sort alert history
      const sortedAlertHistory =
        sortAlertInfoByDescendingDateTime(alertHistory);

      // Dispatch alert history into store
      store.dispatch(setAlertHistory(sortedAlertHistory));

      // Update Facts
      // Remove item
      agentAPI.addFact(
        new Belief(BeliefKeys.PATIENT, PatientAttributes.ALERT_HISTORY, null),
        false
      );

      // End the procedure
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

    // Dispatch to store to indicated fetching ended
    store.dispatch(setFetchingPatientAlertHistory(false));
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
