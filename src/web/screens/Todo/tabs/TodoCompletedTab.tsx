import React, { FC, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
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
import Fuse from "fuse.js";

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
          } else if (completedTodos) {
            const options = {
              includeScore: true,
              keys: ["title"]
            };

            const fuse = new Fuse(completedTodos, options);

            const result = fuse.search(searchString);
            const searchResults: LocalTodo[] = [];
            result.forEach((item) => searchResults.push(item.item));
            setSearching(true);
            setSubset(searchResults);
          }
        }}
        containerStyle={{ backgroundColor: colors.primaryContrastTextColor }}
        placeholder={i18n.t("Todo.SearchBarCompletePlaceholder")}
      />
      {/* List of completed todos */}
      {fetchingTodos ? (
        // Show loading indicator if fetching completed todos
        <LoadingIndicator flex={1} />
      ) : completedTodos ? (
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
                  onButtonPress={() => onUndoPress(item)}
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
              data={completedTodos}
              renderItem={({ item }) => (
                <TodoRow
                  todoDetails={item}
                  riskLevel={
                    item.riskLevel ? item.riskLevel : RiskLevel.UNASSIGNED
                  }
                  onCardPress={() => onCardPress(item)}
                  onButtonPress={() => onUndoPress(item)}
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
