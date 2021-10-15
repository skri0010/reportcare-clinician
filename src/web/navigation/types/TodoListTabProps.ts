import { TodoListTabName, TodoListTabParamList } from "web/navigation";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { TodoScreenNavigation } from "./MainScreenProps";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { LocalTodo } from "rc_agents/model";

// Navigation and route for todo list tabs

export type CurrentTabProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<TodoListTabParamList, TodoListTabName.CURRENT>,
    TodoScreenNavigation
  >;
  route: RouteProp<TodoListTabParamList, TodoListTabName.CURRENT>;
  currentTodos?: LocalTodo[];
};

export type CompletedTabProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      TodoListTabParamList,
      TodoListTabName.COMPLETED
    >,
    TodoScreenNavigation
  >;
  route: RouteProp<TodoListTabParamList, TodoListTabName.COMPLETED>;
  completedTodos?: LocalTodo[];
};
