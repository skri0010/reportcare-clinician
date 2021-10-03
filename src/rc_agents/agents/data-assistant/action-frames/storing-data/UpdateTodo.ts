import {
  Actionframe,
  Agent,
  Activity,
  Belief,
  Precondition,
  ResettablePrecondition
} from "agents-framework";
import { ProcedureConst } from "agents-framework/Enums";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import {
  BeliefKeys,
  ProcedureAttributes,
  AppAttributes,
  ActionFrameIDs,
  ClinicianAttributes
} from "rc_agents/clinician_framework";
import { LocalStorage } from "rc_agents/storage";
import { store } from "util/useRedux";
import { setProcedureSuccessful } from "ic-redux/actions/agents/actionCreator";
import { agentNWA } from "rc_agents/agents";
import { getTodo, updateTodo } from "aws";
import { LocalTodo, TodoStatus } from "rc_agents/model";
import { UpdateTodoInput } from "aws/API";

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
      const todoInput: LocalTodo =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.TODO];

      const isOnline: boolean = facts[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      // Gets locally stored clinicianId
      const clinicianId = await LocalStorage.getClinicianID();

      if (todoInput && !todoInput.id) {
        /**
         * This section handles updating of todo when the todo is either:
         * 1. Created offline and not synced
         * 2. Created from an already completed alert
         */
        if (todoInput.alertId) {
          // Get the todo based on the alert ID of the alert associated with the todo
          const localUnsyncTodos = await LocalStorage.getTodoFromAlertID(
            todoInput.alertId
          );

          // Update existing and outdated todo in local storage with the updated todo
          if (localUnsyncTodos) {
            const localUnsyncTodo = localUnsyncTodos[0];
            todoInput.id = localUnsyncTodo.id;
            todoInput._version = localUnsyncTodo._version;
            todoInput.lastModified = todoInput.lastModified
              ? todoInput.lastModified
              : todoInput.createdAt;
            todoInput.createdAt = localUnsyncTodo.createdAt;
            todoInput.toSync = true;
          }

          // Update alert version etc
          // Adds AlertInfo to facts to be updated
          agentAPI.addFact(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.ALERT_INFO,
              todoInput.alert
            ),
            false
          );
          // Triggers to update alert
          agent.addBelief(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.UPDATE_ALERT,
              true
            )
          );
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PROCEDURE,
              ProcedureAttributes.AT_CP_II,
              ProcedureConst.ACTIVE
            )
          );
          // Removes alert to avoid it from being stored into local storage
          delete todoInput.alert;
        }
      }

      // Updates the todo in the DB and the local storage
      if (todoInput && todoInput.id && clinicianId) {
        let toSync: boolean | undefined;

        // Constructs UpdateTodoInput to be updated
        const todoToUpdate: UpdateTodoInput = {
          id: todoInput.id,
          title: todoInput.title,
          patientName: todoInput.patientName,
          notes: todoInput.notes,
          completed: todoInput.completed ? TodoStatus.COMPLETED : null,
          pending: todoInput.completed ? null : TodoStatus.PENDING,
          lastModified: todoInput.lastModified,
          owner: clinicianId,
          _version: todoInput._version
        };

        // Device is online
        if (isOnline) {
          // Gets latest version of current Todo
          const query = await getTodo({ id: todoInput.id });
          if (query.data.getTodo) {
            const latestTodo = query.data.getTodo;
            /**
             * Conflict resolution when latest Todo in database has higher version:
             * Local Todo will not be updated to the cloud and will be replaced by the latest one
             */
            if (
              latestTodo?._version &&
              latestTodo._version > todoInput._version
            ) {
              await LocalStorage.setTodo(latestTodo);
            } else {
              // Updates Todo
              const updateQuery = await updateTodo(todoToUpdate);

              // Saves Todo locally
              if (updateQuery.data.updateTodo) {
                // Updates to indicate that Todo is successfully updated
                toSync = false;
                todoInput._version = updateQuery.data.updateTodo._version;
              }
            }
          }
        }
        // Device is offline: saves Todo locally
        else {
          toSync = true;
        }

        // Updates locally saved Todo
        if (toSync !== undefined) {
          // Constructs Todo to be stored
          const todoToStore: LocalTodo = {
            ...todoInput,
            toSync: toSync
          };

          // Updates Todo in local storage
          await LocalStorage.setTodo(todoToStore);

          // Notifies NWA if the Todo to be stored has toSync set to true
          if (toSync) {
            // Notifies NWA
            agentNWA.addBelief(
              new Belief(BeliefKeys.APP, AppAttributes.SYNC_UPDATE_TODOS, true)
            );
          }

          // Adds LocalTodo to facts to be dispatched by UXSA
          agentAPI.addFact(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.TODO,
              todoToStore
            ),
            false
          );
        }
        // Dispatch to front end to indicate that procedure is successful
        store.dispatch(setProcedureSuccessful(true));

        agent.addBelief(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.TODOS_UPDATED,
            true
          )
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      // Dispatch to front end to indicate that procedure is successful
      store.dispatch(setProcedureSuccessful(false));
    }
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
  ClinicianAttributes.UPDATE_TODO,
  true
);

// Actionframe
export const af_UpdateTodo = new Actionframe(
  `AF_${ActionFrameIDs.DTA.UPDATE_TODO}`,
  [rule1, rule2],
  new UpdateTodo()
);
