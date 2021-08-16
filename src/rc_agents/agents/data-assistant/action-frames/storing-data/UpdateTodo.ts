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
import { getTodo, updateTodo } from "aws";
import { LocalTodo, TodoStatus, TodoUpdateInput } from "rc_agents/model";
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
      const todoInput: TodoUpdateInput =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.TODO];

      const isOnline: boolean = facts[BeliefKeys.APP]?.[AppAttributes.ONLINE];

      // Gets locally stored clinicianId
      const clinicianId = await Storage.getClinicianID();

      if (todoInput && !todoInput.id) {
        // Todo was created offline and not synced: Triggers CreateTodo
        agent.addBelief(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.CREATE_TODO,
            true
          )
        );
      } else if (todoInput && todoInput.id && clinicianId) {
        let toSync: boolean | undefined;
        let todoVersion: number | undefined;

        // Constructs UpdateTodoInput to be updated
        const todoToUpdate: UpdateTodoInput = {
          id: todoInput.id,
          title: todoInput.title,
          patientName: todoInput.patientName,
          notes: todoInput.notes,
          completed: todoInput.completed ? TodoStatus.COMPLETED : null,
          pending: todoInput.completed ? null : TodoStatus.PENDING,
          lastModified: new Date().toISOString(),
          owner: clinicianId,
          _version: todoInput._version
        };

        // Device is online
        if (isOnline) {
          // Gets latest version of current Todo
          const query = await getTodo({ id: todoInput.id! });
          if (query.data?.getTodo) {
            const latestTodo = query.data.getTodo;
            /**
             * Conflict resolution when latest Todo in database has higher version:
             * Local Todo will not be updated to the cloud and will be replaced by the latest one
             */
            if (
              latestTodo?._version &&
              latestTodo._version > todoInput._version
            ) {
              await Storage.mergeTodoConflict(latestTodo);
            } else {
              // Updates Todo
              const updateQuery = await updateTodo(todoToUpdate);

              // Saves Todo locally
              if (updateQuery.data.updateTodo) {
                // Updates to indicate that Todo is successfully updated
                toSync = false;
                todoVersion = updateQuery.data.updateTodo._version;
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
            id: todoInput.id,
            title: todoInput.title,
            patientName: todoInput.patientName,
            notes: todoInput.notes,
            completed: todoInput.completed,
            createdAt: todoInput.createdAt,
            lastModified: todoToUpdate.lastModified!,
            toSync: toSync,
            _version: todoVersion || todoInput._version
          };

          // Updates Todo in local storage
          await Storage.mergeTodo(todoToStore);

          // Notifies NWA if the Todo to be stored has toSync set to true
          if (toSync) {
            // Notifies NWA
            agentNWA.addBelief(
              new Belief(BeliefKeys.APP, AppAttributes.SYNC_TODOS_UPDATE, true)
            );
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
      // Dispatch to front end to indicate that procedure is successful
      store.dispatch(setProcedureSuccessful(false));
    }

    agent.addBelief(
      new Belief(BeliefKeys.CLINICIAN, ClinicianAttributes.TODOS_UPDATED, true)
    );
  }
}

// Preconditions
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD_II,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.UPDATE_TODO,
  true
);

// Actionframe
const af_UpdateTodo = new Actionframe(
  `AF_${ActionFrameIDs.DTA.UPDATE_TODO}`,
  [rule1, rule2],
  new UpdateTodo()
);

export default af_UpdateTodo;
