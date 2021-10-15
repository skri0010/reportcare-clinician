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
  AppAttributes,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { AlertNotification } from "aws/TypedAPI/subscriptions";
import { listClinicianPatientMaps, getDetailedAlert } from "aws";
import { LocalStorage } from "rc_agents/storage";
import { agentNWA } from "rc_agents/agents";
import { convertAlertToAlertInfo } from "util/utilityFunctions";
import { AlertInfo, AlertStatus, FetchAlertsMode } from "rc_agents/model";
import { store } from "util/useRedux";
import { setRealTimeAlert } from "ic-redux/actions/agents/alertActionCreator";

/**
 * Represents the activity for processing a real-time alert notification.
 * This happens in Procedure HF- Exacerbation User Specific Alert (HF-EUA) - A-AS.
 */
class ProcessAlertNotification extends Activity {
  constructor() {
    super(ActionFrameIDs.ALA.PROCESS_ALERT_NOTIFICATION);
  }

  /**
   * Performs the activity
   * @param {Agent} agent current agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    // Indicator of whether a pop up notification should be shown
    let showAlertPopUp: boolean = false;
    let alertInfo: AlertInfo | undefined;

    try {
      const facts = agentAPI.getFacts();

      // Gets alert notification from facts
      const alertNotification: AlertNotification =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.ALERT_NOTIFICATION];

      // Retrieves clinician from global state
      const clinicianID = store.getState().clinicians.clinician?.clinicianID;

      if (alertNotification && clinicianID) {
        // Trigger request to MHA to associate retrieved medical records
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Check if alert is current clinician's patient
          const mapQuery = await listClinicianPatientMaps({
            clinicianID: clinicianID
          });

          if (mapQuery && mapQuery.data.listClinicianPatientMaps?.items) {
            const patientIds =
              mapQuery.data.listClinicianPatientMaps.items.flatMap((item) =>
                item ? [item.patientID] : []
              );
            // Clinician is responsible for this patient - should retrieve monitoring records
            if (patientIds.includes(alertNotification.patientID)) {
              // Get detailed alert
              const alertQuery = await getDetailedAlert({
                id: alertNotification.alertID
              });
              if (alertQuery.data.getAlert) {
                // Store alert into local storage
                const alert = alertQuery.data.getAlert;
                alertInfo = convertAlertToAlertInfo(alert);
                await LocalStorage.setAlertInfo(alertInfo);
                showAlertPopUp = true;
              }
            }
          }

          if (showAlertPopUp && alertInfo) {
            // Dispatch to front end to be shown in a pop up
            store.dispatch(setRealTimeAlert(alertInfo));

            // Trigger to inform MHA
            agent.addBelief(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.INFORM_REAL_TIME_ALERT,
                true
              )
            );

            // Trigger to request CAM to retrieve user context
            agent.addBelief(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.RETRIEVE_USER_CONTEXT,
                true
              )
            );

            // Obtain fetch alerts mode
            const fetchAlertsMode: FetchAlertsMode | null =
              alertInfo.pending === AlertStatus.PENDING
                ? FetchAlertsMode.PENDING
                : alertInfo.completed === AlertStatus.COMPLETED
                ? FetchAlertsMode.COMPLETED
                : null;

            // Updates facts with latest pending and completed alerts
            if (fetchAlertsMode === FetchAlertsMode.PENDING) {
              // Pending AlertInfo[]
              agentAPI.addFact(
                new Belief(
                  BeliefKeys.CLINICIAN,
                  ClinicianAttributes.REFRESHED_PENDING_ALERTS,
                  await LocalStorage.getPendingAlertInfos()
                ),
                false
              );
            }

            if (fetchAlertsMode === FetchAlertsMode.COMPLETED) {
              // Completed AlertInfo[]
              agentAPI.addFact(
                new Belief(
                  BeliefKeys.CLINICIAN,
                  ClinicianAttributes.REFRESHED_COMPLETED_ALERTS,
                  await LocalStorage.getCompletedAlertInfos()
                ),
                false
              );
            }

            // Trigger to display refreshed alerts
            agent.addBelief(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.REFRESHED_ALERTS_RETRIEVED,
                true
              )
            );
          }
        } else {
          // Store alert notification locally to be processed later
          await LocalStorage.setAlertNotification(alertNotification);
          // Notifies NWA agent
          agentNWA.addBelief(
            new Belief(
              BeliefKeys.APP,
              AppAttributes.SYNC_PROCESS_ALERT_NOTIFICATIONS,
              true
            )
          );
        }
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
        ClinicianAttributes.ALERT_NOTIFICATION,
        null
      ),
      false
    );
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_EUA,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.PROCESS_ALERT_NOTIFICATION,
  true
);

// Actionframe
export const af_ProcessAlertNotification = new Actionframe(
  `AF_${ActionFrameIDs.ALA.PROCESS_ALERT_NOTIFICATION}`,
  [rule1, rule2],
  new ProcessAlertNotification()
);
