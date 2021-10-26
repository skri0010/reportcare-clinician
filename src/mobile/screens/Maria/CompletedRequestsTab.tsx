import React, { FC } from "react";
import { View } from "react-native";
import { MobileScreenWrapper } from "mobile/screens/MobileScreenWrapper";
import { MainTitle } from "components/Text";
import i18n from "util/language/i18n";

export const CompletedRequestsTab: FC = () => {
  return (
    <MobileScreenWrapper>
      <View>
        <MainTitle title={i18n.t("Maria.CompletedRequests")} />
      </View>
    </MobileScreenWrapper>
  );
};
