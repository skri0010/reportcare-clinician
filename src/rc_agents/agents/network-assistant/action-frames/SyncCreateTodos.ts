/* eslint-disable no-console */
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
  BeliefKeys,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/clinician_framework";
import { Storage } from "rc_agents/storage";
import { createTodo } from "aws/TypedAPI/createMutations";
import { CreateTodoInput } from "aws/API";
import { listTodosByAlertID } from "aws";
import { agentDTA, agentNWA } from "rc_agents/agents";
import { TodoStatus } from "rc_agents/model";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { ProcedureConst } from "agents-framework/Enums";

/**
 * Class to represent the activity for syncing local creation of new Todos.
 */
class SyncCreateTodos extends Activity {
  /**
   * Constructor for the SyncCreateTodos class
   */
  constructor() {
    super(ActionFrameIDs.NWA.SYNC_CREATE_TODOS);
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
        let createSuccessful = true;

        // Todo to be inserted have null id and toSync set to true
        await Promise.all(
          localTodos.map(async (todo) => {
            // Sync changes for existing Todo that is associated with alerts
            if (todo.id && todo.toSync) {
              if (todo.alertId) {
                // Queries existing Todo with the same Alert
                const query = await listTodosByAlertID({
                  clinicianID: clinicianId,
                  alertID: { eq: todo.alertId }
                });
                if (query.data.listTodosByAlertID?.items) {
                  const results = query.data.listTodosByAlertID?.items;
                  if (results && results.length > 0) {
                    // alertTodoExists = true;
                    const existingTodo = results[0]!;

                    // Updates input to be used for updating Todo
                    todo.id = existingTodo.id;
                    todo._version = existingTodo._version;
                    todo.lastModified = existingTodo.createdAt;
                    todo.createdAt = existingTodo.createdAt;

                    // Triggers UpdateTodo
                    agentAPI.addFact(
                      new Belief(
                        BeliefKeys.CLINICIAN,
                        ClinicianAttributes.TODO,
                        todo
                      ),
                      false
                    );

                    // Triggers UpdateTodo
                    agentDTA.addBelief(
                      new Belief(
                        BeliefKeys.CLINICIAN,
                        ClinicianAttributes.UPDATE_TODO,
                        true
                      )
                    );

                    agentAPI.addFact(
                      new Belief(
                        BeliefKeys.PROCEDURE,
                        ProcedureAttributes.SRD_III,
                        ProcedureConst.ACTIVE
                      )
                    );
                  }
                }
              }
            }
            // Syncing for completely new todos
            else if (!todo.id && todo.toSync) {
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
              new Belief(BeliefKeys.APP, AppAttributes.SYNC_CREATE_TODOS, true)
            );
          });
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      setRetryLaterTimeout(() => {
        agentNWA.addBelief(
          new Belief(BeliefKeys.APP, AppAttributes.SYNC_CREATE_TODOS, true)
        );
      });
    }
  }
}

// Preconditions
const rule1 = new Precondition(BeliefKeys.APP, AppAttributes.ONLINE, true);
const rule2 = new ResettablePrecondition(
  BeliefKeys.APP,
  AppAttributes.SYNC_CREATE_TODOS,
  true
);

// Actionframe
export const af_SyncCreateTodos = new Actionframe(
  `AF_${ActionFrameIDs.NWA.SYNC_CREATE_TODOS}`,
  [rule1, rule2],
  new SyncCreateTodos()
);
