import React, { FC } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { MainScreenProps } from "web/navigation/types";
import { ScreenName } from "web/navigation";
import { WelcomeCard } from "./WelcomeCard";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RequestsByMariaCard } from "./RequestsByMariaCard";
import { AlertsCard } from "./AlertsCard";
import { TodosCard } from "./TodosCard";
import { PendingPatientAssignmentsCard } from "./PendingPatientAssignmentsCard";

export const HomeScreen: FC<MainScreenProps[ScreenName.HOME]> = ({
  navigation
}) => {
  const topMaxHeight = ms(200);
  const maxHeight = ms(250);

  const navigateToAlert = () => {
    navigation.navigate(ScreenName.ALERTS);
  };

  return (
    <ScreenWrapper padding>
      <View style={styles.container}>
        <AlertsCard
          maxHeight={topMaxHeight}
          flex={1.2}
          navigateCallback={navigateToAlert}
        />
        <WelcomeCard maxHeight={topMaxHeight} flex={1.8} />
      </View>
      <View style={styles.container}>
        <RequestsByMariaCard maxHeight={maxHeight} />
        <TodosCard maxHeight={maxHeight} navigation={navigation} />
        <PendingPatientAssignmentsCard maxHeight={maxHeight} />
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
