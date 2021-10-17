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
 * Represents the activity for informing MHA the retrieved monitoring records associated with a real-time alert.
 * This happens in Procedure HF- Exacerbation User Specific Alert (HF-EUA).
 */
class InformMonitoringRecords extends Communicate {
  constructor() {
    super(
      ActionFrameIDs.DTA.INFORM_MONITORING_RECORDS,
      Performative.INFORM,
      // Inform MHA that monitoring records have been retrieved.
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.MONITORING_RECORDS_RETRIEVED,
        true
      ),
      [AgentIDs.MHA]
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
  AgentIDs.DTA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.DTA.RETRIEVE_MONITORING_RECORDS
);
const rule3 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.MONITORING_RECORDS_RETRIEVED,
  true
);

// Actionframe
export const af_InformMonitoringRecords = new Actionframe(
  `AF_${ActionFrameIDs.DTA.INFORM_MONITORING_RECORDS}`,
  [rule1, rule2, rule3],
  new InformMonitoringRecords()
);
