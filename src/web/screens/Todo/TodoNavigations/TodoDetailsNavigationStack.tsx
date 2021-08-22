import React, { FC } from "react";
import { TodoDetailsScreen } from "./TodoDetailsScreen";
import { EditTodoScreen } from "../EditTodoScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { MarkAsDoneButton } from "../MarkAsDoneButton";
import { TodoDetailsName, TodoDetailsParamList } from "web/screens";
import { LocalTodo } from "rc_agents/model";
import i18n from "util/language/i18n";
import { ms } from "react-native-size-matters";
import { TodoNavigationProps } from "web/screens/WithSideTabsProps";
import { onDonePress } from "../TodoCurrentTab";
import { onUndoPress } from "../TodoCompletedTab";

const Stack = createStackNavigator<TodoDetailsParamList>();

interface TodoDetailsNavigationStackProps {
  todo: LocalTodo;
  navigation: TodoNavigationProps;
}

export const TodoDetailsNavigationStack: FC<TodoDetailsNavigationStackProps> =
  ({ todo, navigation }) => {
    const onButtonPress = () => {
      if (todo.completed) {
        onUndoPress(todo);
      } else {
        onDonePress(todo);
      }
    };

    return (
      <Stack.Navigator>
        {/* VIEW TODO */}
        <Stack.Screen
          name={TodoDetailsName.VIEW_TODO}
          component={TodoDetailsScreen}
          initialParams={{ todo: todo, parentNavigation: navigation }}
          options={() => ({
            title: i18n.t("Todo.ViewTodo"),
            headerStyle: {
              height: ms(45)
            },
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: ms(20),
              paddingLeft: ms(15),
              minWidth: ms(250)
            },
            headerRight: () => (
              // Mark as done button
              <MarkAsDoneButton onPress={onButtonPress} todo={todo} />
            )
          })}
        />
        {/* EDIT TODO */}
        <Stack.Screen
          name={TodoDetailsName.EDIT_TODO}
          component={EditTodoScreen}
          initialParams={{ todo: todo }}
          options={{
            title: i18n.t("Todo.EditTodo"),
            headerStyle: {
              height: ms(45)
            },
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: ms(20)
            }
          }}
        />
      </Stack.Navigator>
    );
  };
