import {
  Actionframe,
  Activity,
  Agent,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import {
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys
} from "rc_agents/AgentEnums";
import { Storage } from "rc_agents/storage";
import { updateTodo } from "aws/TypedAPI/updateMutations";
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
    super.doActivity(agent, [rule2]);

    try {
      // Gets locally stored clinicianId
      const clinicianId = await Storage.getClinicianID();

      // Gets locally stored Todos
      const localTodos = await Storage.getTodos();
      if (localTodos && clinicianId) {
        // Todo to be updated have a non-null id and pendingSync set to true
        await Promise.all(
          localTodos.map(async (todo) => {
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
          })
        );

        // Saves updated Todos locally
        await Storage.setTodos(localTodos);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

// Rules or preconditions for activating the SyncUpdatedTodos class
const rule1 = new Precondition(BeliefKeys.APP, AppAttributes.ONLINE, true);
const rule2 = new ResettablePrecondition(
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
