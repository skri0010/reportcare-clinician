import {
  Actionframe,
  Communicate,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  AgentIDs,
  BeliefKeys,
  ClinicianAttributes,
  Performative,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";

/**
 * Class to represent the activity for requesting display of Todos.
 * This happens in Procedure Storing Data (SRD-II).
 */
class RequestDisplayTodos extends Communicate {
  // Constructor
  constructor() {
    super(
      ActionFrameIDs.DTA.REQUEST_DISPLAY_TODOS,
      Performative.REQUEST,
      // Triggers DisplayTodos action frame of UXSA
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.DISPLAY_TODOS, true),
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
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD_II,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.TODOS_UPDATED,
  true
);

// Actionframe
export const af_RequestDisplayTodos = new Actionframe(
  `AF_${ActionFrameIDs.DTA.REQUEST_DISPLAY_TODOS}`,
  [rule1, rule2],
  new RequestDisplayTodos()
);
