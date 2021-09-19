import React, { FC, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { TodoRow } from "components/RowComponents/TodoRow";
import { RiskLevel } from "models/RiskLevel";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
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
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { NoItemsTextIndicator } from "components/Indicators/NoItemsTextIndicator";
import Fuse from "fuse.js";

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

  // Check if the search is being used
  const [searching, setSearching] = useState<boolean>(false);

  // Store results of fuzzy search
  const [searchedSubset, setSubset] = useState<LocalTodo[]>([]);

  return (
    <ScreenWrapper
      style={{ backgroundColor: colors.secondaryWebBackgroundColor }}
    >
      {/* Search bar */}
      <SearchBarComponent
        onUserInput={() => {
          null;
        }}
        onSearchClick={(searchString: string) => {
          if (searchString.length === 0) {
            setSearching(false);
          } else if (pendingTodos) {
            const options = {
              includeScore: true,
              keys: ["title"]
            };

            const fuse = new Fuse(pendingTodos, options);

            const result = fuse.search(searchString);
            const searchResults: LocalTodo[] = [];
            result.forEach((item) => searchResults.push(item.item));
            setSearching(true);
            setSubset(searchResults);
          }
        }}
        containerStyle={{ backgroundColor: colors.primaryContrastTextColor }}
        placeholder={i18n.t("Todo.SearchBarCurrentPlaceholder")}
      />
      {/* List of current todos */}
      {fetchingTodos ? (
        // Show loading indicator if fetching pending todos
        <LoadingIndicator flex={1} />
      ) : pendingTodos ? (
        <View>
          {searching ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={() => (
                <NoItemsTextIndicator text={i18n.t("Todo.NoTodos")} />
              )}
              ItemSeparatorComponent={() => <ItemSeparator />}
              data={searchedSubset}
              renderItem={({ item }) => (
                <TodoRow
                  todoDetails={item}
                  riskLevel={
                    item.riskLevel ? item.riskLevel : RiskLevel.UNASSIGNED
                  }
                  onCardPress={() => onCardPress(item)}
                  onButtonPress={() => onDonePress(item)}
                />
              )}
              keyExtractor={(item) => item.createdAt}
              pointerEvents={fetchingTodos ? "none" : "auto"}
            />
          ) : (
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
                  riskLevel={
                    item.riskLevel ? item.riskLevel : RiskLevel.UNASSIGNED
                  }
                  onCardPress={() => onCardPress(item)}
                  onButtonPress={() => onDonePress(item)}
                />
              )}
              keyExtractor={(item) => item.createdAt}
              pointerEvents={fetchingTodos ? "none" : "auto"}
            />
          )}
        </View>
      ) : null}
    </ScreenWrapper>
  );
};
