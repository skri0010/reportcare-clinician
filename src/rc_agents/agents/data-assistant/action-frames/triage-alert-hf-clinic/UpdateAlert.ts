import {
  Actionframe,
  Agent,
  Activity,
  Belief,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import { ProcedureConst } from "rc_agents/framework/Enums";
import agentAPI from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  BeliefKeys,
  ProcedureAttributes,
  AppAttributes,
  ActionFrameIDs,
  ClinicianAttributes
} from "rc_agents/clinician_framework";
import { Storage } from "rc_agents/storage";
import { store } from "util/useRedux";
import { setProcedureSuccessful } from "ic-redux/actions/agents/actionCreator";
import { agentNWA } from "rc_agents/agents";
import { getAlert, updateAlert } from "aws";
import { AlertInfo, AlertStatus } from "rc_agents/model";
import { Alert, UpdateAlertInput } from "aws/API";

/**
 * Class to represent an activity for updating a patient's Alert.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP-II).
 */
class UpdateAlert extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.UPDATE_ALERT);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    const facts = agentAPI.getFacts();

    try {
      // Gets Todo details to be updated
      const alertInput: AlertInfo =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.ALERT];

      if (alertInput) {
        let toSync = false;
        let alertToStore: Alert | AlertInfo | undefined;

        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Device is online: queries the latest alert
          const alertQuery = await getAlert({ id: alertInput.id });
          if (alertQuery.data.getAlert) {
            const latestAlert = alertQuery.data.getAlert;

            // Latest Alert has higher version than local alert
            if (
              alertInput._version &&
              latestAlert._version > alertInput._version
            ) {
              alertToStore = latestAlert;
            } else {
              // This alert will be used for local storing later on
              if (alertInput.completed) {
                latestAlert.pending = null;
                latestAlert.completed = AlertStatus.COMPLETED;
              } else {
                latestAlert.completed = null;
                latestAlert.pending = AlertStatus.PENDING;
              }

              // Constructs alert object to be updated
              const alertToUpdate: UpdateAlertInput = {
                id: latestAlert.id,
                completed: latestAlert.completed,
                pending: latestAlert.pending,
                _version: latestAlert._version
              };
              const updateResponse = await updateAlert(alertToUpdate);

              // Updates to indicate that alert is successfully updated
              if (updateResponse.data.updateAlert) {
                latestAlert._version = updateResponse.data.updateAlert._version;
              } else {
                // Failed to update alert
                toSync = true;
              }

              alertToStore = latestAlert;
            }
          }
        } else {
          // Device is offline: alert update is to be synced
          toSync = true;
          alertToStore = alertInput;
        }

        if (alertToStore) {
          await Storage.mergeAlert(alertToStore);
          await Storage.mergeAlertInfo(alertToStore);
        }

        if (toSync) {
          // Stores alert to the list of alerts to be synced
          await Storage.setAlertSync(alertInput);

          // Notifies NWA
          agentNWA.addBelief(
            new Belief(BeliefKeys.APP, AppAttributes.SYNC_UPDATE_ALERTS, true)
          );
        }
      }

      // Dispatch to front end to indicate that procedure is successful
      store.dispatch(setProcedureSuccessful(true));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // Dispatch to front end to indicate that procedure is successful
      store.dispatch(setProcedureSuccessful(false));
    }

    // Ends the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.AT_CP_II,
        ProcedureConst.INACTIVE
      )
    );
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
  ClinicianAttributes.UPDATE_ALERT,
  true
);

// Actionframe
const af_UpdateAlert = new Actionframe(
  `AF_${ActionFrameIDs.DTA.UPDATE_ALERT}`,
  [rule1, rule2],
  new UpdateAlert()
);

export default af_UpdateAlert;
