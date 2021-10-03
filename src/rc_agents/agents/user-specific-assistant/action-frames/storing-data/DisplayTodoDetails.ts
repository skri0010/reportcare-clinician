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
import { store } from "util/useRedux";
import { LocalTodo } from "rc_agents/model";
// eslint-disable-next-line no-restricted-imports
import { setTodoDetails } from "ic-redux/actions/agents/actionCreator";

/**
 * Class representing an activity that triggers the display of todo details.
 * This occurs in SRD-III
 */

class DisplayTodoDetails extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_TODO_DETAILS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    // reset preconditions
    await super.doActivity(agent, [rule2]);
    // console.log("DISPLAY TODO DETAILS");
    try {
      // Get fact with todo details
      const todoDetails: LocalTodo =
        agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[
          ClinicianAttributes.TODO_DETAILS
        ];
      if (todoDetails) {
        store.dispatch(setTodoDetails(todoDetails));
      }

      // Update Facts
      agentAPI.addFact(
        new Belief(
          BeliefKeys.CLINICIAN,
          ClinicianAttributes.TODO_DETAILS,
          null
        ),
        false
      );

      agent.addBelief(
        new Belief(
          BeliefKeys.CLINICIAN,
          ClinicianAttributes.DISPLAY_TODO_DETAILS,
          false
        )
      );

      // End the procedure
      agentAPI.addFact(
        new Belief(
          BeliefKeys.PROCEDURE,
          ProcedureAttributes.SRD_III,
          ProcedureConst.INACTIVE
        ),
        true,
        true
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Preconditions for activiating the DisplayTodoDetails

const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD_III,
  ProcedureConst.ACTIVE
);

const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.DISPLAY_TODO_DETAILS,
  true
);

export const af_DisplayTodoDetails = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_TODO_DETAILS}`,
  [rule1, rule2],
  new DisplayTodoDetails()
);
