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
  ProcedureAttributes,
  setRetryLaterTimeout
} from "rc_agents/clinician_framework";
import { AlertNotification } from "aws/TypedAPI/subscriptions";
import { listClinicianPatientMaps, getDetailedAlert } from "aws";
import { Storage } from "rc_agents/storage";
import { agentNWA } from "rc_agents/agents";
import { convertAlertToAlertInfo } from "util/utilityFunctions";
import { setProcessedAlertNotification } from "ic-redux/actions/agents/actionCreator";
import { store } from "util/useRedux";

/**
 * Class to represent the activity for processing an alert notification.
 * This happens in Procedure Triage Alert HF Clinic (AT-CP).
 */
class ProcessAlertNotification extends Activity {
  constructor() {
    super(ActionFrameIDs.ALA.PROCESS_ALERT_NOTIFICATION);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    try {
      const facts = agentAPI.getFacts();

      // Gets alert notification from facts
      const alertNotification: AlertNotification =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.ALERT_NOTIFICATION];

      // Retrieves locally stored ClinicianID
      const clinicianID = await Storage.getClinicianID();

      if (alertNotification && clinicianID) {
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
                await Storage.setAlertInfo(alertInfo);

                // Dispatch to store to indicate that processing was successful
                store.dispatch(setProcessedAlertNotification(alertInfo));
              }
            }
          }
        } else {
          // Store alert notification locally to be processed later
          await Storage.setAlertNotification(alertNotification);

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

      setRetryLaterTimeout(() => {
        agent.addBelief(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.PROCESS_ALERT_NOTIFICATION,
            true
          )
        );
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PROCEDURE,
            ProcedureAttributes.AT_CP_III,
            ProcedureConst.ACTIVE
          )
        );
      });
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

    // End the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.AT_CP_III,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.AT_CP_III,
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
