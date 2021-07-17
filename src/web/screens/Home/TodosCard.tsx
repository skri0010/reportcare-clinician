import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import { View, TextStyle, FlatList, useWindowDimensions } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { TodoRow } from "components/RowComponents/TodoRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { mockPatientRowDetails } from "mock/mockTodoDetails";
import { RiskLevel } from "models/RiskLevel";
import { H4 } from "components/Text/index";

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
      <View
        style={[
          styles.content,
          { maxHeight: useWindowDimensions().height * 0.38 }
        ]}
      >
        <FlatList
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={3}
          ItemSeparatorComponent={() => <ItemSeparator />}
          ListHeaderComponent={() => <ItemSeparator />}
          ListFooterComponent={() => <ItemSeparator />}
          data={mockPatientRowDetails}
          renderItem={({ item }) => (
            <TodoRow todoDetails={item} riskLevel={RiskLevel.HIGH} />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  card: {
    backgroundColor: "white",
    padding: "10@ms",
    margin: "20@ms",
    borderRadius: "5@ms",
    height: "100%"
  },
  title: {
    fontWeight: "bold",
    paddingBottom: "5@ms"
  },
  content: {
    // TO-DO jy: explore options to resolve flatlist height issue
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline"
  }
});
