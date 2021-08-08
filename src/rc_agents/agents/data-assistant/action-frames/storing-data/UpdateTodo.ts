import {
  Actionframe,
  Agent,
  Activity,
  Belief,
  Precondition,
  ResettablePrecondition
} from "rc_agents/framework";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ProcedureConst,
  AsyncStorageKeys,
  BeliefKeys,
  ProcedureAttributes,
  AppAttributes,
  ActionFrameIDs,
  ClinicianAttributes
} from "rc_agents/AgentEnums";
import agentAPI from "rc_agents/framework/AgentAPI";
import { store } from "ic-redux/store";
import { setProcedureSuccessful } from "ic-redux/actions/agents/actionCreator";
import agentNWA from "rc_agents/agents/network-assistant/NWA";
import { getTodo, updateTodo } from "aws";
import { Todo, UpdatedTodoInput } from "rc_agents/model";
import { UpdateTodoInput } from "aws/API";

// LS-TODO: To be tested again after integrating with Alert and Todo front end

/**
 * Class to represent an activity for updating a clinician's Todo.
 * This happens in Procedure Storing Data (SRD) when a clinician edits an existing Todo.
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

    try {
      // Gets Todo details to be updated
      const updatedTodo: UpdatedTodoInput =
        agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.TODO];

      // Gets locally stored clinicianId
      const clinicianId = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN_ID
      );

      if (updatedTodo && clinicianId) {
        let pendingSync: boolean | undefined;

        const todoToUpdate: UpdateTodoInput = {
          id: updatedTodo.id,
          title: updatedTodo.title,
          notes: updatedTodo.notes,
          completed: updatedTodo.completed,
          lastModified: new Date().toISOString(),
          owner: clinicianId
        };

        // Device is online
        if (agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Gets latest version of current Todo
          const query = await getTodo({ id: updatedTodo.id });
          if (query.data) {
            const latestTodo = query.data.getTodo;

            // Updates Todo
            const updateQuery = await updateTodo({
              ...todoToUpdate,
              _version: latestTodo?._version
            });

            // Saves Todo locally
            if (updateQuery.data && updateQuery.data.updateTodo) {
              pendingSync = false;
            }
          }
        }
        // Device is offline: saves Todo locally
        else {
          pendingSync = true;
        }

        // Updates locally saved Todo
        if (pendingSync !== undefined) {
          const localTodosStr = await AsyncStorage.getItem(
            AsyncStorageKeys.TODOS
          );
          if (localTodosStr) {
            const localTodos: Todo[] = JSON.parse(localTodosStr);

            localTodos.forEach((todo) => {
              if (todo.id === todoToUpdate.id) {
                todo.title = todoToUpdate.title!;
                todo.notes = todoToUpdate.notes!;
                todo.completed = todoToUpdate.completed!;
                todo.lastModified = todoToUpdate.lastModified!;
                todo.pendingSync = pendingSync!;
              }
            });
            await AsyncStorage.setItem(
              AsyncStorageKeys.TODOS,
              JSON.stringify(localTodos)
            );
          }

          // Notifies NWA if the Todo to be stored has pendingSync set to true
          if (pendingSync) {
            // Notifies NWA
            agentNWA.addBelief(
              new Belief(
                BeliefKeys.APP,
                AppAttributes.PENDING_TODO_UPDATE_SYNC,
                true
              )
            );
          }
        }

        // LS-TODO: Dispatch updated Todo to front end

        // Dispatch to front end to indicate that procedure is successful
        store.dispatch(setProcedureSuccessful(true));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
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
        ProcedureAttributes.SRD,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );
  }
}

// Preconditions for activating the UpdateTodo class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.EDIT_TODO,
  true
);

// Action Frame for UpdateTodo class
const af_UpdateTodo = new Actionframe(
  `AF_${ActionFrameIDs.DTA.UPDATE_TODO}`,
  [rule1, rule2],
  new UpdateTodo()
);

export default af_UpdateTodo;
