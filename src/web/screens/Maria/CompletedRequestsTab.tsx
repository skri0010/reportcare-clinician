import React, { FC } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { MainTitle } from "components/Text";
import i18n from "util/language/i18n";

export const CompletedRequestsTab: FC = () => {
  return (
    <ScreenWrapper>
      <View>
        <MainTitle title={i18n.t("Maria.CompletedRequest")} />
      </View>
    </ScreenWrapper>
  );
};
