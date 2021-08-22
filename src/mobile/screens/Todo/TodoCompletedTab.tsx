import React, { FC } from "react";
import { View } from "react-native";
import { MobileScreenWrapper } from "mobile/screens/MobileScreenWrapper";
import { MainTitle } from "components/text";

export const TodoCompletedTab: FC = () => {
  // JH-TODO Replace titles with i18n
  return (
    <MobileScreenWrapper>
      <View>
        <MainTitle title="Completed Todo" />
      </View>
    </MobileScreenWrapper>
  );
};
