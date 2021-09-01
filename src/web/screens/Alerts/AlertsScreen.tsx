import React, { FC, useState, useEffect } from "react";
import { RootState, select, useDispatch } from "util/useRedux";
import { ScreenName } from "web/navigation";
import { View, Modal } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { ms, ScaledSheet } from "react-native-size-matters";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getTopTabBarOptions } from "util/getStyles";
import { AlertCurrentTab } from "./AlertCurrentTab";
import { AlertCompletedTab } from "./AlertCompletedTab";
import { NavigationContainer } from "@react-navigation/native";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";
import { AlertDetailsScreen } from "./AlertDetailsScreen";
import { MainScreenProps } from "web/navigation/types";
import { AgentTrigger } from "rc_agents/trigger";
import { AlertStatus } from "rc_agents/model";
import { AddTodoScreen } from "web/screens/Todo/modals/AddTodoScreen";
import { useToast } from "react-native-toast-notifications";
import {
  setProcedureSuccessful,
  setSubmittingTodo
} from "ic-redux/actions/agents/actionCreator";
import i18n from "util/language/i18n";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const AlertScreen: FC<MainScreenProps[ScreenName.ALERTS]> = () => {
  const {
    colors,
    fonts,
    procedureOngoing,
    procedureSuccessful,
    submittingTodo,
    fetchingAlertInfo,
    alertInfo
  } = select((state: RootState) => ({
    colors: state.settings.colors, // Used to detect completion of updateTodo procedure
    fonts: state.settings.fonts,
    procedureOngoing: state.agents.procedureOngoing,
    procedureSuccessful: state.agents.procedureSuccessful,
    submittingTodo: state.agents.submittingTodo,
    fetchingAlertInfo: state.agents.fetchingAlertInfo,
    alertInfo: state.agents.alertInfo
  }));

  /**
   * Trigger agent to fetch ALL alerts on initial load
   */
  useEffect(() => {
    AgentTrigger.triggerRetrieveAlerts(AlertStatus.ALL);
  }, []);

  const [isEmptyAlert, setEmptyAlert] = useState(true);

  // For pointer events
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

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
        <View style={styles.rowSelection}>
          <Tab.Navigator
            screenOptions={getTopTabBarOptions({
              colors: colors,
              fonts: fonts
            })}
          >
            <Tab.Screen name="Pending">
              {() => <AlertCurrentTab setEmptyAlert={setEmptyAlert} />}
            </Tab.Screen>
            <Tab.Screen name="Completed">
              {() => <AlertCompletedTab setEmptyAlert={setEmptyAlert} />}
            </Tab.Screen>
          </Tab.Navigator>
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
            <NavigationContainer independent>
              <Stack.Navigator>
                <Stack.Screen
                  name="ViewAlert"
                  options={() => ({
                    title: alertInfo?.patientName,
                    headerStyle: {
                      height: ms(45)
                    },
                    headerTitleStyle: {
                      fontWeight: "bold",
                      fontSize: ms(20),
                      paddingLeft: ms(15)
                    }
                  })}
                >
                  {() => (
                    <AlertDetailsScreen setModalVisible={setModalVisible} />
                  )}
                </Stack.Screen>
              </Stack.Navigator>
            </NavigationContainer>
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
