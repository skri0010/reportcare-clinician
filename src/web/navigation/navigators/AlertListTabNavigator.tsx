/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useState } from "react";
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
import { setAlertInfo } from "ic-redux/actions/agents/alertActionCreator";
import Fuse from "fuse.js";
import i18n from "util/language/i18n";

const Tab = createMaterialTopTabNavigator<AlertListTabParamList>();

interface AlertListTabNavigatorProps {
  setIsEmptyAlert: (isEmptyAlert: boolean) => void;
}

export interface AlertRowTabProps {
  displayedAlertInfoId?: string;
  onRowPress: (alert: AlertInfo) => void;
}

export const AlertListTabNavigator: FC<AlertListTabNavigatorProps> = ({
  setIsEmptyAlert
}) => {
  const { colors, fonts, completedAlerts, pendingAlerts } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      fonts: state.settings.fonts,
      completedAlerts: state.alerts.completedAlerts,
      pendingAlerts: state.alerts.pendingAlerts
    })
  );

  const dispatch = useDispatch();

  // When the alert item is pressed, trigger the retrieval of alert info
  const onAlertRowPress = (alert: AlertInfo) => {
    if (alert) {
      dispatch(setAlertInfo(alert));
      AgentTrigger.triggerRetrieveDetailedAlertInfo(alert);
      setIsEmptyAlert(false);
    }
  };

  const [searching, setSearching] = useState<boolean>(false);
  const [pendingResult, setPendingResult] = useState<AlertInfo[]>([]);
  const [completedResult, setCompletedResult] = useState<AlertInfo[]>([]);

  const onSearchClick = (searchString: string) => {
    if (searchString.length === 0) {
      setSearching(false);
    } else if (pendingAlerts || completedAlerts) {
      setSearching(true);
      const options = {
        includeScore: true,
        keys: ["patientName"]
      };

      if (pendingAlerts) {
        const fuse = new Fuse(pendingAlerts, options);
        const result = fuse.search(searchString);
        const searchPendingResults: AlertInfo[] = [];
        result.forEach((item) => searchPendingResults.push(item.item));
        setPendingResult(searchPendingResults);
      }

      if (completedAlerts) {
        const fuse = new Fuse(completedAlerts, options);
        const result = fuse.search(searchString);
        const searchCompletedResults: AlertInfo[] = [];
        result.forEach((item) => searchCompletedResults.push(item.item));
        setCompletedResult(searchCompletedResults);
      }
    }
  };

  return (
    <>
      <SearchBarComponent
        onUserInput={(searchString) => onSearchClick(searchString)}
        onSearchClick={(searchString) => onSearchClick(searchString)}
        containerStyle={{
          backgroundColor: colors.primaryContrastTextColor
        }}
        placeholder={i18n.t("Alerts.SearchBarPlaceholder")}
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
        <Tab.Screen
          name={AlertListTabName.CURRENT}
          options={{ title: i18n.t("Alerts.Current") }}
        >
          {(props: AlertListTabsProps.CurrentTabProps) => (
            <AlertCurrentTab
              {...props}
              onRowPress={onAlertRowPress}
              currentSearched={searching ? pendingResult : pendingAlerts}
            />
          )}
        </Tab.Screen>
        {/* Completed Alert List */}
        <Tab.Screen
          name={AlertListTabName.COMPLETED}
          options={{ title: i18n.t("Alerts.Completed") }}
        >
          {(props: AlertListTabsProps.CompletedTabProps) => (
            <AlertCompletedTab
              {...props}
              onRowPress={onAlertRowPress}
              completedSearched={searching ? completedResult : completedAlerts}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
};
