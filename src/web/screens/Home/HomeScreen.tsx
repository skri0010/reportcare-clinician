import React, { FC, useEffect } from "react";
import { Button, View } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { MainScreenProps } from "web/navigation/types";
import { ScreenName } from "web/navigation";
import { WelcomeCard } from "./WelcomeCard";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RequestsByMariaCard } from "./RequestsByMariaCard";
import { AlertsCard } from "./AlertsCard";
import { TodosCard } from "./TodosCard";
import { PendingPatientAssignmentsCard } from "./PendingPatientAssignmentsCard";
import { AgentTrigger } from "rc_agents/trigger";
import { RootState, select, useDispatch } from "util/useRedux";
import useSound from "use-sound";
import { PatientHistoryModal } from "../Patients/PatientScreens/PatientDetailsScreen/PatientHistoryComponents/PatientHistoryModals";
import { setShowAlertPopUp } from "ic-redux/actions/agents/actionCreator";
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

  const [playNotificationSound] = useSound(
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require("assets/notification.mp3").default
  );

  const { showAlertPopUp, realTimeAlert } = select((state: RootState) => ({
    showAlertPopUp: state.agents.showAlertPopUp,
    realTimeAlert: state.agents.realTimeAlert
  }));

  useEffect(() => {
    if (showAlertPopUp && realTimeAlert) {
      playNotificationSound();
    }
  }, [showAlertPopUp, realTimeAlert, playNotificationSound]);

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
      <Button
        title="Test"
        onPress={() => {
          AgentTrigger.triggerProcessAlertNotification({
            id: "",
            alertID: "d063a1aa-0aea-4539-95e2-a83c85ec5fc0",
            patientID: "bea"
          });
        }}
      />
      {realTimeAlert && (
        <PatientHistoryModal
          visible={showAlertPopUp}
          onRequestClose={() => dispatch(setShowAlertPopUp(false))}
        >
          <AlertPopUp navigation={navigation} realTimeAlert={realTimeAlert} />
        </PatientHistoryModal>
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
