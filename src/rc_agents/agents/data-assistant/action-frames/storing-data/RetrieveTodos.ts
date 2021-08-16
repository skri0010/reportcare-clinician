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
import {
  setPendingTodos,
  setCompletedTodos,
  setFetchingTodos
} from "ic-redux/actions/agents/actionCreator";
import {
  listCompletedTodosByLastModifiedDate,
  listPendingTodosByLastModifiedDate
} from "aws";
import { ModelSortDirection, Todo } from "aws/API";
import { LocalTodo, TodoStatus } from "rc_agents/model";
import { mapColorCodeToRiskLevel } from "../triage-alert-hf-clinic/RetrievePendingAlertCount";

/**
 * Class to represent an activity for creating an entry to clinician's Todo table.
 * This happens in Procedure Storing Data (SRD-II) when a clinician creates a new Todo.
 */
class RetrieveTodos extends Activity {
  constructor() {
    super(ActionFrameIDs.DTA.RETRIEVE_TODOS);
  }

  /**
   * Perform this activity
   * @param {Agent} agent - context of the agent
   */
  async doActivity(agent: Agent): Promise<void> {
    await super.doActivity(agent, [rule2]);

    store.dispatch(setFetchingTodos(true));

    const facts = agentAPI.getFacts();

    try {
      // Gets locally stored clinicianId
      const clinicianId = await Storage.getClinicianID();

      // Gets TodoStatus from facts
      const todoStatus: TodoStatus =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.TODO_STATUS];

      if (todoStatus && clinicianId) {
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          let todos: Todo[] | undefined;
          if (todoStatus === TodoStatus.PENDING) {
            const query = await listPendingTodosByLastModifiedDate({
              pending: TodoStatus.PENDING,
              sortDirection: ModelSortDirection.DESC
            });
            if (query.data?.listPendingTodosByLastModifiedDate?.items) {
              const result =
                query.data.listPendingTodosByLastModifiedDate.items;
              if (result && result.length > 0) {
                todos = result as Todo[];
              }
            }
          } else if (todoStatus === TodoStatus.COMPLETED) {
            const query = await listCompletedTodosByLastModifiedDate({
              completed: TodoStatus.COMPLETED,
              sortDirection: ModelSortDirection.DESC
            });
            if (query.data?.listCompletedTodosByLastModifiedDate?.items) {
              const result =
                query.data.listCompletedTodosByLastModifiedDate.items;
              if (result && result.length > 0) {
                todos = result as Todo[];
              }
            }
          }
          if (todos) {
            const todosToDispatch: LocalTodo[] = [];
            await Promise.all(
              todos.map((todo) => {
                const currentTodo: LocalTodo = {
                  id: todo.id,
                  title: todo.title,
                  patientName: todo.patientName,
                  notes: todo.notes,
                  completed: todo.completed === TodoStatus.COMPLETED,
                  createdAt: todo.createdAt,
                  lastModified: todo.lastModified,
                  toSync: false,
                  _version: todo._version
                };
                if (todo.alert) {
                  currentTodo.alertId = todo.alert.id;
                  currentTodo.patientId = todo.alert.patientID;
                  currentTodo.riskLevel = mapColorCodeToRiskLevel(
                    todo.alert.colorCode
                  );
                }
                todosToDispatch.push(currentTodo);
                return todo;
              })
            );
            await Storage.setMultipleTodos(todosToDispatch);
            if (todoStatus === TodoStatus.PENDING) {
              store.dispatch(setPendingTodos(todosToDispatch));
            } else {
              store.dispatch(setCompletedTodos(todosToDispatch));
            }
          }
        } else if (todoStatus === TodoStatus.PENDING) {
          const todosToDispatch = await Storage.getPendingTodos();
          if (todosToDispatch) {
            store.dispatch(
              setPendingTodos(sortTodosByLastModifiedDate(todosToDispatch))
            );
          }
        } else if (todoStatus === TodoStatus.COMPLETED) {
          const todosToDispatch = await Storage.getCompletedTodos();
          if (todosToDispatch) {
            store.dispatch(
              setCompletedTodos(sortTodosByLastModifiedDate(todosToDispatch))
            );
          }
        }

        // Removes TodoStatus from facts
        agentAPI.addFact(
          new Belief(
            BeliefKeys.CLINICIAN,
            ClinicianAttributes.TODO_STATUS,
            null
          ),
          false
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }

    // Stops the procedure
    agentAPI.addFact(
      new Belief(
        BeliefKeys.PROCEDURE,
        ProcedureAttributes.SRD_II,
        ProcedureConst.INACTIVE
      )
    );

    // Dispatch to front end that procedure has been completed
    store.dispatch(setFetchingTodos(false));
  }
}

const sortTodosByLastModifiedDate = (todos: LocalTodo[]): LocalTodo[] => {
  return todos.sort((a, b) => {
    const date1 = new Date(a.lastModified ? a.lastModified : a.createdAt);
    const date2 = new Date(b.lastModified ? b.lastModified : b.createdAt);
    return date2.getTime() - date1.getTime();
  });
};

// Preconditions for activating the RetrieveTodos class
const rule1 = new Precondition(
  BeliefKeys.PROCEDURE,
  ProcedureAttributes.SRD_II,
  ProcedureConst.ACTIVE
);
const rule2 = new ResettablePrecondition(
  BeliefKeys.CLINICIAN,
  ClinicianAttributes.RETRIEVE_TODOS,
  true
);

// Action Frame for RetrieveTodos class
const af_RetrieveTodos = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_TODOS}`,
  [rule1, rule2],
  new RetrieveTodos()
);

export default af_RetrieveTodos;
