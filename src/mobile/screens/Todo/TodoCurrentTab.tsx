import React, { FC } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "mobile/screens/ScreenWrapper";
import { MainTitle } from "components/Text";
import { TodoRow } from "components/RowComponents/TodoRow";
import { mockCurrentTodoDetails, mockCurrentTodo } from "mock/mockTodoDetails";
import { RiskLevel } from "models/RiskLevel";

export const TodoCurrentTab: FC = () => {
  // JH-TODO Replace titles with i18n
  // JH-TODO Flatlist
  // JH-TODO Remove mock data

  return (
    <ScreenWrapper>
      <View>
        <MainTitle title="Current Todo" />

        <TodoRow todoDetails={mockCurrentTodo[0]} riskLevel={RiskLevel.HIGH} />
      </View>
    </ScreenWrapper>
  );
};
