import React, { FC, useState, createContext } from "react";
import { RootState, select } from "util/useRedux";
import { ScreenName } from "web/navigation";
import { View } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { ms, ScaledSheet } from "react-native-size-matters";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getTopTabBarOptions } from "util/getStyles";
import { AlertCurrentTab } from "./AlertCurrentTab";
import { AlertCompletedTab } from "./AlertCompletedTab";
import { Alert } from "aws/API";
import { NavigationContainer } from "@react-navigation/native";
import { NoSelectionScreen } from "../Shared/NoSelectionScreen";
import { AlertDetailsScreen } from "./AlertDetailsScreen";
import { MainScreenProps } from "web/navigation/types";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
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

export const AlertsScreen: FC<MainScreenProps[ScreenName.ALERTS]> = () => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
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

  return (
    <ScreenWrapper fixed>
      <View style={styles.container}>
        <View style={styles.rowSelection}>
          <SearchBarComponent
            onUserInput={() => {
              null;
            }}
            containerStyle={{
              backgroundColor: colors.primaryContrastTextColor
            }}
            placeholder={i18n.t("Alerts.SearchBarPlaceholder")}
          />
          <Tab.Navigator
            screenOptions={getTopTabBarOptions({
              colors: colors,
              fonts: fonts
            })}
          >
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
