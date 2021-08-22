import { TodoDetailsName, TodoDetailsStackParamList } from "web/navigation";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { TodoScreenNavigation } from "./MainScreenProps";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";

// Navigation and route for todo details stack

export type TodoDetailsScreenProps = {
  [TodoDetailsName.VIEW_TODO]: ViewTodoScreenProps;
  [TodoDetailsName.EDIT_TODO]: EditTodoScreenProps;
};

export type ViewTodoScreenProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      TodoDetailsStackParamList,
      TodoDetailsName.VIEW_TODO
    >,
    TodoScreenNavigation
  >;
  route: RouteProp<TodoDetailsStackParamList, TodoDetailsName.VIEW_TODO>;
};

export type EditTodoScreenProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      TodoDetailsStackParamList,
      TodoDetailsName.EDIT_TODO
    >,
    TodoScreenNavigation
  >;
  route: RouteProp<TodoDetailsStackParamList, TodoDetailsName.EDIT_TODO>;
};
