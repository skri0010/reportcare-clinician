import { LocalTodo } from "rc_agents/model";
import { actionNames } from "ic-redux/actions/actionNames";
import { createAction } from "typesafe-actions";

export const setPendingTodos = createAction(
  actionNames.SET_PENDING_TODOS,
  (pendingTodos: LocalTodo[]) => ({
    pendingTodos: pendingTodos
  })
)();

export const setCompletedTodos = createAction(
  actionNames.SET_COMPLETED_TODOS,
  (completedTodos: LocalTodo[]) => ({
    completedTodos: completedTodos
  })
)();

export const setUpdatedTodo = createAction(
  actionNames.SET_UPDATED_TODO,
  (updatedTodo: LocalTodo | undefined) => ({
    updatedTodo: updatedTodo
  })
)();

export const setTodoDetails = createAction(
  actionNames.SET_TODO_DETAILS,
  (todoDetails: LocalTodo) => ({
    todoDetails: todoDetails
  })
)();

export const setFetchingTodos = createAction(
  actionNames.SET_FETCHING_TODOS,
  (fetchingTodos: boolean) => ({
    fetchingTodos: fetchingTodos
  })
)();

export const setSubmittingTodo = createAction(
  actionNames.SET_SUBMITTING_TODO,
  (submittingTodo: boolean) => ({
    submittingTodo: submittingTodo
  })
)();

export const setFetchingTodoDetails = createAction(
  actionNames.SET_FETCHING_TODO_DETAILS,
  (fetchingTodoDetails: boolean) => ({
    fetchingTodoDetails: fetchingTodoDetails
  })
)();

export const setUpdatingTodoOfAlert = createAction(
  actionNames.SET_UPDATING_TODO_OF_ALERT,
  (updatingTodo: boolean) => ({
    updatingTodo: updatingTodo
  })
)();
