import {
  Actionframe,
  Agent,
  Belief,
  Activity,
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
import { setProcedureOngoing } from "ic-redux/actions/agents/procedureActionCreator";
import {
  setCompletedTodos,
  setPendingTodos,
  setUpdatedTodo
} from "ic-redux/actions/agents/todoActionCreator";

/**
 * Class to represent an activity for displaying Todos.
 * This happens in Procedure Storing Data (SRD-II).
 */
class DisplayTodos extends Activity {
  constructor() {
    super(ActionFrameIDs.UXSA.DISPLAY_TODOS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    // Reset preconditions
    await super.doActivity(agent, [rule2]);

    const updatedTodo: LocalTodo =
      agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.TODO];

    if (updatedTodo) {
      // Removes previous Todo from its existing list and adds it to the front of updated list
      const currentAgentsState = store.getState().todos;
      let currentPendingTodos = currentAgentsState.pendingTodos;
      let currentCompletedTodos = currentAgentsState.completedTodos;

      /**
       * Since each todo has an associated alert ID, check if the updatedTodo's alert ID
       * is the same as the alert ID from any of current pending or completed todos
       */
      if (currentPendingTodos) {
        let existIndex: number;
        existIndex = currentPendingTodos.findIndex(
          (t) => t.createdAt === updatedTodo.createdAt
        );

        // If updatedTodo is in pending todos, remove it from pending todos
        if (existIndex >= 0) {
          currentPendingTodos.splice(existIndex, 1);
        } else if (currentCompletedTodos) {
          existIndex = currentCompletedTodos.findIndex(
            (t) => t.createdAt === updatedTodo.createdAt
          );
          // If updatedTodo is in completed todos, remove it from completed todos
          if (existIndex >= 0) {
            currentCompletedTodos.splice(existIndex, 1);
          }
        }
      }

      // Adds Todo to the front of the list according to TodoStatus
      if (updatedTodo.completed) {
        if (!currentCompletedTodos) {
          currentCompletedTodos = [];
        }
        currentCompletedTodos.unshift(updatedTodo);
      } else {
        if (!currentPendingTodos) {
          currentPendingTodos = [];
        }
        currentPendingTodos.unshift(updatedTodo);
      }

      // Dispatch updated lists
      if (currentPendingTodos) {
        store.dispatch(setPendingTodos(currentPendingTodos));
      }

      if (currentCompletedTodos) {
        store.dispatch(setCompletedTodos(currentCompletedTodos));
      }

      // Dispatch updatedTodo to be displayed in TodoDetailsScreen
      store.dispatch(setUpdatedTodo(updatedTodo));

      // Update Facts
      // Removes item
      agentAPI.addFact(
        new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.TODO, null),
        false
      );
    }

    // Update Facts
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

    // Dispatch to indicate that procedure has ended
    store.dispatch(setProcedureOngoing(false));
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
  ClinicianAttributes.DISPLAY_TODOS,
  true
);

// Actionframe
export const af_DisplayTodos = new Actionframe(
  `AF_${ActionFrameIDs.UXSA.DISPLAY_TODOS}`,
  [rule1, rule2],
  new DisplayTodos()
);
