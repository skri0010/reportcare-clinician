import {
  TodoDetailsStackScreenName,
  TodoDetailsStackParamList
} from "web/navigation";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { TodoScreenNavigation } from "./MainScreenProps";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";

// Navigation and route for todo details stack

export type TodoDetailsScreenProps = {
  [TodoDetailsStackScreenName.VIEW_TODO]: ViewTodoProps;
  [TodoDetailsStackScreenName.EDIT_TODO]: EditTodoProps;
};

export type ViewTodoProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      TodoDetailsStackParamList,
      TodoDetailsStackScreenName.VIEW_TODO
    >,
    TodoScreenNavigation
  >;
  route: RouteProp<
    TodoDetailsStackParamList,
    TodoDetailsStackScreenName.VIEW_TODO
  >;
};

export type EditTodoProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      TodoDetailsStackParamList,
      TodoDetailsStackScreenName.EDIT_TODO
    >,
    TodoScreenNavigation
  >;
  route: RouteProp<
    TodoDetailsStackParamList,
    TodoDetailsStackScreenName.EDIT_TODO
  >;
};
