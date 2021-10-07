import React, { FC, useEffect } from "react";
import { FlatList } from "react-native";
import { TodoRow } from "components/RowComponents/TodoRow";
import { RiskLevel } from "models/RiskLevel";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { RootState, select, store } from "util/useRedux";
import i18n from "util/language/i18n";
import { LocalTodo, TodoStatus, TodoInput } from "rc_agents/model";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { AgentTrigger } from "rc_agents/trigger";
import { TodoListTabsProps } from "web/navigation/types";
import { TodoRowTabProps } from "web/navigation/navigators/TodoListTabNavigator";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { NoItemsTextIndicator } from "components/Indicators/NoItemsTextIndicator";
import { setProcedureOngoing } from "ic-redux/actions/agents/procedureActionCreator";
import { setSubmittingTodo } from "ic-redux/actions/agents/todoActionCreator";

interface TodoCurrentTabProps
  extends TodoRowTabProps,
    TodoListTabsProps.CurrentTabProps {}

// Triggers DTA to update Todo to Completed
export const onDonePress = (item: LocalTodo): void => {
  store.dispatch(setProcedureOngoing(true));
  store.dispatch(setSubmittingTodo(true));

  // Creates Todo object for updating
  const todoToUpdate: TodoInput = {
    ...item,
    completed: true,
    lastModified: new Date().toISOString()
  };
  AgentTrigger.triggerUpdateTodo(todoToUpdate);
};

export const TodoCurrentTab: FC<TodoCurrentTabProps> = ({
  setTodoSelected
}) => {
  const { colors, pendingTodos, fetchingTodos } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      pendingTodos: state.todos.pendingTodos,
      fetchingTodos: state.todos.fetchingTodos
    })
  );

  // Set the todo item detail to be shown when the item is pressed
  function onCardPress(item: LocalTodo) {
    setTodoSelected(item);
  }

  // Triggers retrieval of pending Todos
  useEffect(() => {
    AgentTrigger.triggerRetrieveTodos(TodoStatus.PENDING);
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
        placeholder={i18n.t("Todo.SearchBarCurrentPlaceholder")}
      />
      {/* List of current todos */}
      {fetchingTodos ? (
        // Show loading indicator if fetching pending todos
        <LoadingIndicator flex={1} />
      ) : pendingTodos ? (
        // Show pending todos
        <FlatList
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <NoItemsTextIndicator text={i18n.t("Todo.NoTodos")} />
          )}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={pendingTodos}
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
      ) : null}
    </ScreenWrapper>
  );
};
