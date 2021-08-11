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
import { store } from "ic-redux/store";
import {
  setNewTodo,
  setProcedureOngoing,
  setProcedureSuccessful
} from "ic-redux/actions/agents/actionCreator";
import agentNWA from "rc_agents/agents/network-assistant/NWA";
import {
  AlertStatus,
  createTodo,
  getAlert,
  listTodosByAlertID,
  updateAlert,
  updateTodo
} from "aws";
import { TodoCreateInput, LocalTodo, AlertInfo } from "rc_agents/model";
import {
  Alert,
  CreateTodoInput,
  Todo,
  UpdateAlertInput,
  UpdateTodoInput
} from "aws/API";
import { RiskLevel } from "models/RiskLevel";
import { mapColorCodeToRiskLevel } from "../triage-alert-hf-clinic/RetrievePendingAlertCount";

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
      const todoInput: TodoCreateInput =
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
          completed: false,
          owner: clinicianId
        };

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
            if (createResponse.data?.createTodo) {
              // Gets newly inserted Todo to update local Todo id
              const insertedTodo = createResponse.data.createTodo;
              todoId = insertedTodo.id;

              // Updates to indicate that Todo is successfully inserted
              pendingTodoSync = false;

              // Updates alert to completed if any
              if (insertedTodo.alertID) {
                // Queries latest alert
                const alertQuery = await getAlert({ id: insertedTodo.alertID });
                if (alertQuery.data?.getAlert) {
                  const latestAlert = alertQuery.data.getAlert;

                  // Latest Alert has higher version than local alert
                  if (
                    todoInput.alert?._version &&
                    latestAlert._version > todoInput.alert?._version
                  ) {
                    // Replace local alert and alert info with information from latest alert
                    await updateLocalAlertAndAlertInfo(latestAlert);
                  } else {
                    // This alert will be used for local merging later on
                    latestAlert.pending = null;
                    latestAlert.completed = AlertStatus.COMPLETED;

                    // Constructs alert object to be updated
                    const alertToUpdate: UpdateAlertInput = {
                      id: latestAlert?.id,
                      completed: latestAlert.completed,
                      pending: latestAlert.pending,
                      _version: latestAlert?._version
                    };
                    const updateResponse = await updateAlert(alertToUpdate);

                    // Updates to indicate that alert is successfully updated
                    if (updateResponse.data?.updateAlert) {
                      pendingAlertSync = false;
                      latestAlert._version =
                        updateResponse.data.updateAlert._version;
                    } else {
                      // Failed to update alert
                      pendingAlertSync = true;
                    }

                    // Updates locally stored alert and alert info
                    // Input is of type Alert
                    await updateLocalAlertAndAlertInfo(latestAlert);
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
            if (updateResponse.data?.updateTodo) {
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
         * 1. Local Todo for syncing is recognized using the pendingSync attribute.
         * 2. Local Todo to be inserted has null id and pendingSync set to true.
         * 3. Local Todo to be updated has non-null id and pendingSync set to true.
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
            completed: todoToInsert.completed,
            createdAt: todoToInsert.lastModified,
            pendingSync: pendingTodoSync,
            _version: 1
          };

          // Todo is associated with an Alert
          if (todoInput.alert) {
            todoToStore.alertId = todoInput.alert.id;
            todoToStore.patientId = todoInput.alert.patientId;

            // Offline: local alert and alert info haven't been updated yet
            if (pendingTodoSync) {
              // Input is of type AlertInfo
              await updateLocalAlertAndAlertInfo(todoInput.alert);
            }

            // Merge alert into local storage list to be synced
            if (pendingAlertSync) {
              await mergeIntoLocalAlertsSync(todoInput.alert);
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
          await updateLocalTodos(todoToStore);

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

          // Dispatch new Todo to front end
          store.dispatch(setNewTodo(todoToStore));
        }

        // Dispatch to front end to indicate that procedure is successful
        store.dispatch(setProcedureSuccessful(true));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      store.dispatch(setProcedureSuccessful(false));
    }

    // Update Facts
    // Removes new Todo from facts
    agentAPI.addFact(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.TODO, null),
      false
    );
    // Stops the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.SRD_II,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );

    // Dispatch to front end that procedure has been completed
    store.dispatch(setProcedureOngoing(false));
  }
}

/**
 * Merge current alert into the list of alerts awaiting updates.
 * @param alert alert to be merged
 */
export const mergeIntoLocalAlertsSync = async (
  alertInfo: AlertInfo
): Promise<void> => {
  let localAlertsSync = await Storage.getAlertsSync();
  if (localAlertsSync) {
    const existIndex = localAlertsSync.findIndex((a) => a.id === alertInfo.id);
    if (existIndex >= 0) {
      localAlertsSync[existIndex] = alertInfo;
    }
  } else {
    localAlertsSync = [alertInfo];
  }
  if (localAlertsSync) {
    await Storage.setAlertsSync(localAlertsSync);
  }
};

/**
 * Updates local Alert and AlertInfo.
 * @param alert either an Alert or AlertInfo.
 */
export const updateLocalAlertAndAlertInfo = async (
  alert: Alert | AlertInfo
): Promise<void> => {
  // 1. Updates local alerts
  let localAlerts = await Storage.getAlerts();

  // Gets risk level of the current alert
  let riskLevel: RiskLevel | undefined;
  if ((alert as Alert).colorCode) {
    riskLevel = mapColorCodeToRiskLevel((alert as Alert).colorCode);
  } else if ((alert as AlertInfo).riskLevel) {
    riskLevel = (alert as AlertInfo).riskLevel!;
  }

  if (localAlerts && riskLevel) {
    // Risk level found: update alert if exists, otherwise add into the list
    const riskAlerts = localAlerts[riskLevel];
    const existIndex = riskAlerts.findIndex((a) => a.id === alert.id);
    if (existIndex >= 0) {
      // Updates existing alert
      if ((alert as Alert).colorCode) {
        // Input is of type Alert
        riskAlerts[existIndex] = alert as Alert;
      } else if ((alert as AlertInfo).riskLevel) {
        const currentAlert = riskAlerts[existIndex];
        // Input is of type AlertInfo
        if ((alert as AlertInfo).completed) {
          currentAlert.completed = AlertStatus.COMPLETED;
          currentAlert.pending = null;
        } else {
          currentAlert.completed = null;
          currentAlert.pending = AlertStatus.PENDING;
        }
      }
    } else if ((alert as Alert).colorCode) {
      // Adds alert into the list if it is type Alert
      riskAlerts.push(alert as Alert);
    }
  } else if (riskLevel && (alert as Alert).colorCode) {
    // Alert is not found: add alert into list according to risk level.
    localAlerts = {
      [RiskLevel.HIGH]: [],
      [RiskLevel.MEDIUM]: [],
      [RiskLevel.LOW]: [],
      [RiskLevel.UNASSIGNED]: []
    };
    localAlerts[riskLevel] = [alert as Alert];
  }

  // Saves updated local alerts
  if (localAlerts) {
    await Storage.setAlerts(localAlerts);
  }

  // 2. Updates local alert infos
  let localAlertInfos = await Storage.getAlertInfos();
  // Gets patientId of current alert
  let patientId: string | undefined;
  if ((alert as AlertInfo).patientId) {
    patientId = (alert as AlertInfo).patientId;
  } else if ((alert as Alert).patientID) {
    patientId = (alert as Alert).patientID;
  }

  if (localAlertInfos && patientId) {
    const patientAlerts = localAlertInfos[patientId];
    // Updates local alert info if exists, otherwise add into the list
    if (patientAlerts) {
      const existIndex = patientAlerts.findIndex((a) => a.id === alert.id);
      if (existIndex >= 0) {
        if ((alert as Alert).patientID) {
          // Input is of type Alert
          patientAlerts[existIndex].completed =
            (alert as Alert).completed === AlertStatus.COMPLETED;
        } else if ((alert as AlertInfo).patientId) {
          // Input is of type AlertInfo
          patientAlerts[existIndex] = alert as AlertInfo;
        }
      } else if ((alert as AlertInfo).patientId) {
        // Adds into the list if it is type AlertInfo
        patientAlerts.push(alert as AlertInfo);
      }
    }
  } else if (patientId && (alert as AlertInfo).patientId) {
    // Alert info is not found: add alert info into list according to patientId.
    localAlertInfos = {};
    localAlertInfos[patientId] = [alert as AlertInfo];
  }

  if (localAlertInfos) {
    await Storage.setAlertInfos(localAlertInfos);
  }
};

/**
 * Inserts input Todo into local storage if it does not exist, otherwise update it.
 * @param input
 */
export const updateLocalTodos = async (input: LocalTodo): Promise<void> => {
  let localTodos = await Storage.getTodos();
  if (localTodos) {
    // For update Todo operation
    if (input.id) {
      const existIndex = localTodos.findIndex((t) => t.id === input.id);
      // Todo exists
      if (existIndex >= 0) {
        localTodos[existIndex] = input;
      } else {
        // Todo does not exist
        localTodos.push(input);
      }
    } else if (input.alertId) {
      // When attempts to create an existing Todo offline
      const existIndex = localTodos.findIndex(
        (t) => t.alertId === input.alertId
      );
      // Existing Todo
      if (existIndex >= 0) {
        const currentTodo = localTodos[existIndex];
        if (currentTodo.id) {
          input.id = currentTodo.id;
          input._version = currentTodo._version;
        }
        input.lastModified = input.createdAt;
        input.createdAt = currentTodo.createdAt;
        localTodos[existIndex] = input;
      } else {
        localTodos.push(input);
      }
    } else {
      localTodos.push(input);
    }
  } else {
    localTodos = [input];
  }

  // Saves updated local Todos
  if (localTodos) {
    await Storage.setTodos(localTodos);
  }
};

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
