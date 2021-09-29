import {
  Actionframe,
  Activity,
  Agent,
  Belief,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import {
  setRetryLaterTimeout,
  ActionFrameIDs,
  AppAttributes,
  BeliefKeys
} from "rc_agents/clinician_framework";
import { LocalStorage } from "rc_agents/storage";
import { updateTodo } from "aws/TypedAPI/updateMutations";
import { getTodo } from "aws/TypedAPI/getQueries";
import { agentNWA } from "rc_agents/agents";
import { TodoStatus } from "rc_agents/model";

/**
 * Class to represent the activity for syncing local update of Todos.
 */
class SyncUpdateTodos extends Activity {
  /**
   * Constructor
   */
  constructor() {
    super(ActionFrameIDs.NWA.SYNC_UPDATE_TODOS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - agent executing the activity
   */
  async doActivity(agent: Agent): Promise<void> {
    super.doActivity(agent, [rule2]);

    try {
      // Gets locally stored clinicianId
      const clinicianId = await LocalStorage.getClinicianID();

      // Gets locally stored Todos
      const localTodos = await LocalStorage.getTodos();

      if (localTodos && clinicianId) {
        // Indicator of whether all pending updates have been synced
        let updateSuccessful = true;

        // Todo to be updated have a non-null id and toSync set to true
        await Promise.all(
          localTodos.map(async (todo) => {
            if (todo.id && todo.toSync) {
              // Gets latest Todo
              const query = await getTodo({ id: todo.id });
              if (query.data.getTodo) {
                const latestTodo = query.data.getTodo;

                if (todo._version && latestTodo._version > todo._version) {
                  /**
                   * Latest Todo has higher version that the current Todo:
                   * Replaces local Todo with the latest one
                   */
                  todo.title = latestTodo.title;
                  todo.patientName = latestTodo.patientName;
                  todo.notes = latestTodo.notes;
                  todo.completed =
                    latestTodo.completed === TodoStatus.COMPLETED;
                  todo.lastModified = latestTodo.lastModified;
                  todo._version = latestTodo._version;
                  todo.toSync = false;
                } else {
                  // Updates Todo
                  const updateResponse = await updateTodo({
                    id: todo.id,
                    title: todo.title,
                    patientName: todo.patientName,
                    notes: todo.notes,
                    pending: todo.completed ? null : TodoStatus.PENDING,
                    completed: todo.completed ? TodoStatus.COMPLETED : null,
                    lastModified: todo.lastModified,
                    owner: clinicianId,
                    _version: latestTodo._version
                  });

                  if (updateResponse.data.updateTodo) {
                    // Updates current local Todo
                    todo.toSync = false;
                    todo._version = updateResponse.data.updateTodo._version;
                  } else {
                    updateSuccessful = false;
                  }
                }
              }
            }
          })
        );

        // Saves updated Todos locally
        await LocalStorage.setTodos(localTodos);

        if (!updateSuccessful) {
          setRetryLaterTimeout(() => {
            agentNWA.addBelief(
              new Belief(BeliefKeys.APP, AppAttributes.SYNC_UPDATE_TODOS, true)
            );
          });
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setRetryLaterTimeout(() => {
        agentNWA.addBelief(
          new Belief(BeliefKeys.APP, AppAttributes.SYNC_UPDATE_TODOS, true)
        );
      });
    }
  }
}

// Preconditions
const rule1 = new Precondition(BeliefKeys.APP, AppAttributes.ONLINE, true);
const rule2 = new ResettablePrecondition(
  BeliefKeys.APP,
  AppAttributes.SYNC_UPDATE_TODOS,
  true
);

// Actionframe
export const af_SyncUpdateTodos = new Actionframe(
  `AF_${ActionFrameIDs.NWA.SYNC_UPDATE_TODOS}`,
  [rule1, rule2],
  new SyncUpdateTodos()
);
