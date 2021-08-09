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
  setProcedureSuccessful
} from "ic-redux/actions/agents/actionCreator";
import agentNWA from "rc_agents/agents/network-assistant/NWA";
import { AlertStatus, createTodo, getAlert, updateAlert } from "aws";
import { NewTodoInput, Todo } from "rc_agents/model";
import { CreateTodoInput } from "aws/API";

// LS-TODO: To be tested again after integrating with Alert and Todo front end

/**
 * Class to represent an activity for creating an entry to clinician's Todo table.
 * This happens in Procedure Storing Data (SRD) when a clinician creates a new Todo.
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

    try {
      // Gets Todo details to be added
      const newTodo: NewTodoInput =
        agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.TODO];

      // Gets locally stored clinicianId
      const clinicianId = await Storage.getClinicianID();

      if (newTodo && clinicianId) {
        let todoId: string | undefined;
        let pendingSync: boolean | undefined;

        const todoToInsert: CreateTodoInput = {
          clinicianID: clinicianId,
          title: newTodo.title,
          patientName: newTodo.patientName,
          notes: newTodo.notes,
          lastModified: new Date().toISOString(),
          completed: false,
          owner: clinicianId
        };

        if (newTodo.alert) {
          todoToInsert.alertID = newTodo.alert.id;
        }

        // Device is online
        if (agentAPI.getFacts()[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Inserts into Todo
          const createResponse = await createTodo(todoToInsert);
          if (createResponse.data && createResponse.data.createTodo) {
            const currentTodo = createResponse.data.createTodo;
            todoId = currentTodo.id;

            // Updates alert to completed if any
            if (todoToInsert.alertID) {
              const alertQuery = await getAlert({ id: todoToInsert.alertID });
              if (alertQuery.data && alertQuery.data.getAlert) {
                const latestAlert = alertQuery.data.getAlert;
                const updateResponse = await updateAlert({
                  id: latestAlert?.id,
                  completed: AlertStatus.COMPLETED,
                  pending: null,
                  _version: latestAlert?._version
                });

                // Updates pendingSync to indicate the operation is successful
                if (updateResponse.data && updateResponse.data.updateAlert) {
                  pendingSync = false;
                }
              }
            } else {
              pendingSync = false;
            }
          }
        }
        // Device is offline: Todo object to be stored has null id and pendingSync set to true.
        else {
          pendingSync = true;
        }

        // Saves Todo locally
        if (pendingSync !== undefined) {
          const todoToStore: Todo = {
            title: todoToInsert.title,
            patientName: todoToInsert.patientName,
            notes: todoToInsert.notes,
            completed: todoToInsert.completed,
            createdAt: todoToInsert.lastModified,
            pendingSync: pendingSync
          };

          if (newTodo.alert) {
            todoToStore.alertId = newTodo.alert.id;
            todoToStore.patientId = newTodo.alert.patientId;

            // Updates local alerts
            const localAlerts = await Storage.getAlerts();
            if (localAlerts && newTodo.alert) {
              const riskAlerts = localAlerts[newTodo.alert.riskLevel!];
              if (riskAlerts) {
                const existIndex = riskAlerts.findIndex((a) => a.id === newTodo.alert!.id);
                if (existIndex >= 0) {
                  riskAlerts[existIndex].completed = AlertStatus.COMPLETED;
                }
                await Storage.setAlerts(localAlerts);
              }
            }

            // Updates local alert infos
            const localAlertInfos = await Storage.getAlertInfos();
            if (localAlertInfos && newTodo.alert) {
              const patientAlerts = localAlertInfos[newTodo.alert.patientId];
              if (patientAlerts) {
                const existIndex = patientAlerts.findIndex((a) => a.id === newTodo.alert!.id);
                if (existIndex >= 0) {
                  patientAlerts[existIndex].completed = true;
                }
                await Storage.setAlertInfos(localAlertInfos);
              }
            }
          }

          if (!pendingSync) {
            todoToStore.id = todoId;
          }

          let localTodos = await Storage.getTodos();
          let todoExists = false;
          if (localTodos) {
            // A Todo for the alert already exists: update this Todo instead.
            const existIndex = localTodos.findIndex((t) => t.alertId === todoToStore.alertId);
            if (existIndex >= 0) {
              const existingTodo = localTodos[existIndex];
              // Update id otherwise syncing will treat this as a new Todo
              todoToStore.id = existingTodo.id;
              localTodos[existIndex] = todoToStore;
              todoExists = true;
            } else {
              localTodos.push(todoToStore);
            }
          } else {
            localTodos = [todoToStore];
          }

          if (pendingSync) {
            if (todoExists) {
              // Set pending update to true
              agentNWA.addBelief(
                new Belief(
                  BeliefKeys.APP,
                  AppAttributes.PENDING_TODO_UPDATE_SYNC,
                  true
                )
              );
            } else {
              // Set pending insert to true
              agentNWA.addBelief(
                new Belief(
                  BeliefKeys.APP,
                  AppAttributes.PENDING_TODO_INSERT_SYNC,
                  true
                )
              );
            }
          }

          // Saves Todos locally
          await Storage.setTodos(localTodos);

          // Dispatch new Todo to front end
          store.dispatch(setNewTodo(todoToStore));
        }

        // Dispatch to front end to indicate that procedure is successful
        store.dispatch(setProcedureSuccessful(true));
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
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
        ProcedureAttributes.SRD,
        ProcedureConst.INACTIVE
      ),
      true,
      true
    );
  }
}

// Preconditions for activating the CreateTodo class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.NEW_TODO,
  true
);

// Action Frame for CreateTodo class
const af_CreateTodo = new Actionframe(
  `AF_${ActionFrameIDs.DTA.CREATE_TODO}`,
  [rule1, rule2],
  new CreateTodo()
);

export default af_CreateTodo;
