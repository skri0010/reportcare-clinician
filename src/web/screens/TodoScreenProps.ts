import {
  TodoScreenParamList,
  TodoScreenName,
  TodoLeftTabName,
  TodoLeftTabParamList
} from "web/screens";
import { StackNavigationProp } from "@react-navigation/stack";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { TodoNavigationProps } from "./WithSideTabsProps";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";

// Todo left tab props
export type TodoLeftTabProps = {
  [TodoLeftTabName.CURRENT]: TodoCurrentTabProps;
  [TodoLeftTabName.COMPLETED]: TodoCompletedTabProps;
};

// Todo right screen props
export type TodoScreenProps = {
  [TodoScreenName.VIEWTODO]: ViewTodoScreenProps;
  [TodoScreenName.EDITTODO]: EditTodoScreenProps;
};

// TODO left tab props

type TodoCurrentNavigationProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TodoLeftTabParamList, TodoLeftTabName.CURRENT>,
  TodoNavigationProps
>;

// Todo current tab props
export type TodoCurrentTabProps = {
  navigation: TodoCurrentNavigationProps;
  route: RouteProp<TodoLeftTabParamList, TodoLeftTabName.CURRENT>;
};

type TodoCompletedNavigationProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TodoLeftTabParamList, TodoLeftTabName.COMPLETED>,
  TodoNavigationProps
>;

// Todo completed tab props
export type TodoCompletedTabProps = {
  navigation: TodoCompletedNavigationProps;
  route: RouteProp<TodoLeftTabParamList, TodoLeftTabName.COMPLETED>;
};

//TODO right screen

// View todo screen props
type ViewTodoScreenProps = {
  navigation: StackNavigationProp<TodoScreenParamList, TodoScreenName.VIEWTODO>;
  route: RouteProp<TodoScreenParamList, TodoScreenName.VIEWTODO>;
};

// Edit todo screen props
type EditTodoScreenProps = {
  navigation: StackNavigationProp<TodoScreenParamList, TodoScreenName.EDITTODO>;
  route: RouteProp<TodoScreenParamList, TodoScreenName.EDITTODO>;
};
