import React, { FC, useEffect, useState } from "react";
import { RootState, select } from "util/useRedux";
import { View, TextStyle, FlatList } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { TodoRow } from "components/rowComponents/TodoRow";
import { ItemSeparator } from "components/rowComponents/ItemSeparator";
import { RiskLevel } from "models/RiskLevel";
import { H4 } from "components/text/index";
import { CardWrapper } from "./CardWrapper";
import { FloatingBottomButton } from "components/buttons/FloatingBottomButton";
import i18n from "util/language/i18n";
import { ScreenName } from "web/navigation";
import { TodoStatus } from "rc_agents/model";
import { LoadingIndicator } from "components/indicators/LoadingIndicator";
import { AgentTrigger } from "rc_agents/trigger";
import { HomeScreenNavigation } from "web/navigation/types/MainScreenProps";

interface TodosCardProps {
  maxHeight: number;
  navigation: HomeScreenNavigation;
}

export const TodosCard: FC<TodosCardProps> = ({ maxHeight, navigation }) => {
  const { colors, pendingTodos, fetchingPendingTodos } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      pendingTodos: state.agents.pendingTodos,
      fetchingPendingTodos: state.agents.fetchingPendingTodos
    })
  );

  const titleColor = { color: colors.primaryTextColor } as TextStyle;

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
    <CardWrapper maxHeight={maxHeight}>
      <View style={styles.titleContainer}>
        <H4 text={i18n.t("Home.Todos")} style={[styles.title, titleColor]} />
      </View>
      {/* Loading indicator */}
      {fetchingPendingTodos && <LoadingIndicator />}
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
                  disabled
                  reduceOpacity
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
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  title: {
    fontWeight: "bold",
    paddingBottom: "5@ms",
    paddingRight: "5@ms"
  },
  listContainer: {
    flex: 1,
    paddingTop: "15@ms"
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline"
  }
});
