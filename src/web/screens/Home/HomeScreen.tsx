import React, { FC } from "react";
import { View, Text } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { ScreenName, WithSideTabsProps } from "web/screens";
import { WelcomeCard } from "./WelcomeCard";
import { ScaledSheet } from "react-native-size-matters";
import { RequestsByMariaCard } from "./RequestsByMariaCard";
import { AlertsCard } from "./AlertsCard";
import { TodosCard } from "./TodosCard";

export const HomeScreen: FC<WithSideTabsProps[ScreenName.HOME]> = () => {
  // JH-TODO Replace titles with i18n
  return (
    <ScreenWrapper>
      <WelcomeCard name="Nailah" />
      <View style={styles.bottomContainer}>
        <RequestsByMariaCard />
        <AlertsCard />
        <TodosCard />
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
