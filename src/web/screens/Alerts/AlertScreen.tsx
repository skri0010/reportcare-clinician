import React, { FC, useState, createContext, useEffect } from "react";
import { RootState, select, useDispatch } from "util/useRedux";
import { ScreenName, WithSideTabsProps } from "web/screens";
import { View, Text, Modal } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { ms, ScaledSheet } from "react-native-size-matters";
import {
  CardStyleInterpolators,
  createStackNavigator
} from "@react-navigation/stack";
import { RowSelectionTab } from "web/screens/RowSelectionTab";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getTopTabBarOptions } from "util/getStyles";
import { AlertCurrentTab } from "./AlertCurrentTab";
import { AlertCompletedTab } from "./AlertCompletedTab";
import { Alert } from "aws/API";
import { NavigationContainer } from "@react-navigation/native";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";
import { AlertDetailsScreen } from "./AlertDetailsScreen";
import { AddTodoScreen } from "web/screens/Todo/AddTodoScreen";
import { useToast } from "react-native-toast-notifications";
import {
  setProcedureSuccessful,
  setSubmittingTodo,
  setUpdatedTodo
} from "ic-redux/actions/agents/actionCreator";
import i18n from "util/language/i18n";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const AlertContext = createContext({
  id: "",
  patientName: "",
  patientID: "",
  summary: "",
  colorCode: "",
  vitalsReportID: "",
  symptomReportID: "",
  createdTimeDate: "",
  modifiedTimeDate: ""
});

export const AlertScreen: FC<WithSideTabsProps[ScreenName.ALERTS]> = () => {
  const { colors, procedureOngoing, procedureSuccessful, submittingTodo } =
    select((state: RootState) => ({
      colors: state.settings.colors, // Used to detect completion of updateTodo procedure
      procedureOngoing: state.agents.procedureOngoing,
      procedureSuccessful: state.agents.procedureSuccessful,
      submittingTodo: state.agents.submittingTodo
    }));

  const [alertSelected, setAlertSelected] = useState<Alert>({
    id: "",
    patientID: "",
    patientName: "",
    dateTime: "",
    summary: "",
    colorCode: "",
    vitalsReportID: "",
    symptomReportID: "",
    owner: "",
    _version: 0,
    _lastChangedAt: 0,
    createdAt: "",
    updatedAt: "",
    __typename: "Alert"
  });
  const [isEmptyAlert, setEmptyAlert] = useState(true);

  // For pointer events
  const [modalVisible, setModalVisible] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  function onRowClick(item: Alert) {
    const currentSelected = alertSelected;
    const emptyAlert: Alert = {
      id: "",
      patientID: "",
      patientName: "",
      dateTime: "",
      summary: "",
      colorCode: "",
      vitalsReportID: "",
      symptomReportID: "",
      owner: "",
      _version: 0,
      _lastChangedAt: 0,
      createdAt: "",
      updatedAt: "",
      __typename: "Alert"
    };
    if (currentSelected !== item && item !== emptyAlert) {
      setEmptyAlert(false);
      setAlertSelected(item);
    } else if (item === emptyAlert) {
      setEmptyAlert(true);
    }
  }

  const initialAlert = {
    id: alertSelected.id,
    patientName: alertSelected.patientName,
    patientID: alertSelected.patientID,
    vitalsReportID: alertSelected.vitalsReportID,
    symptomReportID: alertSelected.symptomReportID,
    summary: alertSelected.summary,
    colorCode: alertSelected.colorCode,
    createdTimeDate: alertSelected.createdAt,
    modifiedTimeDate: alertSelected.updatedAt
  };

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
          <RowSelectionTab title="Alerts" isTodo />
          <Tab.Navigator tabBarOptions={getTopTabBarOptions(colors)}>
            <Tab.Screen name="Pending">
              {() => <AlertCurrentTab setAlertSelected={onRowClick} />}
            </Tab.Screen>
            <Tab.Screen name="Completed">
              {() => <AlertCompletedTab setAlertSelected={onRowClick} />}
            </Tab.Screen>
          </Tab.Navigator>
        </View>
        <View
          style={{
            flex: 2,
            backgroundColor: colors.primaryWebBackgroundColor
          }}
        >
          {!isEmptyAlert ? (
            <NavigationContainer independent>
              <AlertContext.Provider value={initialAlert}>
                <Stack.Navigator>
                  <Stack.Screen
                    name="ViewAlert"
                    // component={AlertDetailsScreen}
                    options={() => ({
                      title: initialAlert.patientName,
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
              </AlertContext.Provider>
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
