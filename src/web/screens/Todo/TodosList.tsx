import { LocalTodo } from "rc_agents/model";
import React, { FC } from "react";
import { View } from "react-native";
import { TodoListTabNavigator } from "web/navigation/navigators/TodoListTabNavigator";

interface TodosListProps {
  flex?: number;
  onRowClick: (item: LocalTodo) => void;
  tabPressCurrent: () => void;
  tabPressCompleted: () => void;
}

export const TodosList: FC<TodosListProps> = ({
  flex = 1,
  tabPressCurrent,
  tabPressCompleted,
  onRowClick
}) => {
  return (
    <View style={{ flex: flex }}>
      {/* Left tab navigator */}
      <TodoListTabNavigator
        tabPressCurrent={tabPressCurrent}
        tabPressCompleted={tabPressCompleted}
        setTodoSelected={onRowClick}
      />
    </View>
  );
};
