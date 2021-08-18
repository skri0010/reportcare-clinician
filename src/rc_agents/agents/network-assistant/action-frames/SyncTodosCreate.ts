import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition,
  setRetryLaterTimeout
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys
} from "rc_agents/AgentEnums";
import { Storage } from "rc_agents/storage";
import { updateTodo } from "aws/TypedAPI/updateMutations";
import { createTodo } from "aws/TypedAPI/createMutations";
import { CreateTodoInput, Todo, UpdateTodoInput } from "aws/API";
import { listTodosByAlertID } from "aws";
import agentNWA from "../NWA";
import { TodoStatus } from "rc_agents/model";

/**
 * Class to represent the activity for syncing local creation of new Todos.
 */
class SyncTodosCreate extends Activity {
  /**
   * Constructor for the SyncTodosCreate class
   */
  constructor() {
    super(ActionFrameIDs.NWA.SYNC_TODOS_CREATE);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent, [rule2]);

    try {
      // Gets locally stored clinicianId
      const clinicianId = await Storage.getClinicianID();

      // Gets locally stored Todos
      const localTodos = await Storage.getTodos();

      if (localTodos && clinicianId) {
        // Indicators of whether all pending Todos have been synced
        let createSuccessful = false;
        let updateSuccessful = false;

        // Todo to be inserted have null id and toSync set to true
        await Promise.all(
          localTodos.map(async (todo) => {
            if (!todo.id && todo.toSync) {
              let alertTodoExists = false;
              let existingTodo: Todo | undefined;
              if (todo.alertId) {
                // Queries existing Todo with the same Alert
                const query = await listTodosByAlertID({
                  clinicianID: clinicianId,
                  alertID: { eq: todo.alertId }
                });
                if (query.data.listTodosByAlertID?.items) {
                  const results = query.data.listTodosByAlertID?.items;
                  if (results && results.length > 0) {
                    alertTodoExists = true;
                    existingTodo = results[0]!;
                  }
                }
              }

              if (!alertTodoExists) {
                // Inserts Todo
                const todoToInsert: CreateTodoInput = {
                  clinicianID: clinicianId,
                  title: todo.title,
                  patientName: todo.patientName,
                  notes: todo.notes,
                  lastModified: todo.createdAt,
                  owner: clinicianId
                };

                if (todo.completed) {
                  todoToInsert.completed = TodoStatus.COMPLETED;
                } else {
                  todoToInsert.pending = TodoStatus.PENDING;
                }

                if (todo.alertId) {
                  todoToInsert.alertID = todo.alertId;
                }
                // Inserts Todo
                const createResponse = await createTodo(todoToInsert);

                if (createResponse.data.createTodo) {
                  // Updates current local Todo
                  todo.id = createResponse.data.createTodo.id;
                  todo.toSync = false;

                  // Alert update will be handled by SyncAlertsUpdate action frame.
                } else {
                  createSuccessful = false;
                }
              } else if (alertTodoExists && existingTodo) {
                // Todo for the same Alert exists: update this Todo

                // Updates attributes of local Todo
                todo.id = existingTodo.id;
                todo._version = existingTodo._version;

                // Constructs object for updating
                const todoToUpdate: UpdateTodoInput = {
                  id: todo.id,
                  title: todo.title,
                  patientName: todo.patientName,
                  notes: todo.notes,
                  pending: todo.completed ? null : TodoStatus.PENDING,
                  completed: todo.completed ? TodoStatus.COMPLETED : null,
                  lastModified: todo.createdAt,
                  owner: clinicianId,
                  _version: todo._version
                };

                todo.createdAt = existingTodo.createdAt;

                const updateResponse = await updateTodo(todoToUpdate);
                if (updateResponse.data.updateTodo) {
                  const updatedTodo = updateResponse.data.updateTodo;
                  todo.toSync = false;
                  todo._version = updatedTodo._version;
                } else {
                  updateSuccessful = false;
                }
              }
            }
            return todo;
          })
        );

        // Saves updated Todos locally
        if (localTodos) {
          await Storage.setTodos(localTodos);
        }

        // Set to retry when operation is not successful
        if (!createSuccessful) {
          setRetryLaterTimeout(() => {
            agentNWA.addBelief(
              new Belief(BeliefKeys.APP, AppAttributes.SYNC_TODOS_CREATE, true)
            );
          });
        }

        if (!updateSuccessful) {
          setRetryLaterTimeout(() => {
            agentNWA.addBelief(
              new Belief(BeliefKeys.APP, AppAttributes.SYNC_TODOS_UPDATE, true)
            );
          });
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setRetryLaterTimeout(() => {
        agentNWA.addBelief(
          new Belief(BeliefKeys.APP, AppAttributes.SYNC_TODOS_CREATE, true)
        );
      });
    }
  }
}

// Preconditions
const rule1 = new Precondition(BeliefKeys.APP, AppAttributes.ONLINE, true);
const rule2 = new ResettablePrecondition(
  BeliefKeys.APP,
  AppAttributes.SYNC_TODOS_CREATE,
  true
);

// Actionframe
const af_SyncTodosCreate = new Actionframe(
  `AF_${ActionFrameIDs.NWA.SYNC_TODOS_CREATE}`,
  [rule1, rule2],
  new SyncTodosCreate()
);

export default af_SyncTodosCreate;
