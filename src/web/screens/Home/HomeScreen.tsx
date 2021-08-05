import React, { FC } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { ScreenName, WithSideTabsProps } from "web/screens";
import { WelcomeCard } from "./WelcomeCard";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RequestsByMariaCard } from "./RequestsByMariaCard";
import { AlertsCard } from "./AlertsCard";
import { TodosCard } from "./TodosCard";
import { PendingPatientAssignmentsCard } from "./PendingPatientAssignmentsCard";

export const HomeScreen: FC<WithSideTabsProps[ScreenName.HOME]> = () => {
  // JH-TODO Replace titles with i18n
  const cardMaxHeight = ms(300);

  return (
    <ScreenWrapper padding>
      <WelcomeCard name="Nailah" />
      <View style={styles.bottomContainer}>
        <RequestsByMariaCard maxHeight={cardMaxHeight} />
        <PendingPatientAssignmentsCard maxHeight={cardMaxHeight} />
        {/* <AlertsCard maxHeight={cardMaxHeight} /> */}
        <TodosCard maxHeight={cardMaxHeight} />
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  bottomContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
