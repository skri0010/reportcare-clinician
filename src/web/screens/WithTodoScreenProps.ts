import {
  TodoDetailsParamList,
  TodoDetailsName,
  TodoListName,
  TodoListParamList
} from "web/screens";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { TodoNavigationProps } from "./MainScreenProps";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";

// Todos
export type WithTodosProps = {
  [TodoListName.CURRENT]: CurrentTodoListProps;
  [TodoListName.COMPLETED]: CompletedTodoListProps;
};

// Todo details
export type WithTodoDetailsProps = {
  [TodoDetailsName.VIEW_TODO]: ViewTodoScreenProps;
  [TodoDetailsName.EDIT_TODO]: EditTodoScreenProps;
};

// Current todo list
type CurrentTodoListNavigationProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TodoListParamList, TodoListName.CURRENT>,
  TodoNavigationProps
>;

type CurrentTodoListProps = {
  navigation: CurrentTodoListNavigationProps;
  route: RouteProp<TodoListParamList, TodoListName.CURRENT>;
};

// Completed todo list
type CompletedTodoListNavigationProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TodoListParamList, TodoListName.COMPLETED>,
  TodoNavigationProps
>;

type CompletedTodoListProps = {
  navigation: CompletedTodoListNavigationProps;
  route: RouteProp<TodoListParamList, TodoListName.COMPLETED>;
};

// Todo details (view)
type ViewTodoNavigationProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TodoDetailsParamList, TodoDetailsName.VIEW_TODO>,
  TodoNavigationProps
>;

type ViewTodoScreenProps = {
  navigation: ViewTodoNavigationProps;
  route: RouteProp<TodoDetailsParamList, TodoDetailsName.VIEW_TODO>;
};

// Todo details (edit)

type EditTodoNavigationProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TodoDetailsParamList, TodoDetailsName.EDIT_TODO>,
  TodoNavigationProps
>;

type EditTodoScreenProps = {
  navigation: EditTodoNavigationProps;
  route: RouteProp<TodoDetailsParamList, TodoDetailsName.EDIT_TODO>;
};
