import { actionNames } from "ic-redux/actions/actionNames";
import { RootAction } from "ic-redux/actions/RootAction";
import { Reducer } from "redux";
import { LocalTodo } from "rc_agents/model";

interface TodoState {
  // todo
  pendingTodos: LocalTodo[] | undefined;
  completedTodos: LocalTodo[] | undefined;
  updatedTodo: LocalTodo | undefined;
  todoDetails: LocalTodo | undefined;
  fetchingTodos: boolean;
  fetchingTodoDetails: boolean;
  submittingTodo: boolean;
  updatingTodo: boolean;
}

const initialState: TodoState = {
  pendingTodos: undefined,
  completedTodos: undefined,
  updatedTodo: undefined,
  todoDetails: undefined,
  fetchingTodos: false,
  fetchingTodoDetails: false,
  submittingTodo: false,
  updatingTodo: false
};

export const todoReducer: Reducer<TodoState, RootAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case actionNames.SET_PENDING_TODOS:
      return { ...state, pendingTodos: action.payload.pendingTodos };
    case actionNames.SET_COMPLETED_TODOS:
      return { ...state, completedTodos: action.payload.completedTodos };
    case actionNames.SET_UPDATED_TODO:
      return { ...state, updatedTodo: action.payload.updatedTodo };
    case actionNames.SET_TODO_DETAILS:
      return { ...state, todoDetails: action.payload.todoDetails };
    case actionNames.SET_FETCHING_TODOS:
      return {
        ...state,
        fetchingTodos: action.payload.fetchingTodos
      };
    case actionNames.SET_SUBMITTING_TODO:
      return { ...state, submittingTodo: action.payload.submittingTodo };
    case actionNames.SET_UPDATING_TODO_OF_ALERT:
      return {
        ...state,
        updatingTodo: action.payload.updatingTodo
      };
    default:
      return state;
  }
};
