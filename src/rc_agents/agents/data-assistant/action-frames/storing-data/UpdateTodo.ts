import {
  Actionframe,
  Agent,
  Activity,
  Belief,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  ProcedureConst,
  BeliefKeys,
  ProcedureAttributes,
  AppAttributes,
  ActionFrameIDs,
  ClinicianAttributes
} from "rc_agents/AgentEnums";
import { Storage } from "rc_agents/storage";
import agentAPI from "rc_agents/framework/AgentAPI";
import { store } from "util/useRedux";
import {
  setProcedureOngoing,
  setProcedureSuccessful
} from "ic-redux/actions/agents/actionCreator";
import agentNWA from "rc_agents/agents/network-assistant/NWA";
import { getTodo, updateTodo } from "aws";
import { LocalTodo, TodoUpdateInput } from "rc_agents/model";
import { UpdateTodoInput, Todo } from "aws/API";
import { updateLocalTodos } from "./CreateTodo";

/**
 * Class to represent an activity for updating a clinician's Todo.
 * This happens in Procedure Storing Data (SRD-II) when a clinician updates an existing Todo.
 */
class UpdateTodo extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.UPDATE_TODO);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    const facts = agentAPI.getFacts();

    try {
      // Gets Todo details to be updated
      const todoInput: TodoUpdateInput =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.TODO];

      // Gets locally stored clinicianId
      const clinicianId = await Storage.getClinicianID();

      if (todoInput && clinicianId) {
        let pendingSync: boolean | undefined;
        let todoVersion: number | undefined;

        // Constructs UpdateTodoInput to be updated
        const todoToUpdate: UpdateTodoInput = {
          id: todoInput.id,
          title: todoInput.title,
          patientName: todoInput.patientName,
          notes: todoInput.notes,
          completed: todoInput.completed,
          lastModified: new Date().toISOString(),
          owner: clinicianId,
          _version: todoInput._version
        };

        // Device is online
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Gets latest version of current Todo
          const query = await getTodo({ id: todoInput.id });
          if (query.data?.getTodo) {
            const latestTodo = query.data.getTodo;
            /**
             * Conflict resolution when latest Todo in database has higher version:
             * Local Todo will not be updated to the cloud and will be replaced by the latest one
             */
            if (
              latestTodo?._version &&
              latestTodo._version > todoInput._version
            ) {
              await mergeLocalTodo(latestTodo);
            } else {
              // Updates Todo
              const updateQuery = await updateTodo(todoToUpdate);

              // Saves Todo locally
              if (updateQuery.data?.updateTodo) {
                // Updates to indicate that Todo is successfully updated
                pendingSync = false;
                todoVersion = updateQuery.data.updateTodo._version;
              }
            }
          }
        }
        // Device is offline: saves Todo locally
        else {
          pendingSync = true;
        }

        // Updates locally saved Todo
        if (pendingSync !== undefined) {
          // Constructs Todo to be stored
          const todoToStore: LocalTodo = {
            id: todoInput.id,
            title: todoInput.title,
            patientName: todoInput.patientName,
            notes: todoInput.notes,
            completed: todoInput.completed,
            createdAt: todoInput.createdAt,
            lastModified: todoToUpdate.lastModified!,
            pendingSync: pendingSync,
            _version: todoVersion || todoInput._version
          };

          // Updates Todo in local storage
          await updateLocalTodos(todoToStore);

          // Notifies NWA if the Todo to be stored has pendingSync set to true
          if (pendingSync) {
            // Notifies NWA
            agentNWA.addBelief(
              new Belief(BeliefKeys.APP, AppAttributes.SYNC_TODOS_UPDATE, true)
            );
          }
        }
        // Dispatch to front end to indicate that procedure is successful
        store.dispatch(setProcedureSuccessful(true));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // Dispatch to front end to indicate that procedure is successful
      store.dispatch(setProcedureSuccessful(false));
    }

    // Update Facts
    // Removes Todo from facts
    agentAPI.addFact(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.TODO, null),
      false
    );
    // Stops the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.SRD_II,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );

    // Dispatch to front end that procedure has been completed
    store.dispatch(setProcedureOngoing(false));
  }
}

/**
 * Merges local Todo with input Todo
 * Used when version conflict occurs
 * @param todo input Todo
 */
const mergeLocalTodo = async (todo: Todo): Promise<void> => {
  let localTodos = await Storage.getTodos();

  // Constructs Todo to be stored
  const todoToStore: LocalTodo = {
    id: todo.id,
    title: todo.title,
    patientName: todo.patientName,
    notes: todo.notes,
    createdAt: todo.createdAt,
    lastModified: todo.lastModified,
    _version: todo._version,
    completed: todo.completed,
    pendingSync: false
  };

  // If there is Alert associated with the Todo
  if (todo.alertID) {
    todoToStore.alertId = todo.alertID;
  } else if (todo.alert) {
    todoToStore.patientId = todo.alert.patientID;
  }

  if (localTodos) {
    // Replaces local Todo with current one if exists, otherwise add into the list
    const existIndex = localTodos.findIndex((t) => t.id === todo.id);
    if (existIndex >= 0) {
      localTodos[existIndex] = todoToStore;
    } else {
      localTodos.push(todoToStore);
    }
  } else {
    localTodos = [todoToStore];
  }

  if (localTodos) {
    await Storage.setTodos(localTodos);
  }
};

// Preconditions for activating the UpdateTodo class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD_II,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.UPDATE_TODO,
  true
);

// Action Frame for UpdateTodo class
const af_UpdateTodo = new Actionframe(
  `AF_${ActionFrameIDs.DTA.UPDATE_TODO}`,
  [rule1, rule2],
  new UpdateTodo()
);

export default af_UpdateTodo;
