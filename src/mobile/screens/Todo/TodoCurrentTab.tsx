import React, { FC } from "react";
import { FlatList, View } from "react-native";
import { MobileScreenWrapper } from "mobile/screens/MobileScreenWrapper";
import { MainTitle } from "components/Text";
import { TodoRow } from "components/RowComponents/TodoRow";
import { RiskLevel } from "models/RiskLevel";
import { RootState, select } from "util/useRedux";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import i18n from "util/language/i18n";

export const TodoCurrentTab: FC = () => {
  // FUTURE-TODO: Remove mock data
  const { pendingTodos } = select((state: RootState) => ({
    pendingTodos: state.todos.pendingTodos
  }));

  return (
    <MobileScreenWrapper>
      <View>
        <MainTitle title={i18n.t("Todo.CurrentTodo")} />

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
