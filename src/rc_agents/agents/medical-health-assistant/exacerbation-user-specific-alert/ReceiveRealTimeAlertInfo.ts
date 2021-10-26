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
import { agentUXSA } from "rc_agents/agents";

/**
 * Represents the activity for receiving information associated with a real-time alert.
 * This happens in Procedure HF- Exacerbation User Specific Alert (HF-EUA) - A-AS, PCS-AS, SU-TDLA.
 */
class ReceiveRealTimeAlertInfo extends Activity {
  constructor() {
    super(ActionFrameIDs.MHA.RECEIVE_REAL_TIME_ALERT_INFO);
  }

  /**
   * Performs the activity
   * @param {Agent} agent current agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    try {
      /**
       * FUTURE-TODO: In the future, MHA is supposed to interpret all the information received.
       * Currently they are added directly to MHA's beliefs after retrieving.
       * Information includes: alert with monitoring records, clinician's local time and location when the real-time alert was received.
       */
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

      const beliefsWithClinicianKeys = agent.getBeliefs()[BeliefKeys.CLINICIAN];
      const displayHighRiskAlertInfo =
        beliefsWithClinicianKeys?.[
          ClinicianAttributes.REAL_TIME_ALERT_RECEIVED
        ] &&
        beliefsWithClinicianKeys?.[ClinicianAttributes.CONTEXT_RETRIEVED] &&
        beliefsWithClinicianKeys?.[ClinicianAttributes.MONITORING_RECORDS];

      if (displayHighRiskAlertInfo) {
        // Gets retrieved alert info from beliefs
        const highRiskAlertInfo =
          beliefsWithClinicianKeys?.[ClinicianAttributes.MONITORING_RECORDS];
        // Adds the information to facts for displaying
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.DETAILED_ALERT_INFO,
            highRiskAlertInfo
          ),
          false
        );

        // Removes the information from MHA's beliefs after using
        agent.addBelief(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.CURRENT_TIME,
            null
          )
        );
        agent.addBelief(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.CURRENT_LOCATION,
            null
          )
        );
        agent.addBelief(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.MONITORING_RECORDS,
            null
          )
        );

        // Resets other relevant beliefs
        agent.addBelief(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.REAL_TIME_ALERT_RECEIVED,
            false
          )
        );
        agent.addBelief(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.CONTEXT_RETRIEVED,
            false
          )
        );

        // Updates beliefs to trigger DisplayDetailedAlertInfo of UXSA
        agentUXSA.addBelief(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.DETAILED_ALERT_INFO_RETRIEVED,
            true
          )
        );

        // Triggers start of P-USOR-II procedure to display alertInfo
        agentAPI.addFact(
          new Belief(
            BeliefKeys.PROCEDURE,
            ProcedureAttributes.P_USOR_II,
            ProcedureConst.ACTIVE
          )
        );
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
  ClinicianAttributes.MONITORING_RECORDS_RETRIEVED,
  true
);

// Actionframe
export const af_ReceiveRealTimeAlertInfo = new Actionframe(
  `AF_${ActionFrameIDs.MHA.RECEIVE_REAL_TIME_ALERT_INFO}`,
  [rule1, rule2],
  new ReceiveRealTimeAlertInfo()
);
