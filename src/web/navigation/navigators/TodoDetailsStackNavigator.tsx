import React, { FC } from "react";
import { ViewTodoScreen } from "web/screens/Todo/stack/ViewTodoScreen";
import { EditTodoScreen } from "web/screens/Todo/stack/EditTodoScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { MarkAsDoneButton } from "components/buttons/MarkAsDoneButton";
import {
  TodoDetailsStackScreenName,
  TodoDetailsStackParamList
} from "web/navigation";
import { LocalTodo } from "rc_agents/model";
import i18n from "util/language/i18n";
import { ms } from "react-native-size-matters";
import { TodoScreenNavigation } from "web/navigation/types/MainScreenProps";
import { onDonePress } from "web/screens/Todo/tabs/TodoCurrentTab";
import { onUndoPress } from "web/screens/Todo/tabs/TodoCompletedTab";

const Stack = createStackNavigator<TodoDetailsStackParamList>();

interface TodoDetailsNavigationStackProps {
  todo: LocalTodo;
  navigation: TodoScreenNavigation;
}

export const TodoDetailsStackNavigator: FC<TodoDetailsNavigationStackProps> = ({
  todo,
  navigation
}) => {
  const onButtonPress = () => {
    if (todo.completed) {
      onUndoPress(todo);
    } else {
      onDonePress(todo);
    }
  };

  return (
    <Stack.Navigator>
      {/* View todo screen */}
      <Stack.Screen
        name={TodoDetailsStackScreenName.VIEW_TODO}
        component={ViewTodoScreen}
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
      {/* Edit todo screen */}
      <Stack.Screen
        name={TodoDetailsStackScreenName.EDIT_TODO}
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
