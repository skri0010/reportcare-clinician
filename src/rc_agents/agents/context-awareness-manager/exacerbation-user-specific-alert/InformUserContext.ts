import {
  Actionframe,
  Agent,
  Belief,
  Communicate,
  Precondition
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
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";

/**
 * Represents the activity for informing MHA the retrieved user's context when real-time alert is received.
 * This happens in Procedure HF- Exacerbation User Specific Alert (HF-EUA).
 */
class InformUserContext extends Communicate {
  constructor() {
    super(
      ActionFrameIDs.CAM.INFORM_USER_CONTEXT,
      Performative.INFORM,
      // Informs MHA that context has been retrieved
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.CONTEXT_RETRIEVED,
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
    await super.doActivity(agent);

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

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.HF_EUA,
  ProcedureConst.ACTIVE
);
const rule2 = new Precondition(
  AgentIDs.CAM,
  CommonAttributes.LAST_ACTIVITY,
  ActionFrameIDs.CAM.RETRIEVE_USER_CONTEXT
);

// Actionframe
export const af_InformUserContext = new Actionframe(
  `AF_${ActionFrameIDs.CAM.INFORM_USER_CONTEXT}`,
  [rule1, rule2],
  new InformUserContext()
);
