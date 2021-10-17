import React, { FC, useEffect, useState } from "react";
import { RootState, select } from "util/useRedux";
import { View, FlatList } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { TodoRow } from "components/RowComponents/TodoRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { RiskLevel } from "models/RiskLevel";
import { CardWrapper } from "components/Wrappers/CardWrapper";
import { FloatingBottomButton } from "components/Buttons/FloatingBottomButton";
import i18n from "util/language/i18n";
import { ScreenName } from "web/navigation";
import { FetchTodosMode } from "rc_agents/model";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { AgentTrigger } from "rc_agents/trigger";
import { HomeScreenNavigation } from "web/navigation/types/MainScreenProps";
import { onDonePress } from "web/screens/Todo/tabs/TodoCurrentTab";
import { EmptyListIndicator } from "components/Indicators/EmptyListIndicator";

interface TodosCardProps {
  maxHeight: number;
  navigation: HomeScreenNavigation;
}

export const TodosCard: FC<TodosCardProps> = ({ maxHeight, navigation }) => {
  const { pendingTodos, fetchingTodos } = select((state: RootState) => ({
    pendingTodos: state.todos.pendingTodos,
    fetchingTodos: state.todos.fetchingTodos
  }));

  const [lastPatientIndex, setLastPatientIndex] = useState(-1);

  // Trigger the retrieval of PENDING todos
  useEffect(() => {
    AgentTrigger.triggerRetrieveTodos(FetchTodosMode.PENDING);
  }, []);

  useEffect(() => {
    if (pendingTodos && pendingTodos.length > 10) {
      // At 10 items, `Show More` button is displayed
      setLastPatientIndex(9);
    }
  }, [pendingTodos]);

  return (
    <CardWrapper maxHeight={maxHeight} title={i18n.t("Home.Todos")}>
      {/* Loading indicator */}
      {fetchingTodos ? (
        // Pending todos are being fetched
        <LoadingIndicator />
      ) : pendingTodos ? (
        <View style={styles.listContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <ItemSeparator />}
            data={pendingTodos}
            ListEmptyComponent={() => (
              <EmptyListIndicator text={i18n.t("Todo.NoPendingTodo")} />
            )}
            renderItem={({ item, index }) => {
              return index === lastPatientIndex ? (
                <>
                  <TodoRow
                    todoDetails={item}
                    riskLevel={
                      item.riskLevel ? item.riskLevel : RiskLevel.UNASSIGNED
                    }
                    onCardPress={() => {
                      // Navigate to Todo screen
                      navigation.navigate(ScreenName.TODO, {
                        todoToShow: item
                      });
                    }}
                  />
                  {/* Disable last row, display "Show More button" */}
                  <FloatingBottomButton />
                </>
              ) : (
                <TodoRow
                  todoDetails={item}
                  riskLevel={
                    item.riskLevel ? item.riskLevel : RiskLevel.UNASSIGNED
                  }
                  onCardPress={() => {
                    // Navigate to Todo screen
                    navigation.navigate(ScreenName.TODO, { todoToShow: item });
                  }}
                  onButtonPress={() => onDonePress(item)}
                />
              );
            }}
            keyExtractor={(item) => item.createdAt}
          />
        </View>
      ) : null}
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  listContainer: {
    flex: 1
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline"
  }
});
