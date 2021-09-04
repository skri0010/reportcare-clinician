/* eslint-disable react/jsx-props-no-spreading */
import React, { Dispatch, FC, SetStateAction } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RootState, select } from "util/useRedux";
import { AlertListTabParamList } from "../paramLists";
import { AlertListTabName } from "../navigatorScreenNames";
import { AlertCurrentTab } from "web/screens/Alerts/AlertCurrentTab";
import { AlertCompletedTab } from "web/screens/Alerts/AlertCompletedTab";
import { getTopTabBarOptions } from "util/getStyles";
import { AlertListTabsProps } from "../types";

const Tab = createMaterialTopTabNavigator<AlertListTabParamList>();

interface AlertListTabNavigatorProps {
  setEmptyAlert: Dispatch<SetStateAction<boolean>>;
}

export interface AlertRowTabProps {
  setEmptyAlert: (state: boolean) => void;
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
      {/* Current Alert List */}
      <Tab.Screen name={AlertListTabName.CURRENT}>
        {(props: AlertListTabsProps.CurrentTabProps) => (
          <AlertCurrentTab {...props} setEmptyAlert={setEmptyAlert} />
        )}
      </Tab.Screen>
      {/* Completed Alert List */}
      <Tab.Screen name={AlertListTabName.COMPLETED}>
        {(props: AlertListTabsProps.CompletedTabProps) => (
          <AlertCompletedTab {...props} setEmptyAlert={setEmptyAlert} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
