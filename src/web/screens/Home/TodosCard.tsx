import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View, TextStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { TodoRow } from "components/RowComponents/TodoRow";
import { mockPatientRowDetails } from "mock/mockTodoDetails";
import { RiskLevel } from "models/RiskLevel";
import { H3, H4 } from "components/Text/index";

export const TodosCard: FC = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const titleColor = { color: colors.primaryTextColor } as TextStyle;

  return (
    <View style={styles.card}>
      <View style={styles.titleContainer}>
        <H4 text="Todos" style={[styles.title, titleColor]} />
      </View>
      <TodoRow todoDetails={mockPatientRowDetails} riskLevel={RiskLevel.HIGH} />
    </View>
  );
};

const styles = ScaledSheet.create({
  card: {
    backgroundColor: "white",
    padding: "10@ms",
    margin: "20@ms",
    borderRadius: "5@ms",
    height: "78%"
  },
  title: {
    fontWeight: "bold",
    paddingBottom: "5@ms"
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline"
  }
});
