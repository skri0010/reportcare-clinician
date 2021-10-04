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
import { AlertStatus, FetchAlertsMode } from "rc_agents/model";

/**
 * Represents the activity for processing a real-time alert notification.
 * This happens in Procedure HF- Exacerbation User Specific Alert (HF-EUA).
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

    try {
      const facts = agentAPI.getFacts();

      // Gets alert notification from facts
      const alertNotification: AlertNotification =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.ALERT_NOTIFICATION];

      // Retrieves locally stored ClinicianID
      const clinicianID = await LocalStorage.getClinicianID();

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
            if (patientIds.includes(alertNotification.patientID)) {
              // Get detailed alert
              const alertQuery = await getDetailedAlert({
                id: alertNotification.alertID
              });
              if (alertQuery.data.getAlert) {
                // Store alert into local storage
                const alert = alertQuery.data.getAlert;
                const alertInfo = convertAlertToAlertInfo(alert);
                await LocalStorage.setAlertInfo(alertInfo);
                // Obtain fetch alerts mode
                const fetchAlertsMode: FetchAlertsMode | null =
                  alertInfo.pending === AlertStatus.PENDING
                    ? FetchAlertsMode.PENDING
                    : alertInfo.completed === AlertStatus.COMPLETED
                    ? FetchAlertsMode.COMPLETED
                    : null;
                // Update Facts
                // Add item
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
                // Add item
                if (fetchAlertsMode === FetchAlertsMode.COMPLETED) {
                  // Pending AlertInfo[]
                  agentAPI.addFact(
                    new Belief(
                      BeliefKeys.CLINICIAN,
                      ClinicianAttributes.REFRESHED_COMPLETED_ALERTS,
                      await LocalStorage.getCompletedAlertInfos()
                    ),
                    false
                  );
                }
                // Trigger request to MHA
                agent.addBelief(
                  new Belief(
                    BeliefKeys.CLINICIAN,
                    ClinicianAttributes.ALERT_MEDICAL_RECORDS_RETRIEVED,
                    true
                  )
                );
              }
            }
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

      // End the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.HF_EUA,
          ProcedureConst.INACTIVE
        ),
        true,
        true
      );
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
