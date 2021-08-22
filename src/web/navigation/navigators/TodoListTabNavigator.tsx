/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TodoCurrentTab } from "web/screens/Todo/tabs/TodoCurrentTab";
import { TodoCompletedTab } from "web/screens/Todo/tabs/TodoCompletedTab";
import { getTopTabBarOptions } from "util/getStyles";
import { RootState, select } from "util/useRedux";
import i18n from "util/language/i18n";
import { TodoListTabName, TodoListTabParamList } from "web/navigation";
import { LocalTodo } from "rc_agents/model";
import { TodoListTabsProps } from "../types";

const Tab = createMaterialTopTabNavigator<TodoListTabParamList>();

interface TodoListNavigationStackProps {
  selectedTab?: TodoListTabName;
  tabPressCurrent: () => void; // callback when the current tab is pressed (allow add button visibility)
  tabPressCompleted: () => void; // callback when the completed tab is pressed (turns off add button visibility)
  setTodoSelected: (item: LocalTodo) => void; // set the todo details to be shown
}

export interface TodoRowTabProps {
  setTodoSelected: (item: LocalTodo) => void;
}

export const TodoListTabNavigator: FC<TodoListNavigationStackProps> = ({
  selectedTab,
  tabPressCurrent,
  tabPressCompleted,
  setTodoSelected
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  // Type check params list. Required because initialParams is insufficient due to Partial<>
  // Remove eslint check if needed
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const initialParamsList: TodoListTabParamList = {
    [TodoListTabName.CURRENT]: undefined,
    [TodoListTabName.COMPLETED]: undefined
  };

  return (
    <Tab.Navigator
      initialRouteName={selectedTab || TodoListTabName.CURRENT}
      screenOptions={getTopTabBarOptions({ colors: colors, fonts: fonts })}
    >
      {/* Current todos list */}
      <Tab.Screen
        name={TodoListTabName.CURRENT}
        options={{ title: i18n.t("Todo.Current") }}
        listeners={{
          tabPress: tabPressCurrent
        }}
      >
        {(props: TodoListTabsProps.CurrentTabProps) => (
          <TodoCurrentTab {...props} setTodoSelected={setTodoSelected} />
        )}
      </Tab.Screen>
      {/* Completed todos list */}
      <Tab.Screen
        name={TodoListTabName.COMPLETED}
        options={{ title: i18n.t("Todo.Completed") }}
        listeners={{
          tabPress: tabPressCompleted
        }}
      >
        {(props: TodoListTabsProps.CompletedTabProps) => (
          <TodoCompletedTab {...props} setTodoSelected={setTodoSelected} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
