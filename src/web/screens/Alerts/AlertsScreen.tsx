import React, { FC, useState, useEffect } from "react";
import { RootState, select } from "util/useRedux";
import { ScreenName } from "web/navigation";
import { View, Modal } from "react-native";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { ScaledSheet } from "react-native-size-matters";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";
import { MainScreenProps } from "web/navigation/types";
import { AgentTrigger } from "rc_agents/trigger";
import { FetchAlertsMode } from "rc_agents/model";
import { AddTodoScreen } from "web/screens/Todo/modals/AddTodoScreen";
import i18n from "util/language/i18n";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { AlertListTabNavigator } from "web/navigation/navigators/AlertListTabNavigator";
import { AlertDetailsScreen } from "./AlertDetailsScreen";
import { AdaptiveTwoScreenWrapper } from "components/Wrappers/AdaptiveTwoScreenWrapper";

export const AlertScreen: FC<MainScreenProps[ScreenName.ALERTS]> = () => {
  const {
    colors,
    submittingTodo,
    fetchingAlertInfo,
    alertInfo,
    pendingAlerts,
    completedAlerts,
    riskFilters
  } = select((state: RootState) => ({
    colors: state.settings.colors, // Used to detect completion of updateTodo procedure
    procedureOngoing: state.procedures.procedureOngoing,
    procedureSuccessful: state.procedures.procedureSuccessful,
    submittingTodo: state.todos.submittingTodo,
    fetchingAlertInfo: state.alerts.fetchingAlertInfo,
    alertInfo: state.alerts.alertInfo,
    pendingAlerts: state.alerts.pendingAlerts,
    completedAlerts: state.alerts.completedAlerts,
    riskFilters: state.filters.alertRiskFilters
  }));

  // For pointer events
  const [modalVisible, setModalVisible] = useState(false);
  const [isEmptyAlert, setIsEmptyAlert] = useState(true);

  /**
   * Trigger agent to fetch ALL alerts on initial load
   */
  useEffect(() => {
    // Retrieve locally if there is already data
    if (pendingAlerts && completedAlerts) {
      AgentTrigger.triggerRetrieveAlerts(FetchAlertsMode.ALL, true);
    }
    // fetchingAlertInfo will be true if the screen is navigated to for viewing a real-time alert.
    else if (!fetchingAlertInfo) {
      AgentTrigger.triggerRetrieveAlerts(FetchAlertsMode.ALL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [riskFilters]);

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
        <AdaptiveTwoScreenWrapper
          // Left side: List of alerts
          LeftComponent={
            <View style={styles.rowSelection}>
              <AlertListTabNavigator />
            </View>
          }
          // Right side: Alert details
          RightComponent={
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
                  subtitle={i18n.t("Alerts.NoSelection")}
                />
              )}
            </View>
          }
        />
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
