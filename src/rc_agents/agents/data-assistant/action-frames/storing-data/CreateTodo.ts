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
import { Storage } from "rc_agents/storage";
import { store } from "util/useRedux";
import { setProcedureSuccessful } from "ic-redux/actions/agents/actionCreator";
import { agentNWA } from "rc_agents/agents";
import { createTodo, listTodosByAlertID } from "aws";
import { AlertInfo, LocalTodo, TodoInput, TodoStatus } from "rc_agents/model";
import { CreateTodoInput } from "aws/API";

// LS-TODO: To be tested with creating Todo associated with an Alert.

/**
 * Class to represent an activity for creating an entry to clinician's Todo table.
 * This happens in Procedure Storing Data (SRD-II) when a clinician creates a new Todo.
 */
class CreateTodo extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.CREATE_TODO);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    const facts = agentAPI.getFacts();

    try {
      // Gets Todo from facts
      const todoInput: TodoInput =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.TODO];

      // Gets locally stored clinicianId
      const clinicianId = await Storage.getClinicianID();
      let alertTodoUpdate: boolean = false;

      if (todoInput && clinicianId) {
        let toSync: boolean | undefined;
        let alertTodoExists = false;

        // Constructs CreateTodoInput to be inserted
        const todoToInsert: CreateTodoInput = {
          clinicianID: clinicianId,
          title: todoInput.title,
          patientName: todoInput.patientName,
          notes: todoInput.notes,
          lastModified: todoInput.lastModified
            ? todoInput.lastModified
            : todoInput.createdAt,
          owner: clinicianId
        };

        // Updates Todo's status
        if (todoInput.completed) {
          todoToInsert.completed = TodoStatus.COMPLETED;
        } else {
          todoToInsert.pending = TodoStatus.PENDING;
        }

        // Triggers associated Alert to be updated if any
        if (todoInput.alert || todoInput.alertId) {
          let alertToUpdate: AlertInfo | undefined;

          // Create Todo for the first time
          if (todoInput.alert) {
            alertToUpdate = todoInput.alert;
            // Removes alert to prevent it from being stored into local storage later on
            delete todoInput.alert;
          }
          // When attempts to update an unsynced Todo
          else if (todoInput.alertId && todoInput.patientId) {
            // Query current AlertInfo from local storage
            const alertInfo = await Storage.getSingleAlertInfo(
              todoInput.alertId,
              todoInput.patientId
            );
            if (alertInfo) {
              alertToUpdate = alertInfo;
            }
          }

          if (alertToUpdate) {
            todoToInsert.alertID = alertToUpdate.id;
            alertToUpdate.completed = true;

            // Adds AlertInfo to facts to be updated
            agentAPI.addFact(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.ALERT,
                alertToUpdate
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
          }
        }

        /**
         * Device is online:
         * 1. Query existing Todo with the same Alert
         * 2. If Todo already exists, triggers UpdateTodo.
         * 3. If Todo does not exist, insert Todo.
         * 4. If Todo is successfully inserted, set toSync to false, otherwise set to true.
         */
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          if (todoInput.alertId) {
            // Queries existing Todo with the same Alert
            const query = await listTodosByAlertID({
              clinicianID: clinicianId,
              alertID: { eq: todoInput.alertId }
            });
            if (query.data.listTodosByAlertID?.items) {
              const results = query.data.listTodosByAlertID?.items;
              if (results && results.length > 0) {
                alertTodoExists = true;
                const existingTodo = results[0]!;

                // Updates input to be used for updating Todo
                todoInput.id = existingTodo.id;
                todoInput._version = existingTodo._version;
                todoInput.lastModified = todoInput.lastModified
                  ? todoInput.lastModified
                  : todoInput.createdAt;
                todoInput.createdAt = existingTodo.createdAt;

                // Add the Todo associated with an alert into facts
                alertTodoUpdate = true;
                agentAPI.addFact(
                  new Belief(
                    BeliefKeys.CLINICIAN,
                    ClinicianAttributes.ALERT_TODO,
                    todoInput
                  ),
                  false
                );

                // Triggers UpdateTodo
                agent.addBelief(
                  new Belief(
                    BeliefKeys.CLINICIAN,
                    ClinicianAttributes.UPDATE_TODO,
                    true
                  )
                );
              }
            }
          }
          if (!alertTodoExists) {
            // Inserts Todo
            const createResponse = await createTodo(todoToInsert);
            if (createResponse.data.createTodo) {
              // Gets newly inserted Todo to update local Todo id
              const insertedTodo = createResponse.data.createTodo;
              todoInput.id = insertedTodo.id;

              // Updates to indicate that Todo is successfully inserted
              toSync = false;
            }
          }
        } else {
          // Device is offline: Todo requires syncing
          toSync = true;
        }

        // Constructs LocalTodo object to be stored locally
        if (toSync !== undefined) {
          const todoToStore: LocalTodo = {
            ...todoInput,
            toSync: toSync
          };

          // Updates local Todos
          await Storage.setTodo(todoToStore);

          // Notifies NWA to sync update or create Todo
          if (toSync) {
            // Offline and Todo does not exist: set pending insert to true
            agentNWA.addBelief(
              new Belief(BeliefKeys.APP, AppAttributes.SYNC_CREATE_TODOS, true)
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

        // Do not request for todo display yet when the todo is associated with an alert
        // The display will only requested in update todo procedure for todos associated with an alert
        if (!alertTodoUpdate) {
          agent.addBelief(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.TODOS_UPDATED,
              true
            )
          );
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
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
  ClinicianAttributes.CREATE_TODO,
  true
);

// Actionframe
export const af_CreateTodo = new Actionframe(
  `AF_${ActionFrameIDs.DTA.CREATE_TODO}`,
  [rule1, rule2],
  new CreateTodo()
);
