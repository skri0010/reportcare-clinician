import Actionframe from "../../../agent_framework/base/Actionframe";
import Activity from "../../../agent_framework/base/Activity";
import Agent from "../../../agent_framework/base/Agent";
import Belief from "../../../agent_framework/base/Belief";
import Precondition from "../../../agent_framework/base/Precondition";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ActionFrameIDs,
  AppAttributes,
  AsyncStorageKeys,
  BeliefKeys,
  CommonAttributes
} from "agents_implementation/agent_framework/AgentEnums";
import { updateTodo } from "aws/TypedAPI/updateMutations";
import { Todo } from "agents_implementation/agent_framework/model";
import { getTodo } from "aws/TypedAPI/getQueries";

// LS-TODO: To be tested after merging with Todo tab

/**
 * Class to represent the activity for syncing local update of Todos.
 */
class SyncUpdatedTodos extends Activity {
  /**
   * Constructor for the SyncUpdatedTodos class
   */
  constructor() {
    super(ActionFrameIDs.NWA.SYNC_UDPATED_TODOS);
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
      new Belief(BeliefKeys.APP, AppAttributes.PENDING_TODO_UPDATE_SYNC, false)
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

        // Todo to be updated have a non-null id and pendingSync set to true
        localTodos.forEach(async (todo) => {
          if (todo.id && todo.pendingSync) {
            // Gets latest Todo
            const query = await getTodo({ id: todo.id });
            if (query.data && query.data.getTodo) {
              const latestTodo = query.data.getTodo;

              // Updates Todo
              const updateResponse = await updateTodo({
                id: todo.id,
                title: todo.title,
                notes: todo.notes,
                completed: todo.completed,
                lastModified: todo.lastModified,
                owner: clinicianId,
                _version: latestTodo._version
              });

              if (updateResponse && updateResponse.data) {
                // Updates current local Todo
                todo.pendingSync = false;
              }
            }
          }
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
  }
}

// Rules or preconditions for activating the SyncUpdatedTodos class
const rule1 = new Precondition(BeliefKeys.APP, AppAttributes.ONLINE, true);
const rule2 = new Precondition(
  BeliefKeys.APP,
  AppAttributes.PENDING_TODO_UPDATE_SYNC,
  true
);

// Actionframe of the SyncUpdatedTodos class
const af_SyncUpdatedTodos = new Actionframe(
  `AF_${ActionFrameIDs.NWA.SYNC_UDPATED_TODOS}`,
  [rule1, rule2],
  new SyncUpdatedTodos()
);

export default af_SyncUpdatedTodos;
