/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from "react";
import { ViewTodoScreen } from "web/screens/Todo/stack/ViewTodoScreen";
import { EditTodoScreen } from "web/screens/Todo/stack/EditTodoScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { MarkAsDoneButton } from "components/Buttons/MarkAsDoneButton";
import {
  TodoDetailsStackScreenName,
  TodoDetailsStackParamList
} from "web/navigation";
import { LocalTodo } from "rc_agents/model";
import i18n from "util/language/i18n";
import { onDonePress } from "web/screens/Todo/tabs/TodoCurrentTab";
import { onUndoPress } from "web/screens/Todo/tabs/TodoCompletedTab";
import { TodoDetailsStackProps } from "../types";
import { getStackOptions } from "util/getStyles";
import { RootState, select } from "util/useRedux";
import { TodoScreenNavigation } from "web/navigation/types/MainScreenProps";

const Stack = createStackNavigator<TodoDetailsStackParamList>();
interface TodoDetailsNavigationStackProps {
  todo: LocalTodo;
  parentNavigation: TodoScreenNavigation;
  selectedScreen?: TodoDetailsStackScreenName;
}

export const TodoDetailsStackNavigator: FC<TodoDetailsNavigationStackProps> = ({
  todo,
  parentNavigation,
  selectedScreen: selectedTab
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const onButtonPress = () => {
    if (todo.completed) {
      onUndoPress(todo);
    } else {
      onDonePress(todo);
    }
  };

  // Type check params list. Required because initialParams is insufficient due to Partial<>
  // Remove eslint check if needed
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const initialParamsList: TodoDetailsStackParamList = {
    [TodoDetailsStackScreenName.VIEW_TODO]: undefined,
    [TodoDetailsStackScreenName.EDIT_TODO]: undefined
  };

  return (
    <Stack.Navigator
      initialRouteName={selectedTab || TodoDetailsStackScreenName.VIEW_TODO}
      screenOptions={getStackOptions({ colors: colors, fonts: fonts })}
    >
      {/* View todo screen */}
      <Stack.Screen
        name={TodoDetailsStackScreenName.VIEW_TODO}
        options={() => ({
          title: i18n.t("Todo.ViewTodo"),
          headerRight: () => (
            <MarkAsDoneButton onPress={onButtonPress} todo={todo} /> // Mark as done button
          )
        })}
      >
        {(props: TodoDetailsStackProps.ViewTodoProps) => (
          <ViewTodoScreen
            {...props}
            todo={todo}
            parentNavigation={parentNavigation}
          />
        )}
      </Stack.Screen>
      {/* Edit todo screen */}
      <Stack.Screen
        name={TodoDetailsStackScreenName.EDIT_TODO}
        options={{
          title: i18n.t("Todo.EditTodo")
        }}
      >
        {(props: TodoDetailsStackProps.EditTodoProps) => (
          <EditTodoScreen {...props} todo={todo} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
