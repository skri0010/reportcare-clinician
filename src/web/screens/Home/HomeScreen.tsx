import React, { FC, useEffect } from "react";
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
import { RootState, select, useDispatch } from "util/useRedux";
import { setProcessedAlertNotification } from "ic-redux/actions/agents/actionCreator";
import { AlertStatus, FetchAlertsMode } from "rc_agents/model";
import { AgentTrigger } from "rc_agents/trigger";

export const HomeScreen: FC<MainScreenProps[ScreenName.HOME]> = ({
  navigation
}) => {
  const { processedAlertNotification } = select((state: RootState) => ({
    processedAlertNotification: state.agents.processedAlertNotification
  }));
  const topMaxHeight = ms(200);
  const maxHeight = ms(250);

  const navigateToAlert = () => {
    navigation.navigate(ScreenName.ALERTS);
  };

  const dispatch = useDispatch();

  /**
   * Trigger agent to fetch either pending or completed alerts when a new alert is processed
   */
  useEffect(() => {
    if (processedAlertNotification) {
      dispatch(setProcessedAlertNotification(null));

      const newAlertInfo = processedAlertNotification;

      // Obtain fetch alerts mode
      const fetchAlertsMode: FetchAlertsMode | null =
        newAlertInfo.pending === AlertStatus.PENDING
          ? FetchAlertsMode.PENDING
          : newAlertInfo.completed === AlertStatus.COMPLETED
          ? FetchAlertsMode.COMPLETED
          : null;

      if (fetchAlertsMode) {
        AgentTrigger.triggerRetrieveAlerts({
          fetchAlertsMode: fetchAlertsMode,
          fetchAlertsLocally: true
        });
      }
    }
  }, [processedAlertNotification, dispatch]);

  return (
    <ScreenWrapper padding>
      <View style={styles.container}>
        <AlertsCard
          maxHeight={topMaxHeight}
          flex={1.2}
          navigateCallback={navigateToAlert}
        />
        <WelcomeCard name="Nailah" maxHeight={topMaxHeight} flex={1.8} />
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
