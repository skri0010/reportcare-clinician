import React, { FC, useState } from "react";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithSideTabsProps } from "web/screens";
import { View, Text } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { ScaledSheet } from "react-native-size-matters";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { RowSelectionWrapper } from "../RowSelectionTab";
import i18n from "util/language/i18n";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getTopTabBarOptions } from "util/getStyles";
import { AlertCurrentTab } from "./AlertCurrentTab";
import { AlertCompletedTab } from "./AlertCompletedTab";
import { Alert } from "aws/API";
import { NavigationContainer } from "@react-navigation/native";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();


export const AlertScreen: FC<WithSideTabsProps[ScreenName.ALERTS]> = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
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
  return (
    <ScreenWrapper fixed>
      <View
      style={styles.container}>
        <View style={styles.rowSelection}>
          <RowSelectionWrapper
          title="Alerts"
          isTodo
          />
        <Tab.Navigator tabBarOptions={getTopTabBarOptions(colors)}>
          <Tab.Screen
            name="Pending"
            >
              {() => <AlertCurrentTab setAlertSelected={onRowClick}/>}
            </Tab.Screen>
            <Tab.Screen
            name="Completed"
            >
              {() => <AlertCompletedTab setAlertSelected={onRowClick}/>}
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
              <Text> Chosen one! </Text>
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