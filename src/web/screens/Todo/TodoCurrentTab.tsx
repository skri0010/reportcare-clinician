import React, { FC } from "react";
import { View, FlatList, Dimensions } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { MainTitle } from "components/Text";
import { TodoRow } from "components/RowComponents/TodoRow";
import { mockPatientRowDetails } from "mock/mockTodoDetails";
import { RiskLevel } from "models/RiskLevel";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";

export const TodoCurrentTab: FC = () => {
  // JH-TODO Replace titles with i18n
  // JH-TODO Flatlist
  // JH-TODO Remove mock data

  return (
    <View style={{ flex: 1 }}>
      {/* <MainTitle title="Current Todo" /> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator />}
        ListHeaderComponent={() => <ItemSeparator />}
        ListFooterComponent={() => <ItemSeparator />}
        data={mockPatientRowDetails}
        renderItem={({ item }) => (
          <TodoRow todoDetails={item} riskLevel={RiskLevel.HIGH} />
        )}
        keyExtractor={(item) => item.id}
      />
      {/* <TodoRow
          todoDetails={mockPatientRowDetails[0]}
          riskLevel={RiskLevel.HIGH}
        /> */}
    </View>
  );
};
