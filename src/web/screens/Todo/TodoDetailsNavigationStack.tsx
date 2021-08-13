import React, { FC } from "react";
import { select, RootState } from "util/useRedux";
import { TodoDetailsScreen } from "./TodoDetailsScreen";
import { EditTodoScreen } from "./EditTodoScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { MarkAsDoneButton } from "./MarkAsDoneButton";
import { TodoScreenName, TodoScreenParamList } from "web/screens";
import { Todo } from "aws/API";
import i18n from "util/language/i18n";
import { ms, ScaledSheet } from "react-native-size-matters";

const Stack = createStackNavigator<TodoScreenParamList>();

interface TodoDetailsNavigationStackProps {
  todo: Todo;
}

export const TodoDetailsNavigationStack: FC<TodoDetailsNavigationStackProps> =
  ({ todo }) => {
    return (
      <Stack.Navigator>
        {/* VIEW TODO */}
        <Stack.Screen
          name={TodoScreenName.VIEWTODO}
          component={TodoDetailsScreen}
          initialParams={{ todo: todo }}
          options={() => ({
            title: i18n.t("Todo.ViewTodo"),
            headerStyle: {
              height: ms(45)
            },
            headerTitleStyle: {
              fontWeight: "bold",
              fontSize: ms(20),
              paddingLeft: ms(15)
            },
            headerRight: () => <MarkAsDoneButton onPress={() => null} />
          })}
        />
        {/* EDIT TODO */}
        <Stack.Screen
          name={TodoScreenName.EDITTODO}
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
