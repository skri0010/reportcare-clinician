import { TodoListName, TodoListTabParamList } from "web/navigation";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { TodoScreenNavigation } from "./MainScreenProps";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";

// Navigation and route for todo list tabs

export type CurrentTabProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<TodoListTabParamList, TodoListName.CURRENT>,
    TodoScreenNavigation
  >;
  route: RouteProp<TodoListTabParamList, TodoListName.CURRENT>;
};

export type CompletedTabProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<TodoListTabParamList, TodoListName.COMPLETED>,
    TodoScreenNavigation
  >;
  route: RouteProp<TodoListTabParamList, TodoListName.COMPLETED>;
};
