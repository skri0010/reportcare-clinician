/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { RootState, select, useDispatch } from "util/useRedux";
import { AlertListTabParamList } from "../paramLists";
import { AlertListTabName } from "../navigatorScreenNames";
import { AlertCurrentTab } from "web/screens/Alerts/AlertCurrentTab";
import { AlertCompletedTab } from "web/screens/Alerts/AlertCompletedTab";
import { getTopTabBarOptions } from "util/getStyles";
import { AlertListTabsProps } from "../types";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { RiskFilterPillList } from "components/Buttons/RiskFilterPillList";
import { AlertInfo } from "rc_agents/model";
import { AgentTrigger } from "rc_agents/trigger";
import { setAlertInfo } from "ic-redux/actions/agents/actionCreator";

const Tab = createMaterialTopTabNavigator<AlertListTabParamList>();
export interface AlertRowTabProps {
  displayedAlertInfoId?: string;
  onRowPress: (alert: AlertInfo) => void;
}

export const AlertListTabNavigator: FC = () => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const dispatch = useDispatch();

  // When the alert item is pressed, trigger the retrieval of alert info
  const onAlertRowPress = (alert: AlertInfo) => {
    dispatch(setAlertInfo(undefined));
    if (alert) {
      AgentTrigger.triggerRetrieveDetailedAlertInfo(alert);
    }
  };

  return (
    <>
      <SearchBarComponent
        onUserInput={() => {
          null;
        }}
        onSearchClick={() => {
          null;
        }}
        containerStyle={{
          backgroundColor: colors.primaryContrastTextColor
        }}
        placeholder="Search..."
      />

      {/* Filter for Pending Alerts */}
      <RiskFilterPillList alertScreen />
      <Tab.Navigator
        screenOptions={getTopTabBarOptions({
          colors: colors,
          fonts: fonts
        })}
      >
        {/* Current Alert List */}
        <Tab.Screen name={AlertListTabName.CURRENT}>
          {(props: AlertListTabsProps.CurrentTabProps) => (
            <AlertCurrentTab {...props} onRowPress={onAlertRowPress} />
          )}
        </Tab.Screen>
        {/* Completed Alert List */}
        <Tab.Screen name={AlertListTabName.COMPLETED}>
          {(props: AlertListTabsProps.CompletedTabProps) => (
            <AlertCompletedTab {...props} onRowPress={onAlertRowPress} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
};
