import React, { FC } from "react";
import { FlatList, View } from "react-native";
import { MobileScreenWrapper } from "mobile/screens/MobileScreenWrapper";
import { MainTitle } from "components/Text";
import { TodoRow } from "components/RowComponents/TodoRow";
import { RiskLevel } from "models/RiskLevel";
import { RootState, select } from "util/useRedux";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";

export const TodoCurrentTab: FC = () => {
  // JH-TODO Replace titles with i18n
  // JH-TODO Flatlist
  // JH-TODO Remove mock data

  const { pendingTodos } = select((state: RootState) => ({
    pendingTodos: state.todos.pendingTodos
  }));

  return (
    <MobileScreenWrapper>
      <View>
        <MainTitle title="Current Todo" />

        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={pendingTodos}
          renderItem={({ item }) => (
            <TodoRow
              todoDetails={item}
              riskLevel={item.riskLevel ? item.riskLevel : RiskLevel.UNASSIGNED}
            />
          )}
          keyExtractor={(item) => item.createdAt}
        />
      </View>
    </MobileScreenWrapper>
  );
};
