import { TodoStackParamList } from "web/screens";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

// View Todo screen
type TodoScreenNavigationProp = StackNavigationProp<
  TodoStackParamList,
  "ViewTodo"
>;
type TodoScreenRouteProp = RouteProp<TodoStackParamList, "ViewTodo">;

export type TodoScreenProps = {
  route: TodoScreenRouteProp;
  navigation: TodoScreenNavigationProp;
};

// Edit Todo screen
type EditTodoScreenNavigationProp = StackNavigationProp<
  TodoStackParamList,
  "EditTodo"
>;
type EditTodoScreenRouteProp = RouteProp<TodoStackParamList, "EditTodo">;

export type EditTodoScreenProps = {
  route: EditTodoScreenRouteProp;
  navigation: EditTodoScreenNavigationProp;
};

// Add Todo scree
type AddTodoScreenNavigationProp = StackNavigationProp<
  TodoStackParamList,
  "AddTodo"
>;
type AddTodoScreenRouteProp = RouteProp<TodoStackParamList, "AddTodo">;

export type AddTodoScreenProps = {
  route: AddTodoScreenRouteProp;
  navigation: AddTodoScreenNavigationProp;
};
