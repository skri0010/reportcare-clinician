import {
  Actionframe,
  Agent,
  Belief,
  Activity,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes,
  ProcedureConst
} from "rc_agents/AgentEnums";
import agentAPI from "rc_agents/framework/AgentAPI";
import { store } from "util/useRedux";
import {
  setCompletedTodos,
  setPendingTodos,
  setProcedureOngoing,
  setUpdatedTodo
} from "ic-redux/actions/agents/actionCreator";
import { LocalTodo } from "rc_agents/model";

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
      const currentAgentsState = store.getState().agents;
      const currentPendingTodos = currentAgentsState.pendingTodos;
      const currentCompletedTodos = currentAgentsState.completedTodos;

      // Looks for Todo in the list of current Todos and removes it from the list
      if (updatedTodo.id) {
        // Synced Todo with Id
        let existIndex = currentPendingTodos.findIndex(
          (t) => t.id === updatedTodo.id
        );
        if (existIndex >= 0) {
          currentPendingTodos.splice(existIndex, 1);
        } else {
          existIndex = currentCompletedTodos.findIndex(
            (t) => t.id === updatedTodo.id
          );
          if (existIndex >= 0) {
            currentCompletedTodos.splice(existIndex, 1);
          }
        }
      } else if (updatedTodo.createdAt) {
        // Unsynced Todo without Id
        let existIndex = currentPendingTodos.findIndex(
          (t) => t.createdAt === updatedTodo.createdAt
        );
        if (existIndex >= 0) {
          currentPendingTodos.splice(existIndex, 1);
        } else {
          existIndex = currentCompletedTodos.findIndex(
            (t) => t.createdAt === updatedTodo.createdAt
          );
          if (existIndex >= 0) {
            currentCompletedTodos.splice(existIndex, 1);
          }
        }
      }

      // Adds Todo to the front of the list according to TodoStatus
      if (updatedTodo.completed) {
        currentCompletedTodos.unshift(updatedTodo);
      } else {
        currentPendingTodos.unshift(updatedTodo);
      }

      // Dispatch updated lists
      store.dispatch(setPendingTodos(currentPendingTodos));
      store.dispatch(setCompletedTodos(currentCompletedTodos));

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
        ProcedureAttributes.SRD_II,
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
  ProcedureAttributes.SRD_II,
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
