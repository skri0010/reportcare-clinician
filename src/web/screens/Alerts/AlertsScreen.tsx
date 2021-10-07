import React, { FC, useState, useEffect } from "react";
import { RootState, select } from "util/useRedux";
import { ScreenName } from "web/navigation";
import { View, Modal } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { ScaledSheet } from "react-native-size-matters";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";
import { MainScreenProps } from "web/navigation/types";
import { AgentTrigger } from "rc_agents/trigger";
import { FetchAlertsMode } from "rc_agents/model";
import { AddTodoScreen } from "web/screens/Todo/modals/AddTodoScreen";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { AlertListTabNavigator } from "web/navigation/navigators/AlertListTabNavigator";
import { AlertDetailsScreen } from "./AlertDetailsScreen";

export const AlertScreen: FC<MainScreenProps[ScreenName.ALERTS]> = () => {
  const {
    colors,
    submittingTodo,
    fetchingAlertInfo,
    alertInfo,
    pendingAlerts,
    completedAlerts
  } = select((state: RootState) => ({
    colors: state.settings.colors,
    submittingTodo: state.agents.submittingTodo,
    fetchingAlertInfo: state.agents.fetchingAlertInfo,
    alertInfo: state.agents.alertInfo,
    pendingAlerts: state.agents.pendingAlerts,
    completedAlerts: state.agents.completedAlerts
  }));

  // For pointer events
  const [modalVisible, setModalVisible] = useState(false);
  const [isEmptyAlert, setIsEmptyAlert] = useState(true);

  /**
   * Trigger agent to fetch ALL alerts on initial load
   */
  useEffect(() => {
    // fetchingAlertInfo will be true if the screen is navigated to for viewing a real-time alert.
    // Trigger to fetch all alerts if the screen is navigated for the first time, i.e. pending and/or completed alerts are undefined.
    if (!fetchingAlertInfo || !pendingAlerts || !completedAlerts) {
      AgentTrigger.triggerRetrieveAlerts(FetchAlertsMode.ALL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Display details screen when alertInfo is retrieved
  useEffect(() => {
    if (alertInfo) {
      setIsEmptyAlert(false);
    } else {
      setIsEmptyAlert(true);
    }
  }, [alertInfo]);

  return (
    <ScreenWrapper fixed>
      <View
        style={styles.container}
        pointerEvents={modalVisible || submittingTodo ? "none" : "auto"}
      >
        <View style={styles.rowSelection}>
          <AlertListTabNavigator />
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: colors.primaryWebBackgroundColor
          }}
        >
          {fetchingAlertInfo ? (
            <LoadingIndicator flex={1} />
          ) : !isEmptyAlert ? (
            <AlertDetailsScreen setModalVisible={setModalVisible} />
          ) : (
            <NoSelectionScreen
              screenName={ScreenName.ALERTS}
              subtitle="Choose Alert to view more info"
            />
          )}
        </View>
      </View>
      {/* ADD TODO modal */}
      <View style={styles.modalView}>
        <Modal
          transparent
          visible={modalVisible}
          animationType="slide"
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View
            style={[
              styles.modalContainer,
              { backgroundColor: colors.overlayColor }
            ]}
          >
            {/* Add todo modal */}
            <AddTodoScreen setModalVisible={setModalVisible} />
          </View>
        </Modal>
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: { flexDirection: "row", height: "100%" },
  modalView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  rowSelection: { flex: 1 },
  modalContainer: {
    justifyContent: "center",
    height: "100%",
    width: "100%"
  }
});
