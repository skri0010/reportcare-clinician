import React, { FC, useEffect } from "react";
import { FlatList } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { RiskLevel } from "models/RiskLevel";
import { TodoRow } from "components/rowComponents/TodoRow";
import { SearchBarComponent } from "components/bars/SearchBarComponent";
import { ItemSeparator } from "components/rowComponents/ItemSeparator";
import { RootState, select, store } from "util/useRedux";
import i18n from "util/language/i18n";
import { LocalTodo, TodoStatus, TodoUpdateInput } from "rc_agents/model";
import { LoadingIndicator } from "components/indicators/LoadingIndicator";
import {
  setProcedureOngoing,
  setSubmittingTodo
} from "ic-redux/actions/agents/actionCreator";
import { AgentTrigger } from "rc_agents/trigger";
import { TodoListTabsProps } from "web/navigation/types";
import { TodoRowTabProps } from "web/navigation/navigators/TodoListTabNavigator";

interface TodoCompleteTabProps
  extends TodoRowTabProps,
    TodoListTabsProps.CompletedTabProps {}

// Triggers DTA to update Todo to Pending
export const onUndoPress = (item: LocalTodo): void => {
  store.dispatch(setProcedureOngoing(true));
  store.dispatch(setSubmittingTodo(true));

  // Creates Todo object for updating
  const todoToUpdate: TodoUpdateInput = {
    id: item.id ? item.id : undefined,
    title: item.title,
    patientName: item.patientName,
    notes: item.notes,
    _version: item._version,
    completed: false,
    createdAt: item.createdAt
  };
  AgentTrigger.triggerUpdateTodo(todoToUpdate);
};

export const TodoCompletedTab: FC<TodoCompleteTabProps> = ({
  setTodoSelected
}) => {
  const { colors, completedTodos, fetchingCompletedTodos } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      completedTodos: state.agents.completedTodos,
      fetchingCompletedTodos: state.agents.fetchingCompletedTodos
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
      <FlatList
        showsVerticalScrollIndicator={false}
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
        pointerEvents={fetchingCompletedTodos ? "none" : "auto"}
      />

      {/* Loading Indicator while Todos are still being fetched */}
      {fetchingCompletedTodos && <LoadingIndicator />}
    </ScreenWrapper>
  );
};
