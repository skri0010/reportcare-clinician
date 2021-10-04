import {
  Actionframe,
  Agent,
  Belief,
  Communicate,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import {
  CommonAttributes,
  Performative,
  ProcedureConst
} from "agents-framework/Enums";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";

/**
 * Represents the activity for requesting MHA to associate the real-time alert with the retrieved medical records.
 * This happens in Procedure HF- Exacerbation User Specific Alert (HF-EUA).
 */
class RequestAssociateAlertMedicalRecords extends Communicate {
  constructor() {
    super(
      ActionFrameIDs.ALA.REQUEST_ASSOCIATE_ALERT_MEDICAL_RECORDS,
      Performative.REQUEST,
      // Request MHA to associate the retrieved information and CAM to retrieve user context for association
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.ALERT_MEDICAL_RECORDS_RETRIEVED,
        true
      ),
      [AgentIDs.MHA, AgentIDs.CAM]
    );
  }

  /**
   * Performs the activity
   * @param {Agent} agent current agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule3]);
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_EUA,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.ALA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.ALA.PROCESS_ALERT_NOTIFICATION
);
const rule3 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.ALERT_MEDICAL_RECORDS_RETRIEVED,
  true
);

// Actionframe
export const af_RequestAssociateAlertMedicalRecords = new Actionframe(
  `AF_${ActionFrameIDs.ALA.REQUEST_ASSOCIATE_ALERT_MEDICAL_RECORDS}`,
  [rule1, rule2, rule3],
  new RequestAssociateAlertMedicalRecords()
);
