import React, { FC, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { RootState, select, useDispatch } from "util/useRedux";
import { AlertRow } from "components/RowComponents/AlertRow";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import i18n from "util/language/i18n";
import { NoListItemMessage } from "../Shared/NoListItemMessage";
import { AlertListTabsProps } from "web/navigation/types";
import { AlertRowTabProps } from "web/navigation/navigators/AlertListTabNavigator";
import { AlertInfo } from "rc_agents/model";
import {
  setPendingTab,
  setSearchedAlerts,
  setSearchingAlerts
} from "ic-redux/actions/agents/actionCreator";

interface AlertCompletedTabProps
  extends AlertRowTabProps,
    AlertListTabsProps.CompletedTabProps {}

export const AlertCompletedTab: FC<AlertCompletedTabProps> = ({
  displayedAlertInfoId,
  onRowPress
}) => {
  const {
    colors,
    completedAlerts,
    fetchingCompletedAlerts,
    searching,
    searchedAlerts
  } = select((state: RootState) => ({
    colors: state.settings.colors,
    completedAlerts: state.agents.completedAlerts,
    fetchingCompletedAlerts: state.agents.fetchingCompletedAlerts,
    searching: state.agents.searchingAlerts,
    searchedAlerts: state.agents.searchedAlerts
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPendingTab(false));
    dispatch(setSearchedAlerts(undefined));
    dispatch(setSearchingAlerts(false));
  }, []);

  const [noCompletedAlertsNotice, setNoCompletedAlertsNotice] =
    useState<string>("");

  const [isSearching, setIsSearching] = useState<boolean>(searching);
  const [searchResults, setSearchResult] = useState<AlertInfo[] | undefined>(
    searchedAlerts
  );

  // Prepare text notice to be displayed after fetching patients
  useEffect(() => {
    if (fetchingCompletedAlerts) {
      if (completedAlerts) {
        // No patients found
        setNoCompletedAlertsNotice(
          i18n.t("Alerts.AlertList.NoCompletedAlerts")
        );
      } else {
        // Could not fetch patients
        setNoCompletedAlertsNotice(
          i18n.t("Internet_Connection.FailedToRetrieveNotice")
        );
      }
    }
  }, [completedAlerts, fetchingCompletedAlerts]);

  useEffect(() => {
    setIsSearching(searching);
    setSearchResult(searchedAlerts);
  }, [searching, searchedAlerts]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.primaryBackgroundColor }}>
      {/* Show loading if alerts is still being fetched */}
      {fetchingCompletedAlerts ? (
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
          keyExtractor={(item) => item.id}
        />
      ) : completedAlerts && completedAlerts.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={completedAlerts}
          renderItem={({ item }) => (
            <AlertRow
              alertDetails={item}
              onCardPress={() => onRowPress(item)}
              selected={displayedAlertInfoId === item.id}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <NoListItemMessage screenMessage={noCompletedAlertsNotice} />
      )}
    </View>
  );
};
