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
import { TodoStatus } from "rc_agents/model";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { AgentTrigger } from "rc_agents/trigger";
import { HomeScreenNavigation } from "web/navigation/types/MainScreenProps";

interface TodosCardProps {
  maxHeight: number;
  navigation: HomeScreenNavigation;
}

export const TodosCard: FC<TodosCardProps> = ({ maxHeight, navigation }) => {
  const { pendingTodos, fetchingTodos } = select((state: RootState) => ({
    pendingTodos: state.agents.pendingTodos,
    fetchingTodos: state.agents.fetchingTodos
  }));

  const [lastPatientIndex, setLastPatientIndex] = useState(-1);

  useEffect(() => {
    AgentTrigger.triggerRetrieveTodos(TodoStatus.PENDING);
  }, []);

  useEffect(() => {
    if (pendingTodos && pendingTodos.length > 10) {
      // At 10 items, `Show More` button is displayed
      setLastPatientIndex(9);
    }
  }, [pendingTodos]);

  return (
    <CardWrapper maxHeight={maxHeight} title={i18n.t("Home.Todos")}>
      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={pendingTodos}
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
                    navigation.navigate(ScreenName.TODO, { todoToShow: item });
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
              />
            );
          }}
          keyExtractor={(item) => item.createdAt}
        />
      </View>
      {/* Loading indicator */}
      {fetchingTodos && <LoadingIndicator />}
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
