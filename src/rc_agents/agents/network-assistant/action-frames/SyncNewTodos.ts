import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition
} from "rc_agents/framework";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ActionFrameIDs,
  AppAttributes,
  AsyncStorageKeys,
  BeliefKeys,
  CommonAttributes
} from "rc_agents/AgentEnums";
import { updateAlert } from "aws/TypedAPI/updateMutations";
import { createTodo } from "aws/TypedAPI/createMutations";
import { Todo } from "rc_agents/model";
import { getAlert } from "aws/TypedAPI/getQueries";
import { CreateTodoInput } from "aws/API";
import agentAPI from "rc_agents/framework/AgentAPI";
import { AlertStatus } from "aws";

// LS-TODO: To be tested again after integrating with Alert and Todo front end

/**
 * Class to represent the activity for syncing local creation of new Todos.
 */
class SyncNewTodos extends Activity {
  /**
   * Constructor for the SyncNewTodos class
   */
  constructor() {
    super(ActionFrameIDs.NWA.SYNC_NEW_TODOS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent);

    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    // Prevents the activity from being executed multiple times while requests are being synced
    agent.addBelief(
      new Belief(BeliefKeys.APP, AppAttributes.PENDING_TODO_INSERT_SYNC, false)
    );

    try {
      // Gets locally stored clinicianId
      const clinicianId = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN_ID
      );

      // Gets locally stored Todos
      const localTodosStr = await AsyncStorage.getItem(AsyncStorageKeys.TODOS);
      if (localTodosStr && clinicianId) {
        const localTodos: Todo[] = JSON.parse(localTodosStr);

        // Todo to be inserted have null id and pendingSync set to true
        localTodos.map(async (todo) => {
          if (!todo.id && todo.pendingSync) {
            const todoToInsert: CreateTodoInput = {
              clinicianID: clinicianId,
              title: todo.title,
              patientName: todo.patientName,
              notes: todo.notes,
              completed: todo.completed,
              lastModified: todo.createdAt,
              owner: clinicianId
            };
            if (todo.alertId) {
              todoToInsert.alertID = todo.alertId;
            }
            // Inserts Todo
            const createResponse = await createTodo(todoToInsert);

            if (createResponse.data && createResponse.data.createTodo) {
              const insertedTodo = createResponse.data.createTodo;

              // Updates alert to completed if any
              if (insertedTodo.alertID) {
                const alertQuery = await getAlert({ id: insertedTodo.alertID });
                if (alertQuery.data && alertQuery.data.getAlert) {
                  const latestAlert = alertQuery.data.getAlert;
                  await updateAlert({
                    id: latestAlert?.id,
                    completed: AlertStatus.COMPLETED,
                    pending: null,
                    _version: latestAlert?._version
                  });
                }
              }
              // Updates current local Todo
              todo.id = insertedTodo.id;
              todo.pendingSync = false;
            }
          }
          return todo;
        });

        // Saves updated Todos locally
        await AsyncStorage.setItem(
          AsyncStorageKeys.TODOS,
          JSON.stringify(localTodos)
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
    agentAPI.addFact(
      new Belief(BeliefKeys.APP, AppAttributes.PENDING_TODO_INSERT_SYNC, null),
      false,
      true
    );
  }
}

// Rules or preconditions for activating the SyncNewTodos class
const rule1 = new Precondition(BeliefKeys.APP, AppAttributes.ONLINE, true);
const rule2 = new Precondition(
  BeliefKeys.APP,
  AppAttributes.PENDING_TODO_INSERT_SYNC,
  true
);

// Actionframe of the SyncNewTodos class
const af_SyncNewTodos = new Actionframe(
  `AF_${ActionFrameIDs.NWA.SYNC_NEW_TODOS}`,
  [rule1, rule2],
  new SyncNewTodos()
);

export default af_SyncNewTodos;
