/* eslint-disable react/jsx-props-no-spreading */
import React, { FC, useEffect, useState } from "react";
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
import { AlertInfo, FetchAlertsMode, Role } from "rc_agents/model";
import { AgentTrigger } from "rc_agents/trigger";
import Fuse from "fuse.js";
import i18n from "util/language/i18n";
import {
  setAlertInfo,
  setViewStableAlerts
} from "ic-redux/actions/agents/actionCreator";
import { FloatingBottomButton } from "components/Buttons/FloatingBottomButton";
import { LocalStorage } from "rc_agents/storage";

const Tab = createMaterialTopTabNavigator<AlertListTabParamList>();

export interface AlertRowTabProps {
  displayedAlertInfoId?: string;
  onRowPress: (alert: AlertInfo) => void;
}

export const AlertListTabNavigator: FC = () => {
  const { colors, fonts, completedAlerts, pendingAlerts, viewStableAlerts } =
    select((state: RootState) => ({
      colors: state.settings.colors,
      fonts: state.settings.fonts,
      completedAlerts: state.agents.completedAlerts,
      pendingAlerts: state.agents.pendingAlerts,
      viewStableAlerts: state.agents.viewStableAlerts
    }));

  const dispatch = useDispatch();

  // When the alert item is pressed, trigger the retrieval of alert info
  const onAlertRowPress = (alert: AlertInfo) => {
    dispatch(setAlertInfo(undefined));
    if (alert) {
      AgentTrigger.triggerRetrieveDetailedAlertInfo(alert);
    }
  };

  const [searching, setSearching] = useState<boolean>(false);
  const [pendingResult, setPendingResult] = useState<AlertInfo[]>([]);
  const [completedResult, setCompletedResult] = useState<AlertInfo[]>([]);
  const [showViewStableAlerts, setShowViewStableAlerts] = useState(false); // Whether view stable alerts button is to be shown
  const [stableAlertsTitle, setStableAlertsTitle] = useState("");

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

  // Checks for clinician's role to determine whether view stable alerts button should be shown
  useEffect(() => {
    const checkClinicianRole = async () => {
      const clinician = await LocalStorage.getClinician();
      if (clinician) {
        if (
          clinician.role === Role.EP ||
          clinician.role === Role.HF_SPECIALIST
        ) {
          setShowViewStableAlerts(true);
        }
      }
    };
    checkClinicianRole();
  }, []);

  // Toggle label of stable alerts button
  useEffect(() => {
    if (showViewStableAlerts) {
      if (viewStableAlerts) {
        setStableAlertsTitle(i18n.t("Alerts.HideStableAlerts"));
      } else {
        setStableAlertsTitle(i18n.t("Alerts.ViewStableAlerts"));
      }
    }
  }, [showViewStableAlerts, viewStableAlerts]);

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
        <Tab.Screen name={AlertListTabName.CURRENT}>
          {(props: AlertListTabsProps.CurrentTabProps) => (
            <AlertCurrentTab
              {...props}
              onRowPress={onAlertRowPress}
              currentSearched={searching ? pendingResult : pendingAlerts}
            />
          )}
        </Tab.Screen>
        {/* Completed Alert List */}
        <Tab.Screen name={AlertListTabName.COMPLETED}>
          {(props: AlertListTabsProps.CompletedTabProps) => (
            <AlertCompletedTab
              {...props}
              onRowPress={onAlertRowPress}
              completedSearched={searching ? completedResult : completedAlerts}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
      {showViewStableAlerts && (
        <FloatingBottomButton
          title={stableAlertsTitle}
          onPress={() => {
            dispatch(setViewStableAlerts(!viewStableAlerts));
            AgentTrigger.triggerRetrieveAlerts(FetchAlertsMode.ALL);
          }}
        />
      )}
    </>
  );
};
