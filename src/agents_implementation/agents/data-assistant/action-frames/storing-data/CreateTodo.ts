import Actionframe from "../../../../agent_framework/base/Actionframe";
import Activity from "../../../../agent_framework/base/Activity";
import Agent from "../../../../agent_framework/base/Agent";
import Belief from "../../../../agent_framework/base/Belief";
import Precondition from "../../../../agent_framework/base/Precondition";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ProcedureConst,
  AsyncStorageKeys,
  CommonAttributes,
  BeliefKeys,
  ProcedureAttributes,
  AppAttributes,
  ActionFrameIDs,
  ClinicianAttributes
} from "../../../../agent_framework/AgentEnums";
import agentAPI from "../../../../agent_framework/AgentAPI";
import { store } from "ic-redux/store";
import {
  setNewTodo,
  setProcedureSuccessful
} from "ic-redux/actions/agents/actionCreator";
import agentNWA from "agents_implementation/agents/network-assistant/NWA";
import { createTodo, getAlert, updateAlert } from "aws";
import {
  AlertInfo,
  NewTodoInput,
  Todo
} from "agents_implementation/agent_framework/model";
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
    await super.doActivity(agent);

    // Update Beliefs
    agent.addBelief(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.NEW_TODO, false)
    );
    agent.addBelief(
      new Belief(agent.getID(), CommonAttributes.LAST_ACTIVITY, this.getID())
    );

    try {
      // Gets Todo details to be added
      const newTodo: NewTodoInput =
        agentAPI.getFacts()[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.TODO];

      // Gets locally stored clinicianId
      const clinicianId = await AsyncStorage.getItem(
        AsyncStorageKeys.CLINICIAN_ID
      );

      if (newTodo && clinicianId) {
        let todoId: string | undefined;
        let pendingSync: boolean | undefined;

        const todoToInsert: CreateTodoInput = {
          clinicianID: clinicianId,
          title: newTodo.title,
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
                  completed: true,
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
            notes: todoToInsert.notes,
            completed: todoToInsert.completed,
            createdAt: todoToInsert.lastModified,
            pendingSync: pendingSync
          };

          if (newTodo.alert) {
            todoToStore.alertId = newTodo.alert.id;
            todoToStore.patientId = newTodo.alert.patientId;

            // Saves updated alert locally with patientId as nested key
            // Gets all alerts
            const alertsStr = await AsyncStorage.getItem(
              AsyncStorageKeys.ALERTS
            );
            if (alertsStr) {
              const alerts = JSON.parse(alertsStr);

              // Gets alerts specific to current patient
              const patientAlertsStr = alerts[newTodo.alert.patientId];
              if (patientAlertsStr) {
                const patientAlerts: AlertInfo[] = JSON.parse(patientAlertsStr);
                patientAlerts.forEach((alert) => {
                  if (alert.id === newTodo.alert!.id) {
                    alert.completed = true;
                  }
                });
                alerts[newTodo.alert.patientId] = JSON.stringify(patientAlerts);

                await AsyncStorage.setItem(
                  AsyncStorageKeys.ALERTS,
                  JSON.stringify(alerts)
                );
              }
            }
          }

          if (!pendingSync) {
            todoToStore.id = todoId;
          }

          const localTodosStr = await AsyncStorage.getItem(
            AsyncStorageKeys.TODOS
          );
          // Other Todos exist
          if (localTodosStr) {
            const localTodos: Todo[] = JSON.parse(localTodosStr);
            localTodos.push(todoToStore);
            await AsyncStorage.setItem(
              AsyncStorageKeys.TODOS,
              JSON.stringify(localTodos)
            );
          }
          // Current Todo is the first to be stored
          else {
            await AsyncStorage.setItem(
              AsyncStorageKeys.TODOS,
              JSON.stringify([todoToStore])
            );
          }

          // Notifies NWA if the Todo to be stored has pendingSync set to true
          if (pendingSync) {
            // Notifies NWA
            agentNWA.addBelief(
              new Belief(
                BeliefKeys.APP,
                AppAttributes.PENDING_TODO_INSERT_SYNC,
                true
              )
            );
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
const rule2 = new Precondition(
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
