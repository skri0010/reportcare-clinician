import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View, TextStyle, FlatList } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { TodoRow } from "components/RowComponents/TodoRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { mockPatientRowDetails } from "mock/mockTodoDetails";
import { RiskLevel } from "models/RiskLevel";
import { H3 } from "components/Text/index";
import { CardWrapper } from "./CardWrapper";
import { FloatingShowMoreButton } from "components/Buttons/FloatingShowMoreButton";

interface TodosCardProps {
  maxHeight: number;
}

export const TodosCard: FC<TodosCardProps> = ({ maxHeight }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const titleColor = { color: colors.primaryTextColor } as TextStyle;
  // JH-TODO: Replace with actual models
  const maxPatientsShown = Math.min(mockPatientRowDetails.length, 10); // At 10 items, `Show More` button is displayed
  const lastPatientIndex = maxPatientsShown - 1;

  return (
    <CardWrapper maxHeight={maxHeight}>
      <View style={styles.titleContainer}>
        <H3 text="Todos" style={[styles.title, titleColor]} />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={mockPatientRowDetails}
          renderItem={({ item, index }) => {
            return index === lastPatientIndex ? (
              <>
                <TodoRow
                  todoDetails={item}
                  riskLevel={RiskLevel.HIGH}
                  disabled
                  reduceOpacity
                />
                {/* Disable last row, display "Show More button" */}
                <FloatingShowMoreButton />
              </>
            ) : (
              <TodoRow todoDetails={item} riskLevel={RiskLevel.HIGH} />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  title: {
    fontWeight: "bold",
    paddingBottom: "5@ms"
  },
  listContainer: {
    flex: 1
    // TO-DO jy: explore options to resolve flatlist height issue
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline"
  }
});