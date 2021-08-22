import React, { FC } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TodoCurrentTab } from "web/screens/Todo/TodoCurrentTab";
import { TodoCompletedTab } from "web/screens/Todo/TodoCompletedTab";
import { getTopTabBarOptions } from "util/getStyles";
import { RootState, select } from "util/useRedux";
import i18n from "util/language/i18n";
import { TodoListName, TodoListTabParamList } from "web/navigation";
import { LocalTodo } from "rc_agents/model";

const Tab = createMaterialTopTabNavigator<TodoListTabParamList>();

interface TodoListNavigationStackProps {
  tabPressCurrent: () => void; // callback when the current tab is pressed (allow add button visibility)
  tabPressCompleted: () => void; // callback when the completed tab is pressed (turns off add button visibility)
  setTodoSelected: (item: LocalTodo) => void; // set the todo details to be shown
}

export const TodoListTabNavigator: FC<TodoListNavigationStackProps> = ({
  tabPressCurrent,
  tabPressCompleted,
  setTodoSelected
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));
  return (
    <Tab.Navigator
      screenOptions={getTopTabBarOptions({ colors: colors, fonts: fonts })}
    >
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
