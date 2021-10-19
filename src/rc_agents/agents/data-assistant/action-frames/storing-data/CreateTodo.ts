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
import { agentNWA } from "rc_agents/agents";
import { createTodo } from "aws";
import {
  AlertInfo,
  AlertStatus,
  LocalTodo,
  TodoStatus,
  HighRiskAlertInfo
} from "rc_agents/model";
import { CreateTodoInput } from "aws/API";
import { setProcedureSuccessful } from "ic-redux/actions/agents/procedureActionCreator";

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
      const todoInput: LocalTodo =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.TODO];

      // Retrieves clinician from global state
      const clinicianId = store.getState().clinicians.clinician?.clinicianID;

      if (todoInput && clinicianId) {
        let toSync: boolean | undefined;

        // Constructs CreateTodoInput to be inserted
        const todoToInsert: CreateTodoInput = {
          clinicianID: clinicianId,
          title: todoInput.title,
          patientName: todoInput.patientName,
          notes: todoInput.notes,
          createdAt: todoInput.createdAt,
          lastModified: todoInput.lastModified,
          owner: clinicianId
        };

        // Updates Todo's status
        if (todoInput.completed) {
          todoToInsert.completed = TodoStatus.COMPLETED;
        } else {
          todoToInsert.pending = TodoStatus.PENDING;
        }

        // Triggers associated Alert to be updated from pending to completed
        if (todoInput.alertId) {
          let alertToUpdate: AlertInfo | HighRiskAlertInfo | undefined | null;

          // Create Todo for the first time
          if (todoInput.alert) {
            alertToUpdate = todoInput.alert;
            // Removes alert to prevent it from being stored into local storage later on
            delete todoInput.alert;
          }

          /**
           * Update alert status from pending to completed when:
           * 1. (Offline/Online) Todo is created
           * 2. (Offline) Todo created offline is updated
           */
          if (alertToUpdate) {
            todoToInsert.alertID = alertToUpdate.id;
            alertToUpdate.completed = AlertStatus.COMPLETED;

            // Adds AlertInfo to facts to be updated
            agentAPI.addFact(
              new Belief(
                BeliefKeys.CLINICIAN,
                ClinicianAttributes.ALERT_INFO,
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
                ProcedureAttributes.P_USOR_II,
                ProcedureConst.ACTIVE
              )
            );
          }
        }

        /**
         * Device is online:
         * 1. Create and insert a new todo
         * 2. If Todo is successfully inserted, set toSync to false, otherwise set to true.
         */
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Inserts Todo
          const createResponse = await createTodo(todoToInsert);
          if (createResponse.data.createTodo) {
            // Gets newly inserted Todo to update local Todo id
            const insertedTodo = createResponse.data.createTodo;
            todoInput.id = insertedTodo.id;

            // Updates to indicate that Todo is successfully inserted
            toSync = false;
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
          await LocalStorage.setTodo(todoToStore);

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

        // Dispatch to UXSA to display todos
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
