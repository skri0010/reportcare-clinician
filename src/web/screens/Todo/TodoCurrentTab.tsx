import React, { FC } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { MainTitle } from "components/Text";
import { TodoRow } from "components/RowComponents/TodoRow";
import { mockPatientRowDetails } from "mock/mockTodoDetails";
import { RiskLevel } from "models/RiskLevel";

export const TodoCurrentTab: FC = () => {
  // JH-TODO Replace titles with i18n
  // JH-TODO Flatlist
  // JH-TODO Remove mock data

  return (
    <ScreenWrapper>
      <View>
        <MainTitle title="Current Todo" />

        <TodoRow
          todoDetails={mockPatientRowDetails}
          riskLevel={RiskLevel.HIGH}
        />
      </View>
    </ScreenWrapper>
  );
};
