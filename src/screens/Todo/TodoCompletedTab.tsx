import React, { FC } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "screens/ScreenWrapper";
import { MainTitle } from "components/Text";

export const TodoCompletedTab: FC = () => {
  // JH-TODO Replace titles with i18n
  return (
    <ScreenWrapper>
      <View>
        <MainTitle title="Completed Todo" />
      </View>
    </ScreenWrapper>
  );
};
