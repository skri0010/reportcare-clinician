import {
  Actionframe,
  Communicate,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import { ProcedureConst, Performative } from "agents-framework/Enums";
import { agentUXSA } from "rc_agents/agents";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";

class RequestDisplayTodoDetails extends Communicate {
  // Constructor
  constructor() {
    super(
      ActionFrameIDs.DTA.REQUEST_DISPLAY_TODO_DETAILS,
      Performative.REQUEST,
      // Triggers DisplayTodoDetails action frame of UXSA
      new Belief(
        BeliefKeys.CLINICIAN,
        ClinicianAttributes.DISPLAY_TODO_DETAILS,
        true
      ),
      [AgentIDs.UXSA]
    );
  }

  /**
   * Perform the activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    try {
      await super.doActivity(agent, [rule2]);
      console.log(agentUXSA.getBeliefs());
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD_III,
  ProcedureConst.ACTIVE
);

const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.TODO_DETAILS_RETRIEVED,
  true
);

// Actionframe
export const af_RequestDisplayTodoDetails = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_DISPLAY_TODO_DETAILS}`,
  [rule1, rule2],
  new RequestDisplayTodoDetails()
);
