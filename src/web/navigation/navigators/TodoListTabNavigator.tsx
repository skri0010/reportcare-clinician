/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useState } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TodoCurrentTab } from "web/screens/Todo/tabs/TodoCurrentTab";
import { TodoCompletedTab } from "web/screens/Todo/tabs/TodoCompletedTab";
import { getTopTabBarOptions } from "util/getStyles";
import { RootState, select } from "util/useRedux";
import i18n from "util/language/i18n";
import { TodoListTabName, TodoListTabParamList } from "web/navigation";
import { LocalTodo } from "rc_agents/model";
import { TodoListTabsProps } from "../types";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import Fuse from "fuse.js";

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
  const { colors, fonts, completedTodos, pendingTodos } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      fonts: state.settings.fonts,
      completedTodos: state.todos.completedTodos,
      pendingTodos: state.todos.pendingTodos
    })
  );

  const [searching, setSearching] = useState<boolean>(false);
  const [pendingResult, setPendingResult] = useState<LocalTodo[]>([]);
  const [completedResult, setCompletedResult] = useState<LocalTodo[]>([]);

  const onSearchClick = (searchString: string) => {
    if (searchString.length === 0) {
      setSearching(false);
    } else if (pendingTodos || completedTodos) {
      setSearching(true);
      const options = {
        includeScore: true,
        keys: ["patientName"]
      };

      if (pendingTodos) {
        const fuse = new Fuse(pendingTodos, options);
        const result = fuse.search(searchString);
        const searchPendingResults: LocalTodo[] = [];
        result.forEach((item) => searchPendingResults.push(item.item));
        setPendingResult(searchPendingResults);
      }

      if (completedTodos) {
        const fuse = new Fuse(completedTodos, options);
        const result = fuse.search(searchString);
        const searchCompletedResults: LocalTodo[] = [];
        result.forEach((item) => searchCompletedResults.push(item.item));
        setCompletedResult(searchCompletedResults);
      }
    }
  };

  return (
    <>
      <SearchBarComponent
        onUserInput={(searchString) => onSearchClick(searchString)}
        onSearchClick={(searchString) => onSearchClick(searchString)}
        containerStyle={{
          backgroundColor: colors.primaryContrastTextColor
        }}
        placeholder={i18n.t("Todo.SearchBarPlaceholder")}
      />
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
            <TodoCurrentTab
              {...props}
              setTodoSelected={setTodoSelected}
              currentTodos={searching ? pendingResult : pendingTodos}
            />
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
            <TodoCompletedTab
              {...props}
              setTodoSelected={setTodoSelected}
              completedTodos={searching ? completedResult : completedTodos}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
};
