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
import {
  listCompletedTodosByLastModifiedDate,
  listPendingTodosByLastModifiedDate,
  getDetailedAlert
} from "aws";
import { ModelSortDirection, Todo } from "aws/API";
import {
  FetchTodosMode,
  LocalTodo,
  mapColorCodeToRiskLevel,
  TodoStatus
} from "rc_agents/model";
import {
  setCompletedTodos,
  setFetchingTodos,
  setPendingTodos
} from "ic-redux/actions/agents/todoActionCreator";

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
      // Gets clinicianId from global state
      const clinicianId = store.getState().clinicians.clinician?.clinicianID;

      // Get retrieve todos mode
      const fetchMode: FetchTodosMode =
        facts[BeliefKeys.CLINICIAN]?.[ClinicianAttributes.TODO_STATUS];

      if (fetchMode && clinicianId) {
        if (facts[BeliefKeys.APP]?.[AppAttributes.ONLINE]) {
          // Device is online
          let todos: Todo[] | undefined;
          let pendingTodos: Todo[] | undefined;
          let completedTodos: Todo[] | undefined;

          // Fetch pending todos
          if (
            fetchMode === FetchTodosMode.ALL ||
            fetchMode === FetchTodosMode.PENDING
          ) {
            const query = await listPendingTodosByLastModifiedDate({
              pending: TodoStatus.PENDING,
              sortDirection: ModelSortDirection.DESC
            });
            if (query.data?.listPendingTodosByLastModifiedDate?.items) {
              const result =
                query.data.listPendingTodosByLastModifiedDate.items;
              if (result && result.length > 0) {
                pendingTodos = result as Todo[];
              }
            }
          }

          // Fetch completed todos
          if (
            fetchMode === FetchTodosMode.ALL ||
            fetchMode === FetchTodosMode.COMPLETED
          ) {
            const query = await listCompletedTodosByLastModifiedDate({
              completed: TodoStatus.COMPLETED,
              sortDirection: ModelSortDirection.DESC
            });
            if (query.data?.listCompletedTodosByLastModifiedDate?.items) {
              const result =
                query.data.listCompletedTodosByLastModifiedDate.items;
              if (result && result.length > 0) {
                completedTodos = result as Todo[];
              }
            }
          }

          pendingTodos = pendingTodos || [];
          completedTodos = completedTodos || [];
          // Join the pending and completed todos together
          // eslint-disable-next-line prefer-const
          todos = pendingTodos.concat(completedTodos);

          if (todos) {
            // Find alert associated to each todo
            const todosToDispatch: LocalTodo[] = [];
            const currentLocalTodos: LocalTodo[] | null =
              await LocalStorage.getTodos();

            /**
             * If there are todos in the local storage:
             * Get the risk level colour, patient ID and alert ID from the local todo
             */
            if (currentLocalTodos && currentLocalTodos.length > 0) {
              todos.forEach((todo) => {
                // Construct LocalTodo
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

                // If an alert is associated with the Todo, get alert's information from local Todo for the same alert
                if (todo.alertID) {
                  const todoSameAlertID = currentLocalTodos.find(
                    (t) => t.alertId === todo.alertID
                  );
                  if (todoSameAlertID && todo) {
                    currentTodo.alertId = todoSameAlertID.alertId;
                    currentTodo.patientId = todoSameAlertID.patientId;
                    currentTodo.riskLevel = todoSameAlertID.riskLevel;
                  }
                }

                // Add Todo to the list for dispatching
                todosToDispatch.push(currentTodo);
              });
            } else {
              /**
               * If there are no local todos:
               * Get risk level colour, patient ID and alertID from DB
               * */
              const alertForTodo = await Promise.all(
                todos.map(async (todo) => {
                  if (todo.alertID) {
                    const query = getDetailedAlert({
                      id: todo.alertID
                    });
                    return query;
                  }
                  return null;
                })
              );

              todos.forEach((todo) => {
                // Create Local Todo to be dispatched
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

                if (todo.alertID) {
                  const alert = alertForTodo.find(
                    (a) =>
                      a &&
                      a.data.getAlert &&
                      a.data.getAlert.id === todo.alertID
                  );
                  if (alert && alert.data.getAlert) {
                    const result = alert.data.getAlert;
                    currentTodo.alertId = result.id;
                    currentTodo.patientId = result.patientID;
                    currentTodo.riskLevel = mapColorCodeToRiskLevel(
                      result.colorCode
                    );
                  }
                }
                todosToDispatch.push(currentTodo);
              });
            }

            // If the alert info for all todo is fetched
            if (todosToDispatch.length === todos.length) {
              // Save mapped Todos to local storage
              await LocalStorage.setMultipleTodos(todosToDispatch);
            }

            // Get all the pending todos to be dispatched to frontend
            const pendingTodosToDispatch: LocalTodo[] = todosToDispatch.filter(
              (todo) => !todo.completed
            );

            // Get all the completed todos to be dispatched to frontend
            const completedTodosToDispatch: LocalTodo[] =
              todosToDispatch.filter((todo) => todo.completed);

            // Dispatch todos to frontend for display
            if (fetchMode === FetchTodosMode.PENDING) {
              store.dispatch(setPendingTodos(pendingTodosToDispatch));
            } else if (fetchMode === FetchTodosMode.COMPLETED) {
              store.dispatch(setCompletedTodos(completedTodosToDispatch));
            } else if (fetchMode === FetchTodosMode.ALL) {
              store.dispatch(setPendingTodos(pendingTodosToDispatch));
              store.dispatch(setCompletedTodos(completedTodosToDispatch));
            }
          }
        } else {
          // Device is offline, get todos from local storage
          if (
            fetchMode === FetchTodosMode.ALL ||
            fetchMode === FetchTodosMode.PENDING
          ) {
            const pendingTodosToDispatch = await LocalStorage.getPendingTodos();
            if (pendingTodosToDispatch) {
              store.dispatch(
                setPendingTodos(
                  sortTodosByLastModifiedDate(pendingTodosToDispatch)
                )
              );
            }
          }
          if (
            fetchMode === FetchTodosMode.ALL ||
            fetchMode === FetchTodosMode.COMPLETED
          ) {
            const completedTodosToDispatch =
              await LocalStorage.getCompletedTodos();
            if (completedTodosToDispatch) {
              store.dispatch(
                setCompletedTodos(
                  sortTodosByLastModifiedDate(completedTodosToDispatch)
                )
              );
            }
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
      ),
      true,
      true
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

// Preconditions
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

// Actionframe
export const af_RetrieveTodos = new Actionframe(
  `AF_${ActionFrameIDs.DTA.RETRIEVE_TODOS}`,
  [rule1, rule2],
  new RetrieveTodos()
);
