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
import { setAlertInfo } from "ic-redux/actions/agents/actionCreator";
import { AgentTrigger } from "rc_agents/trigger";
import { Alert } from "react-native";
import Fuse from "fuse.js";

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
      completedAlerts: state.agents.completedAlerts,
      pendingAlerts: state.agents.pendingAlerts
    })
  );

  const dispatch = useDispatch();
  const [pending, setPending] = useState<boolean>(true);
  const [searching, setSearching] = useState<boolean>(false);
  const [searchedSubset, setSubset] = useState<AlertInfo[]>([]);

  // When the alert item is pressed, trigger the retrieval of alert info
  const onAlertRowPress = (alert: AlertInfo) => {
    if (alert) {
      dispatch(setAlertInfo(alert));
      AgentTrigger.triggerRetrieveDetailedAlertInfo(alert);
      setIsEmptyAlert(false);
    }
  };

  return (
    <>
      <SearchBarComponent
        onUserInput={() => {
          null;
        }}
        onSearchClick={(searchString: string) => {
          if (searchString.length === 0) {
            setSearching(false);
          } else if (pendingAlerts || completedAlerts) {
            const options = {
              includeScore: true,
              keys: ["patientName"]
            };
            const searchingAlerts = pending ? pendingAlerts : completedAlerts;
            if (searchingAlerts) {
              const fuse = new Fuse(searchingAlerts, options);

              const result = fuse.search(searchString);
              const searchResults: AlertInfo[] = [];
              result.forEach((item) => searchResults.push(item.item));
              setSearching(true);
              setSubset(searchResults);
            }
          }
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
