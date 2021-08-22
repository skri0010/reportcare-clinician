import React, { FC, useEffect } from "react";
import { View, FlatList } from "react-native";
import { TodoRow } from "components/rowComponents/TodoRow";
import { RiskLevel } from "models/RiskLevel";
import { ItemSeparator } from "components/rowComponents/ItemSeparator";
import { SearchBarComponent } from "components/bars/SearchBarComponent";
import { RootState, select, store } from "util/useRedux";
import i18n from "util/language/i18n";
import { LocalTodo, TodoStatus, TodoUpdateInput } from "rc_agents/model";
import { LoadingIndicator } from "components/indicators/LoadingIndicator";
import {
  setProcedureOngoing,
  setSubmittingTodo
} from "ic-redux/actions/agents/actionCreator";
import { AgentTrigger } from "rc_agents/trigger";

export interface TodoRowTabProps {
  setTodoSelected: (item: LocalTodo) => void;
}

// Triggers DTA to update Todo to Completed
export const onDonePress = (item: LocalTodo): void => {
  store.dispatch(setProcedureOngoing(true));
  store.dispatch(setSubmittingTodo(true));

  // Creates Todo object for updating
  const todoToUpdate: TodoUpdateInput = {
    id: item.id ? item.id : undefined,
    title: item.title,
    patientName: item.patientName,
    notes: item.notes,
    _version: item._version,
    completed: true,
    createdAt: item.createdAt
  };

  AgentTrigger.triggerUpdateTodo(todoToUpdate);
};

export const TodoCurrentTab: FC<TodoRowTabProps> = ({ setTodoSelected }) => {
  const { colors, pendingTodos, fetchingTodos } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      pendingTodos: state.agents.pendingTodos,
      fetchingTodos: state.agents.fetchingTodos
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
    <View style={{ flex: 1 }}>
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
      {/* <MainTitle title="Current Todo" /> */}
      <FlatList
        showsVerticalScrollIndicator={false}
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
      {/* Loading Indicator while Todos are still being fetched */}
      {fetchingTodos && <LoadingIndicator />}
    </View>
  );
};
