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
import { setProcedureSuccessful } from "ic-redux/actions/agents/actionCreator";
import agentNWA from "rc_agents/agents/network-assistant/NWA";
import {
  createTodo,
  getAlert,
  listTodosByAlertID,
  updateAlert,
  updateTodo
} from "aws";
import {
  TodoCreateInput,
  LocalTodo,
  AlertStatus,
  TodoStatus,
  TodoUpdateInput
} from "rc_agents/model";
import {
  CreateTodoInput,
  Todo,
  UpdateAlertInput,
  UpdateTodoInput
} from "aws/API";

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
      const todoInput: TodoCreateInput | TodoUpdateInput =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.TODO];

      // Gets locally stored clinicianId
      const clinicianId = await Storage.getClinicianID();

      if (todoInput && clinicianId) {
        let todoId: string | undefined;
        let pendingTodoSync: boolean | undefined;
        let pendingAlertSync = false;
        let alertTodoExists = false;
        let existingTodo: Todo | undefined;

        // Constructs CreateTodoInput to be inserted
        const todoToInsert: CreateTodoInput = {
          clinicianID: clinicianId,
          title: todoInput.title,
          patientName: todoInput.patientName,
          notes: todoInput.notes,
          lastModified: new Date().toISOString(),
          owner: clinicianId
        };

        if (todoInput.completed) {
          todoToInsert.completed = TodoStatus.COMPLETED;
        } else {
          todoToInsert.pending = TodoStatus.PENDING;
        }

        if (todoInput.alert) {
          todoToInsert.alertID = todoInput.alert.id;
          todoInput.alert.completed = true;
        }

        /**
         * Device is online:
         * 1. Query existing Todo with the same Alert
         * 2. If Todo already exists, update Todo instead.
         * 3. If Todo does not exist, insert Todo.
         * 4. If Todo is successfully updated, set pendingTodoSync to false, otherwise set to true.
         * 4. If Todo is inserted, set pendingTodoSync to false, update Alert to completed.
         * 5. If failed to update Alert, set pendingAlertSync to true, store locally in AlertsSync list.
         */
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          if (todoInput.alert) {
            // Queries existing Todo with the same Alert
            const query = await listTodosByAlertID({
              clinicianID: clinicianId,
              alertID: { eq: todoInput.alert.id }
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
            const createResponse = await createTodo(todoToInsert);
            if (createResponse.data.createTodo) {
              // Gets newly inserted Todo to update local Todo id
              const insertedTodo = createResponse.data.createTodo;
              todoId = insertedTodo.id;

              // Updates to indicate that Todo is successfully inserted
              pendingTodoSync = false;

              // Updates alert to completed if any
              if (insertedTodo.alertID) {
                // Queries latest alert
                const alertQuery = await getAlert({ id: insertedTodo.alertID });
                if (alertQuery.data.getAlert) {
                  const latestAlert = alertQuery.data.getAlert;

                  // Latest Alert has higher version than local alert
                  if (
                    todoInput.alert?._version &&
                    latestAlert._version > todoInput.alert?._version
                  ) {
                    // Replace local alert and alert info with information from latest alert
                    await Storage.mergeAlert(latestAlert);
                    await Storage.mergeAlertInfo(latestAlert);
                  } else {
                    // This alert will be used for local merging later on
                    latestAlert.pending = null;
                    latestAlert.completed = AlertStatus.COMPLETED;

                    // Constructs alert object to be updated
                    const alertToUpdate: UpdateAlertInput = {
                      id: latestAlert.id,
                      completed: latestAlert.completed,
                      pending: latestAlert.pending,
                      _version: latestAlert._version
                    };
                    const updateResponse = await updateAlert(alertToUpdate);

                    // Updates to indicate that alert is successfully updated
                    if (updateResponse.data.updateAlert) {
                      pendingAlertSync = false;
                      latestAlert._version =
                        updateResponse.data.updateAlert._version;
                    } else {
                      // Failed to update alert
                      pendingAlertSync = true;
                    }

                    // Updates locally stored alert and alert info
                    // Input is of type Alert
                    await Storage.mergeAlert(latestAlert);
                    await Storage.mergeAlertInfo(latestAlert);
                  }
                }
              }
            }
          } else if (alertTodoExists && existingTodo) {
            // Updates Todo
            // No conflict resolution required since existingTodo is the latest Todo
            const todoToUpdate: UpdateTodoInput = {
              ...todoToInsert,
              id: existingTodo.id,
              _version: existingTodo._version
            };
            const updateResponse = await updateTodo(todoToUpdate);
            if (updateResponse.data.updateTodo) {
              pendingTodoSync = false;
              const updatedTodo = updateResponse.data.updateTodo;
              existingTodo._version = updatedTodo._version;
              existingTodo.lastModified = updatedTodo.lastModified;
            } else {
              pendingTodoSync = true;
            }
          }
        } else {
          /**
           * Device is offline:
           * Both Todo and Alert require syncing.
           */
          pendingTodoSync = true;
          pendingAlertSync = true;
        }

        /**
         * Constructs LocalTodo object to be stored locally.
         * 1. Local Todo for syncing is recognized using the toSync attribute.
         * 2. Local Todo to be inserted has null id and toSync set to true.
         * 3. Local Todo to be updated has non-null id and toSync set to true.
         * 4. If Todo already exists, update local Todo with existing Todo's id, createdAt and _version values.
         * 5. If Todo has associated Alert, include alertId and patientId attributes.
         * 6. If Todo has been successfully inserted, Local Todo will have non-null id.
         * 7. If Todo has been/ is to be updated, Local Todo will have a non-null lastModified.
         */
        if (pendingTodoSync !== undefined) {
          // Constructs Todo to be stored
          const todoToStore: LocalTodo = {
            title: todoToInsert.title,
            patientName: todoToInsert.patientName,
            notes: todoToInsert.notes,
            completed: todoToInsert.completed === TodoStatus.COMPLETED,
            createdAt: todoInput.createdAt
              ? todoInput.createdAt
              : todoToInsert.lastModified,
            toSync: pendingTodoSync,
            _version: 1
          };

          // Todo is associated with an Alert
          if (todoInput.alert) {
            todoToStore.alertId = todoInput.alert.id;
            todoToStore.patientId = todoInput.alert.patientId;
            todoToStore.riskLevel = todoInput.alert.riskLevel;

            // Offline: local alert and alert info haven't been updated yet
            if (pendingTodoSync) {
              // Input is of type AlertInfo
              await Storage.mergeAlert(todoInput.alert);
              await Storage.mergeAlertInfo(todoInput.alert);
            }

            // Merge alert into local storage list to be synced
            if (pendingAlertSync) {
              await Storage.setAlertSync(todoInput.alert);
              // Notifies NWA
              agentNWA.addBelief(
                new Belief(
                  BeliefKeys.APP,
                  AppAttributes.SYNC_ALERTS_UPDATE,
                  true
                )
              );
            }
          }

          // Existing Todo for the same Alert already exists
          if (alertTodoExists && existingTodo) {
            todoToStore.id = existingTodo.id;
            todoToStore.createdAt = existingTodo.createdAt;
            todoToStore.lastModified = todoToInsert.lastModified;
            todoToStore._version = existingTodo._version;
          }

          // Todo has been successfully inserted
          if (!pendingTodoSync && todoId) {
            todoToStore.id = todoId;
          }

          // Updates local Todos
          await Storage.mergeTodo(todoToStore);

          // Notifies NWA to sync update or create Todo
          if (pendingTodoSync) {
            if (alertTodoExists) {
              // Offline and Todo already exists: set pending update to true
              agentNWA.addBelief(
                new Belief(
                  BeliefKeys.APP,
                  AppAttributes.SYNC_TODOS_UPDATE,
                  true
                )
              );
            } else {
              // Offline and Todo does not exist: set pending insert to true
              agentNWA.addBelief(
                new Belief(
                  BeliefKeys.APP,
                  AppAttributes.SYNC_TODOS_CREATE,
                  true
                )
              );
            }
          }

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
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      store.dispatch(setProcedureSuccessful(false));
    }

    agent.addBelief(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.TODOS_UPDATED, true)
    );
  }
}

// Preconditions for activating the CreateTodo class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD_II,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.CREATE_TODO,
  true
);

// Action Frame for CreateTodo class
const af_CreateTodo = new Actionframe(
  `AF_${ActionFrameIDs.DTA.CREATE_TODO}`,
  [rule1, rule2],
  new CreateTodo()
);

export default af_CreateTodo;
