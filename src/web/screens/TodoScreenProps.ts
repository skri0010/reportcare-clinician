import {
  TodoDetailsParamList,
  TodoDetailsName,
  TodoListName,
  TodoListParamList
} from "web/screens";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { TodoScreenNavigation } from "./MainScreenProps";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";

// Navigation and route for todo screen

export type TodoScreenProps = {
  [TodoListName.CURRENT]: CurrentTodoListProps;
  [TodoListName.COMPLETED]: CompletedTodoListProps;
};

export type TodoDetailsScreenProps = {
  [TodoDetailsName.VIEW_TODO]: ViewTodoScreenProps;
  [TodoDetailsName.EDIT_TODO]: EditTodoScreenProps;
};

type CurrentTodoListProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<TodoListParamList, TodoListName.CURRENT>,
    TodoScreenNavigation
  >;
  route: RouteProp<TodoListParamList, TodoListName.CURRENT>;
};

type CompletedTodoListProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<TodoListParamList, TodoListName.COMPLETED>,
    TodoScreenNavigation
  >;
  route: RouteProp<TodoListParamList, TodoListName.COMPLETED>;
};

type ViewTodoScreenProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      TodoDetailsParamList,
      TodoDetailsName.VIEW_TODO
    >,
    TodoScreenNavigation
  >;
  route: RouteProp<TodoDetailsParamList, TodoDetailsName.VIEW_TODO>;
};

type EditTodoScreenProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      TodoDetailsParamList,
      TodoDetailsName.EDIT_TODO
    >,
    TodoScreenNavigation
  >;
  route: RouteProp<TodoDetailsParamList, TodoDetailsName.EDIT_TODO>;
};
