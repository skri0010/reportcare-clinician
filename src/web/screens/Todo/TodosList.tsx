import { LocalTodo } from "rc_agents/model";
import React, { FC } from "react";
import { View } from "react-native";
import { TodoListTabName } from "web/navigation";
import { TodoListTabNavigator } from "web/navigation/navigators/TodoListTabNavigator";

interface TodosListProps {
  flex?: number;
  selectedTab?: TodoListTabName;
  onRowClick: (item: LocalTodo) => void;
  tabPressCurrent: () => void;
  tabPressCompleted: () => void;
}

export const TodosList: FC<TodosListProps> = ({
  flex = 1,
  selectedTab,
  tabPressCurrent,
  tabPressCompleted,
  onRowClick
}) => {
  return (
    <View style={{ flex: flex }}>
      {/* Left tab navigator */}
      <TodoListTabNavigator
        selectedTab={selectedTab}
        tabPressCurrent={tabPressCurrent}
        tabPressCompleted={tabPressCompleted}
        setTodoSelected={onRowClick}
      />
    </View>
  );
};
