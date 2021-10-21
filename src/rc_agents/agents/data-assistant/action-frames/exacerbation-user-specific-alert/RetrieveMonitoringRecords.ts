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
import { AlertInfo } from "rc_agents/model";
import { queryHighRiskAlertInfo } from "../triage-alert-hf-clinic/RetrieveDetailedAlertInfo";
import { agentMHA } from "rc_agents/agents";

/**
 * Represents the activity for retrieving monitoring records associated with a real-time alert.
 * This happens in Procedure HF- Exacerbation User Specific Alert (HF-EUA) - PCS-AS.
 * Triggered when user choses to view details of a pop up real-time alert.
 */
class RetrieveMonitoringRecords extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_MONITORING_RECORDS);
  }

  /**
   * Performs the activity
   * @param {Agent} agent current agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    try {
      const facts = agentAPI.getFacts();

      // Retrieves alert info from facts
      const alertInfo: AlertInfo =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.REAL_TIME_ALERT];

      // Get online status from facts
      const isOnline: boolean = facts[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      if (alertInfo) {
        if (isOnline) {
          // Device is online
          // Query monitoring records associated with alert
          const alertWithMonitoringRecords = await queryHighRiskAlertInfo(
            alertInfo
          );
          if (alertWithMonitoringRecords) {
            // Adds alert with monitoring records to MHA's own beliefs directly (to be handled in the future).
            agentMHA.addBelief(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.MONITORING_RECORDS,
                alertWithMonitoringRecords
              )
            );

            // Triggers to inform MHA that monitoring records have been retrieved.
            agent.addBelief(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.MONITORING_RECORDS_RETRIEVED,
                true
              )
            );
          }
        }
      }

      // Update Facts
      // Remove item
      agentAPI.addFact(
        new Belief(
          BeliefKeys.CLINICIAN,
          ClinicianAttributes.REAL_TIME_ALERT,
          null
        ),
        false
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);

      // Update Facts
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
  ClinicianAttributes.RETRIEVE_MONITORING_RECORDS,
  true
);

// Actionframe
export const af_RetrieveMonitoringRecords = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_MONITORING_RECORDS}`,
  [rule1, rule2],
  new RetrieveMonitoringRecords()
);
