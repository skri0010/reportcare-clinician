import React, { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { MainScreenProps } from "web/navigation/types";
import { ScreenName } from "web/navigation";
import { WelcomeCard } from "./WelcomeCard";
import { ms, ScaledSheet } from "react-native-size-matters";
import { AlertsCard } from "./AlertsCard";
import { TodosCard } from "./TodosCard";
import { PendingPatientAssignmentsCard } from "./PendingPatientAssignmentsCard";
import { RootState, select, useDispatch } from "util/useRedux";
import useSound from "use-sound";
import { setShowAlertPopUp } from "ic-redux/actions/agents/alertActionCreator";
import { AlertPopUp } from "../Alerts/AlertPopUp";

export const HomeScreen: FC<MainScreenProps[ScreenName.HOME]> = ({
  navigation
}) => {
  const topMaxHeight = ms(200);
  const maxHeight = ms(250);

  const navigateToAlert = () => {
    navigation.navigate(ScreenName.ALERTS);
  };

  const dispatch = useDispatch();
  const [notified, setNotified] = useState(false); // Keeps track of whether user has been notified

  const [playNotificationSound] = useSound(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("assets/notification.mp3").default
  );

  const { showAlertPopUp, realTimeAlert } = select((state: RootState) => ({
    showAlertPopUp: state.alerts.showAlertPopUp,
    realTimeAlert: state.alerts.realTimeAlert
  }));

  useEffect(() => {
    if (showAlertPopUp && realTimeAlert && !notified) {
      playNotificationSound();
      setNotified(true); // Updates that user has been notified
    }
  }, [showAlertPopUp, realTimeAlert, playNotificationSound, notified]);

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
        <TodosCard maxHeight={maxHeight} navigation={navigation} />
        <PendingPatientAssignmentsCard maxHeight={maxHeight} />
      </View>
      {realTimeAlert && (
        <AlertPopUp
          visible={showAlertPopUp}
          onRequestClose={() => dispatch(setShowAlertPopUp(false))}
          navigation={navigation}
          realTimeAlert={realTimeAlert}
          setNotified={setNotified}
        />
      )}
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
