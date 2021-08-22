import React, { FC } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "mobile/screens/ScreenWrapper";
import { MainTitle } from "components/text";

export const CompletedRequestsTab: FC = () => {
  // JH-TODO Replace titles with i18n
  return (
    <ScreenWrapper>
      <View>
        <MainTitle title="Completed Requests" />
      </View>
    </ScreenWrapper>
  );
};
