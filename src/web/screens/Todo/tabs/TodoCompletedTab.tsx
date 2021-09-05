import React, { FC, useEffect } from "react";
import { FlatList } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { RiskLevel } from "models/RiskLevel";
import { TodoRow } from "components/RowComponents/TodoRow";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { RootState, select, store } from "util/useRedux";
import i18n from "util/language/i18n";
import { LocalTodo, TodoStatus, TodoInput } from "rc_agents/model";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import {
  setProcedureOngoing,
  setSubmittingTodo
} from "ic-redux/actions/agents/actionCreator";
import { AgentTrigger } from "rc_agents/trigger";
import { TodoListTabsProps } from "web/navigation/types";
import { TodoRowTabProps } from "web/navigation/navigators/TodoListTabNavigator";
import { NoItemsTextIndicator } from "components/Indicators/NoItemsTextIndicator";

interface TodoCompleteTabProps
  extends TodoRowTabProps,
    TodoListTabsProps.CompletedTabProps {}

// Triggers DTA to update Todo to Pending
export const onUndoPress = (item: LocalTodo): void => {
  store.dispatch(setProcedureOngoing(true));
  store.dispatch(setSubmittingTodo(true));

  // Creates Todo object for updating
  const todoToUpdate: TodoInput = {
    ...item,
    completed: false,
    lastModified: new Date().toISOString()
  };
  AgentTrigger.triggerUpdateTodo(todoToUpdate);
};

export const TodoCompletedTab: FC<TodoCompleteTabProps> = ({
  setTodoSelected
}) => {
  const { colors, completedTodos, fetchingTodos } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      completedTodos: state.agents.completedTodos,
      fetchingTodos: state.agents.fetchingTodos
    })
  );

  // Set the todo item detail to be shown when the item is pressed
  function onCardPress(item: LocalTodo) {
    setTodoSelected(item);
  }

  useEffect(() => {
    AgentTrigger.triggerRetrieveTodos(TodoStatus.COMPLETED);
  }, []);
  return (
    <ScreenWrapper
      style={{ backgroundColor: colors.secondaryWebBackgroundColor }}
    >
      {/* Search bar */}
      <SearchBarComponent
        onUserInput={() => {
          null;
        }}
        onSearchClick={() => {
          null;
        }}
        containerStyle={{ backgroundColor: colors.primaryContrastTextColor }}
        placeholder={i18n.t("Todo.SearchBarCompletePlaceholder")}
      />
      {/* List of completed todos */}
      {fetchingTodos ? (
        // Show loading indicator if fetching completed todos
        <LoadingIndicator flex={1} />
      ) : completedTodos ? (
        // Show completed todos
        <FlatList
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <NoItemsTextIndicator text={i18n.t("Todo.NoTodos")} />
          )}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={completedTodos}
          renderItem={({ item }) => (
            <TodoRow
              todoDetails={item}
              riskLevel={item.riskLevel ? item.riskLevel : RiskLevel.UNASSIGNED}
              onCardPress={() => onCardPress(item)}
              onButtonPress={() => onUndoPress(item)}
            />
          )}
          keyExtractor={(item) => item.createdAt}
          pointerEvents={fetchingTodos ? "none" : "auto"}
        />
      ) : null}
    </ScreenWrapper>
  );
};