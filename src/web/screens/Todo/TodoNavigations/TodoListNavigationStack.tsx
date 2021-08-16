import React, { FC } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TodoCurrentTab } from "../TodoCurrentTab";
import { TodoCompletedTab } from "../TodoCompletedTab";
import { getTopTabBarOptions } from "util/getStyles";
import { RootState, select } from "util/useRedux";
import i18n from "util/language/i18n";
import { TodoListName, TodoListParamList } from "web/screens";
import { LocalTodo } from "rc_agents/model";

const Tab = createMaterialTopTabNavigator<TodoListParamList>();

interface TodoListNavigationStackProps {
  tabPressCurrent: () => void; // callback when the current tab is pressed (allow add button visibility)
  tabPressCompleted: () => void; // callback when the completed tab is pressed (turns off add button visibility)
  setTodoSelected: (item: LocalTodo) => void; // set the todo details to be shown
}

export const TodoListNavigationStack: FC<TodoListNavigationStackProps> = ({
  tabPressCurrent,
  tabPressCompleted,
  setTodoSelected
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  return (
    <Tab.Navigator tabBarOptions={getTopTabBarOptions(colors)}>
      {/* CURRENT todo tab */}
      <Tab.Screen
        name={TodoListName.CURRENT}
        options={{ title: i18n.t("Todo.Current") }}
        listeners={{
          tabPress: tabPressCurrent
        }}
      >
        {() => <TodoCurrentTab setTodoSelected={setTodoSelected} />}
      </Tab.Screen>
      {/* COMPLETED todo tab */}
      <Tab.Screen
        name={TodoListName.COMPLETED}
        options={{ title: i18n.t("Todo.Completed") }}
        listeners={{
          tabPress: tabPressCompleted
        }}
      >
        {() => <TodoCompletedTab setTodoSelected={setTodoSelected} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
