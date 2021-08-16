import React, { FC, useEffect } from "react";
import { FlatList } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { RiskLevel } from "models/RiskLevel";
import { TodoRow } from "components/RowComponents/TodoRow";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { TodoRowTabProps } from "./TodoCurrentTab";
import { RootState, select, useDispatch } from "util/useRedux";
import i18n from "util/language/i18n";
import { LocalTodo, TodoStatus, TodoUpdateInput } from "rc_agents/model";
import { LoadingIndicator } from "components/IndicatorComponents/LoadingIndicator";
import {
  setProcedureOngoing,
  setSubmittingTodo
} from "ic-redux/actions/agents/actionCreator";
import { triggerRetrieveTodos, triggerUpdateTodo } from "rc_agents/triggers";

export const TodoCompletedTab: FC<TodoRowTabProps> = ({ setTodoSelected }) => {
  const { colors, completedTodos, fetchingTodos } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      completedTodos: state.agents.completedTodos,
      fetchingTodos: state.agents.fetchingTodos
    })
  );

  const dispatch = useDispatch();

  // Set the todo item detail to be shown when the item is pressed
  function onCardPress(item: LocalTodo) {
    setTodoSelected(item);
  }

  // Triggers DTA to update Todo to Pending
  const onUndoPress = (item: LocalTodo): void => {
    dispatch(setProcedureOngoing(true));
    dispatch(setSubmittingTodo(true));

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
    triggerUpdateTodo(todoToUpdate);
  };

  useEffect(() => {
    triggerRetrieveTodos(TodoStatus.COMPLETED);
  }, []);
  return (
    <ScreenWrapper>
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
      <FlatList
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator />}
        data={completedTodos}
        renderItem={({ item }) => (
          <TodoRow
            todoDetails={item}
            riskLevel={RiskLevel.LOW}
            onCardPress={() => onCardPress(item)}
            onButtonPress={() => onUndoPress(item)}
          />
        )}
        keyExtractor={(item) => item.createdAt}
        pointerEvents={fetchingTodos ? "none" : "auto"}
      />

      {/* Loading Indicator while Todos are still being fetched */}
      {fetchingTodos && <LoadingIndicator />}
    </ScreenWrapper>
  );
};
