import React, { FC } from "react";
import { View } from "react-native";
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
        <View style={styles.item}>
          <RequestsByMariaCard />
        </View>
        <View style={styles.item}>
          <AlertsCard />
        </View>
        <View style={styles.item}>
          <TodosCard />
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  bottomContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  item: {
    flexBasis: "33.33%"
  }
});
