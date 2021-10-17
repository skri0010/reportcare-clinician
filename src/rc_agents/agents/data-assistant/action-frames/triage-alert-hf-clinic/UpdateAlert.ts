import {
  Actionframe,
  Agent,
  Activity,
  Belief,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  BeliefKeys,
  ProcedureAttributes,
  AppAttributes,
  ActionFrameIDs,
  ClinicianAttributes
} from "rc_agents/clinician_framework";
import { LocalStorage } from "rc_agents/storage";
import { store } from "util/useRedux";
import { agentNWA } from "rc_agents/agents";
import { getDetailedAlert, updateAlert } from "aws";
import {
  AlertInfo,
  AlertStatus,
  FetchAlertsMode,
  HighRiskAlertInfo
} from "rc_agents/model";
import { Alert, UpdateAlertInput } from "aws/API";
import { convertAlertToAlertInfo } from "util/utilityFunctions";
import { AgentTrigger } from "rc_agents/trigger";
import {
  setAlertInfo,
  setUpdatingAlertIndicators
} from "ic-redux/actions/agents/alertActionCreator";

/**
 * Class to represent an activity for updating a patient's Alert.
 * This happens in Procedure Triage Alert HF Clinic (P-USOR-II).
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

    // Get alert to be updated
    const alertInfoInput: AlertInfo | HighRiskAlertInfo =
      facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.ALERT_INFO];

    // Get online status from facts
    const isOnline: boolean = facts[BeliefKeys.APP]?.[AppAttributes.ONLINE];

    let toSync = false;
    let alertToStore: Alert | AlertInfo | HighRiskAlertInfo | undefined;

    // Convert from pending to completed
    alertInfoInput.completed = AlertStatus.COMPLETED;
    alertInfoInput.pending = null;

    // Dispatch to store to indicate updating
    store.dispatch(
      setUpdatingAlertIndicators({ updatingAlert: true, alertUpdated: false })
    );

    try {
      if (alertInfoInput) {
        // Fallback to input
        alertToStore = alertInfoInput;
        if (isOnline) {
          // Either use online alert or updated alert depending on return AlertInfo
          const { alertInfo, successful } = await updateAlertInfo(
            alertInfoInput
          );
          if (successful) {
            alertToStore = alertInfo;
          } else {
            // Queries did not occur
            // Alert must be synced
            toSync = true;
          }
        } else {
          // Device is offline
          // Alert must be synced
          toSync = true;
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      // Alert must be synced
      toSync = true;
    }

    if (alertToStore) {
      // Store alert locally
      await LocalStorage.setAlertInfo(convertAlertToAlertInfo(alertToStore));
    }

    if (toSync) {
      // Stores alert to the list of alerts to be synced
      await LocalStorage.setAlertSync(alertInfoInput);

      // Notifies NWA
      agentNWA.addBelief(
        new Belief(BeliefKeys.APP, AppAttributes.SYNC_UPDATE_ALERTS, true)
      );
    }

    // Dispatch the updated alert status to the frontend
    store.dispatch(setAlertInfo(alertInfoInput));
    // Trigger procedure to retrieve alerts locally
    AgentTrigger.triggerRetrieveAlerts(FetchAlertsMode.ALL, true);

    // Dispatch to front end to indicate updating has ended
    store.dispatch(
      setUpdatingAlertIndicators({ updatingAlert: false, alertUpdated: true })
    );

    // End the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.P_USOR_II,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );
  }
}

export const updateAlertInfo = async (
  alertInfoInput: AlertInfo | HighRiskAlertInfo
): Promise<{
  alertInfo: AlertInfo | HighRiskAlertInfo;
  successful: boolean;
}> => {
  let returnAlertInfo = alertInfoInput;
  let successful = false;
  try {
    // Device is online: queries the latest alert
    const alertQuery = await getDetailedAlert({ id: alertInfoInput.id });
    if (alertQuery.data.getAlert) {
      const onlineAlert = alertQuery.data.getAlert;

      if (
        alertInfoInput._version &&
        onlineAlert._version > alertInfoInput._version
      ) {
        // If online alert has higher version than local alert, store online alert
        // Result 1: Online AlertInfo is returned
        returnAlertInfo = convertAlertToAlertInfo(onlineAlert);
      } else {
        // Construct Alert to be updated
        const alertToUpdate: UpdateAlertInput = {
          id: alertInfoInput.id,
          completed: alertInfoInput.completed,
          pending: alertInfoInput.pending,
          _version: alertInfoInput._version
        };
        const updateResponse = await updateAlert(alertToUpdate);

        // Updates to indicate that alert is successfully updated
        if (updateResponse.data.updateAlert) {
          // Result 2: Updated AlertInfo is returned
          const updatedAlert = updateResponse.data.updateAlert;
          returnAlertInfo = convertAlertToAlertInfo(updatedAlert);
        }
      }

      // Always successful because query was made and error is not thrown
      successful = true;
    }
  } catch (error) {
    successful = false;
  }
  return { alertInfo: returnAlertInfo, successful: successful };
};

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.P_USOR_II,
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
