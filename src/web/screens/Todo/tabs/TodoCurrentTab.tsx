import React, { FC } from "react";
import { FlatList, View } from "react-native";
import { TodoRow } from "components/RowComponents/TodoRow";
import { RiskLevel } from "models/RiskLevel";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { RootState, select, store } from "util/useRedux";
import i18n from "util/language/i18n";
import { LocalTodo } from "rc_agents/model";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { AgentTrigger } from "rc_agents/trigger";
import { TodoListTabsProps } from "web/navigation/types";
import { TodoRowTabProps } from "web/navigation/navigators/TodoListTabNavigator";
import { NoItemsTextIndicator } from "components/Indicators/NoItemsTextIndicator";
import { setProcedureOngoing } from "ic-redux/actions/agents/procedureActionCreator";
import { setSubmittingTodo } from "ic-redux/actions/agents/todoActionCreator";
import { NoListItemMessage } from "web/screens/Shared/NoListItemMessage";

interface TodoCurrentTabProps
  extends TodoRowTabProps,
    TodoListTabsProps.CurrentTabProps {}

// Triggers DTA to update Todo to Completed
export const onDonePress = (item: LocalTodo): void => {
  store.dispatch(setProcedureOngoing(true));
  store.dispatch(setSubmittingTodo(true));

  // Creates Todo object for updating
  const todoToUpdate: LocalTodo = {
    ...item,
    completed: true,
    lastModified: new Date().toISOString()
  };
  AgentTrigger.triggerUpdateTodo(todoToUpdate);
};

export const TodoCurrentTab: FC<TodoCurrentTabProps> = ({
  setTodoSelected,
  currentTodos
}) => {
  const { colors, fetchingTodos } = select((state: RootState) => ({
    colors: state.settings.colors,
    fetchingTodos: state.todos.fetchingTodos
  }));

  // Set the todo item detail to be shown when the item is pressed
  function onCardPress(item: LocalTodo) {
    setTodoSelected(item);
  }

  return (
    <View
      style={{ flex: 1, backgroundColor: colors.secondaryWebBackgroundColor }}
    >
      {/* List of current todos */}
      {fetchingTodos ? (
        // Show loading indicator if fetching pending todos
        <LoadingIndicator flex={1} />
      ) : currentTodos ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <NoItemsTextIndicator text={i18n.t("Todo.NoTodos")} />
          )}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={currentTodos}
          renderItem={({ item }) => (
            <TodoRow
              todoDetails={item}
              riskLevel={item.riskLevel ? item.riskLevel : RiskLevel.UNASSIGNED}
              onCardPress={() => onCardPress(item)}
              onButtonPress={() => onDonePress(item)}
            />
          )}
          keyExtractor={(item) => item.createdAt}
          pointerEvents={fetchingTodos ? "none" : "auto"}
        />
      ) : (
        <NoListItemMessage screenMessage={i18n.t("Todo.NoTodos")} />
      )}
    </View>
  );
};
