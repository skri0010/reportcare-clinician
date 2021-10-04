import React, { FC, useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { RootState, select, useDispatch } from "util/useRedux";
import { AlertRow } from "components/RowComponents/AlertRow";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import i18n from "util/language/i18n";
import { NoListItemMessage } from "../Shared/NoListItemMessage";
import { AlertRowTabProps } from "web/navigation/navigators/AlertListTabNavigator";
import { AlertListTabsProps } from "web/navigation/types";
import { AlertInfo } from "rc_agents/model";
import {
  setPendingTab,
  setSearchedAlerts,
  setSearchingAlerts
} from "ic-redux/actions/agents/actionCreator";

interface AlertCurrentTabProps
  extends AlertRowTabProps,
    AlertListTabsProps.CurrentTabProps {}

export const AlertCurrentTab: FC<AlertCurrentTabProps> = ({
  displayedAlertInfoId,
  onRowPress
}) => {
  const {
    colors,
    pendingAlerts,
    fetchingPendingAlerts,
    searching,
    searchedAlerts
  } = select((state: RootState) => ({
    colors: state.settings.colors,
    pendingAlerts: state.agents.pendingAlerts,
    fetchingPendingAlerts: state.agents.fetchingPendingAlerts,
    alertRiskFilters: state.agents.alertRiskFilters,
    searching: state.agents.searchingAlerts,
    searchedAlerts: state.agents.searchedAlerts
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPendingTab(true));
    dispatch(setSearchedAlerts(undefined));
    dispatch(setSearchingAlerts(false));
  }, []);

  const [noPendingAlertsNotice, setNoPendingAlertsNotice] =
    useState<string>("");

  const [searchResults, setSearchResult] = useState<AlertInfo[] | undefined>(
    searchedAlerts
  );

  const [isSearching, setIsSearching] = useState<boolean>(searching);
  // Prepare text notice to be displayed after fetching patients
  useEffect(() => {
    if (fetchingPendingAlerts) {
      if (pendingAlerts) {
        // No patients found
        setNoPendingAlertsNotice(i18n.t("Alerts.AlertList.NoPendingAlerts"));
      } else {
        // Could not fetch patients
        setNoPendingAlertsNotice(
          i18n.t("Internet_Connection.FailedToRetrieveNotice")
        );
      }
    }
  }, [pendingAlerts, fetchingPendingAlerts]);

  useEffect(() => {
    setIsSearching(searching);
    setSearchResult(searchedAlerts);
  }, [searching, searchedAlerts]);

  const setPendingTab2 = () => {
    dispatch(setPendingTab(true));
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.primaryContrastTextColor }}>
      {setPendingTab2}
      {/* Show no alerts message if no alert found */}
      {fetchingPendingAlerts ? (
        // Show loading indicator if fetching patients
        <LoadingIndicator flex={1} />
      ) : isSearching ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={searchResults}
          renderItem={({ item }) => (
            <AlertRow
              alertDetails={item}
              onCardPress={() => onRowPress(item)}
              selected={displayedAlertInfoId === item.id}
            />
          )}
        />
      ) : pendingAlerts && pendingAlerts.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={pendingAlerts}
          renderItem={({ item }) => (
            <AlertRow
              alertDetails={item}
              onCardPress={() => onRowPress(item)}
              selected={displayedAlertInfoId === item.id}
            />
          )}
        />
      ) : (
        <NoListItemMessage screenMessage={noPendingAlertsNotice} />
      )}
    </View>
  );
};
