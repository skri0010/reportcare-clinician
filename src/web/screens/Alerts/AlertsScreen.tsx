import React, { FC, useState, useEffect } from "react";
import { RootState, select, useDispatch } from "util/useRedux";
import { ScreenName } from "web/navigation";
import { View, Modal } from "react-native";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { ScaledSheet } from "react-native-size-matters";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";
import { MainScreenProps } from "web/navigation/types";
import { AgentTrigger } from "rc_agents/trigger";
import { FetchAlertsMode } from "rc_agents/model";
import { AddTodoScreen } from "web/screens/Todo/modals/AddTodoScreen";
import { useToast } from "react-native-toast-notifications";
import i18n from "util/language/i18n";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { AlertListTabNavigator } from "web/navigation/navigators/AlertListTabNavigator";
import { AlertDetailsScreen } from "./AlertDetailsScreen";
import { setProcedureSuccessful } from "ic-redux/actions/agents/procedureActionCreator";
import { setSubmittingTodo } from "ic-redux/actions/agents/todoActionCreator";
import { AdaptiveTwoScreenWrapper } from "components/Wrappers/AdaptiveTwoScreenWrapper";

export const AlertScreen: FC<MainScreenProps[ScreenName.ALERTS]> = () => {
  const {
    colors,
    procedureOngoing,
    procedureSuccessful,
    submittingTodo,
    fetchingAlertInfo
  } = select((state: RootState) => ({
    colors: state.settings.colors, // Used to detect completion of updateTodo procedure
    procedureOngoing: state.procedures.procedureOngoing,
    procedureSuccessful: state.procedures.procedureSuccessful,
    submittingTodo: state.todos.submittingTodo,
    fetchingAlertInfo: state.alerts.fetchingAlertInfo,
    alertInfo: state.alerts.alertInfo
  }));

  // For pointer events
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  /**
   * Trigger agent to fetch ALL alerts on initial load
   */
  useEffect(() => {
    AgentTrigger.triggerRetrieveAlerts(FetchAlertsMode.ALL);
  }, []);

  const [isEmptyAlert, setIsEmptyAlert] = useState(true);

  // Detects completion of UpdateTodo procedure and shows the appropriate toast.
  useEffect(() => {
    if (submittingTodo && !procedureOngoing) {
      dispatch(setSubmittingTodo(false));
      if (procedureSuccessful) {
        // Operation successful
        toast.show(i18n.t("Todo.TodoUpdateSuccessful"), { type: "success" });
        dispatch(setProcedureSuccessful(false));
      } else {
        // Operation failed
        toast.show(i18n.t("UnexpectedError"), { type: "danger" });
      }
    }
  }, [dispatch, procedureOngoing, procedureSuccessful, toast, submittingTodo]);

  return (
    <ScreenWrapper fixed>
      <View
        style={styles.container}
        pointerEvents={modalVisible || submittingTodo ? "none" : "auto"}
      >
        <AdaptiveTwoScreenWrapper
          // Left side: List of todos
          LeftComponent={
            <View style={styles.rowSelection}>
              <AlertListTabNavigator setIsEmptyAlert={setIsEmptyAlert} />
            </View>
          }
          // Right side: Todo details
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
                  subtitle="Choose Alert to view more info"
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
