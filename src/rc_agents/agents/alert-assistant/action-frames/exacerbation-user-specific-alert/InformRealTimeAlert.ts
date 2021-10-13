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
 * Represents the activity for informing MHA about the real-time alert.
 * This happens in Procedure HF - Exacerbation User Specific Alert (HF-EUA) - A-AS.
 */
class InformRealTimeAlert extends Communicate {
  constructor() {
    super(
      ActionFrameIDs.ALA.INFORM_REAL_TIME_ALERT,
      Performative.INFORM,
      // Inform MHA with the real time alert
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.REAL_TIME_ALERT_RECEIVED,
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
  AgentIDs.ALA,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.ALA.PROCESS_ALERT_NOTIFICATION
);
const rule3 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.INFORM_REAL_TIME_ALERT,
  true
);

// Actionframe
export const af_InformRealTimeAlert = new Actionframe(
  `AF_${ActionFrameIDs.ALA.INFORM_REAL_TIME_ALERT}`,
  [rule1, rule2, rule3],
  new InformRealTimeAlert()
);
