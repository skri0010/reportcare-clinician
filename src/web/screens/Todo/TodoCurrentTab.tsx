import React, { FC, useEffect } from "react";
import { View, FlatList } from "react-native";
import { TodoRow } from "components/RowComponents/TodoRow";
import { RiskLevel } from "models/RiskLevel";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { RootState, select, useDispatch } from "util/useRedux";
import i18n from "util/language/i18n";
import { LocalTodo, TodoStatus, TodoUpdateInput } from "rc_agents/model";
import { LoadingIndicator } from "components/IndicatorComponents/LoadingIndicator";
import { setProcedureOngoing, setSubmittingTodo } from "ic-redux/actions/agents/actionCreator";
import { triggerRetrieveTodos, triggerUpdateTodo } from "rc_agents/triggers";

export interface TodoRowTabProps {
  setTodoSelected: (item: LocalTodo) => void;
}

export const TodoCurrentTab: FC<TodoRowTabProps> = ({ setTodoSelected }) => {
  const { colors, pendingTodos, fetchingTodos } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      pendingTodos: state.agents.pendingTodos,
      fetchingTodos: state.agents.fetchingTodos
    })
  );

  const dispatch = useDispatch();

  function onCardPress(item: LocalTodo) {
    setTodoSelected(item);
  }

  // Triggers DTA to update Todo to Completed
  const onDonePress = (item: LocalTodo): void => {
    dispatch(setProcedureOngoing(true));
    dispatch(setSubmittingTodo(true));

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

    triggerUpdateTodo(todoToUpdate);
  };

  // Triggers retrieval of pending Todos
  useEffect(() => {
    triggerRetrieveTodos(TodoStatus.PENDING);
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
