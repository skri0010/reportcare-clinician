/* eslint-disable react/jsx-props-no-spreading */
import React, { Dispatch, FC, SetStateAction } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RootState, select } from "util/useRedux";
import { AlertListTabParamList } from "../paramLists";
import { AlertListTabName } from "../navigatorScreenNames";
import { AlertCurrentTab } from "web/screens/Alerts/AlertCurrentTab";
import { AlertCompletedTab } from "web/screens/Alerts/AlertCompletedTab";
import { getTopTabBarOptions } from "util/getStyles";

const Tab = createMaterialTopTabNavigator<AlertListTabParamList>();

interface AlertListTabNavigatorProps {
  setEmptyAlert: Dispatch<SetStateAction<boolean>>;
}

export const AlertListTabNavigator: FC<AlertListTabNavigatorProps> = ({
  setEmptyAlert
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  return (
    <Tab.Navigator
      screenOptions={getTopTabBarOptions({
        colors: colors,
        fonts: fonts
      })}
    >
      <Tab.Screen name={AlertListTabName.CURRENT}>
        {() => <AlertCurrentTab setEmptyAlert={setEmptyAlert} />}
      </Tab.Screen>
      <Tab.Screen name={AlertListTabName.COMPLETED}>
        {() => <AlertCompletedTab setEmptyAlert={setEmptyAlert} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
