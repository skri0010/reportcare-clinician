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

/**
 * Represents the activity for associating alert specific medical records when real-time alert is received.
 * This happens in Procedure HF- Exacerbation User Specific Alert (HF-EUA).
 */
class AssociateAlertMedicalRecords extends Activity {
  constructor() {
    super(ActionFrameIDs.MHA.ASSOCIATE_ALERT_MEDICAL_RECORDS);
  }

  /**
   * Performs the activity
   * @param {Agent} agent current agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    try {
      // TODO: In the future, MHA is supposed to interpret the information received
      // Currently does nothing but triggers RequestDisplayRefreshedAlerts right away
      agent.addBelief(
        new Belief(
          BeliefKeys.CLINICIAN,
          ClinicianAttributes.ALERT_MEDICAL_RECORDS_ASSOCIATED,
          true
        )
      );
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
  ClinicianAttributes.CONTEXT_RETRIEVED,
  true
);
const rule3 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.ALERT_MEDICAL_RECORDS_RETRIEVED,
  true
);

// Actionframe
export const af_AssociateAlertMedicalRecords = new Actionframe(
  `AF_${ActionFrameIDs.MHA.ASSOCIATE_ALERT_MEDICAL_RECORDS}`,
  [rule1, rule2, rule3],
  new AssociateAlertMedicalRecords()
);
