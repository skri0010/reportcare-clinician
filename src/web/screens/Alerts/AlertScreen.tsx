import React, { FC, useState, createContext, useEffect } from "react";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithSideTabsProps } from "web/screens";
import { View, Text } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { ms, ScaledSheet } from "react-native-size-matters";
import {
  CardStyleInterpolators,
  createStackNavigator
} from "@react-navigation/stack";
import { RowSelectionTab } from "../RowSelectionTab";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getTopTabBarOptions } from "util/getStyles";
import { AlertCurrentTab } from "./AlertCurrentTab";
import { AlertCompletedTab } from "./AlertCompletedTab";
import { Alert } from "aws/API";
import { NavigationContainer } from "@react-navigation/native";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";
import { AlertDetailsScreen } from "./AlertDetailsScreen";
import { AgentTrigger } from "rc_agents/trigger";
import { AlertInfo } from "rc_agents/model";
import { RiskLevel } from "models/RiskLevel";
import { LoadingIndicator } from "components/IndicatorComponents/LoadingIndicator";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export const AlertContext = createContext({
  id: "",
  patientId: "",
  patientName: "",
  dateTime: "",
  summary: "",
  completed: false,
  riskLevel: RiskLevel.UNASSIGNED,
  _version: 0
});

export const AlertScreen: FC<WithSideTabsProps[ScreenName.ALERTS]> = () => {
  const { colors, fetchingPendingAlerts, fetchingCompletedAlerts } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      fetchingPendingAlerts: state.agents.fetchingPendingAlerts,
      fetchingCompletedAlerts: state.agents.fetchingCompletedAlerts
    })
  );

  const [alertSelected, setAlertSelected] = useState<AlertInfo>({
    id: "",
    patientId: "",
    patientName: "",
    dateTime: "",
    summary: "",
    completed: false,
    riskLevel: RiskLevel.UNASSIGNED,
    _version: 0
  });

  const [isEmptyAlert, setEmptyAlert] = useState(true);

  function onRowClick(item: AlertInfo) {
    const currentSelected = alertSelected;
    const emptyAlert: AlertInfo = {
      id: "",
      patientId: "",
      patientName: "",
      dateTime: "",
      summary: "",
      completed: false,
      riskLevel: RiskLevel.UNASSIGNED,
      _version: 0
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
    patientId: alertSelected.patientId,
    summary: alertSelected.summary,
    riskLevel: alertSelected.riskLevel,
    _version: alertSelected._version,
    dateTime: alertSelected.dateTime,
    completed: alertSelected.completed
  };

  return (
    <ScreenWrapper fixed>
      <View style={styles.container}>
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
                    component={AlertDetailsScreen}
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
                  />
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
