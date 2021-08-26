import React, { FC, useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { RootState, select } from "util/useRedux";
import { AlertRow } from "components/RowComponents/AlertRow";
import { RiskFilterPillList } from "web/RiskFilterPillList";
import { AlertInfo } from "rc_agents/model";
import { LoadingIndicator } from "components/IndicatorComponents/LoadingIndicator";
import i18n from "util/language/i18n";
import { NoListItemMessage } from "../Shared/NoListItemMessage";
import { AgentTrigger } from "rc_agents/trigger";

export interface AlertRowTabProps {
  setEmptyAlert: (state: boolean) => void;
}

export const AlertCurrentTab: FC<AlertRowTabProps> = ({ setEmptyAlert }) => {
  const { colors, pendingAlerts, fetchingPendingAlerts, fetchingAlerts } =
    select((state: RootState) => ({
      colors: state.settings.colors,
      pendingAlerts: state.agents.pendingAlerts,
      fetchingPendingAlerts: state.agents.fetchingPendingAlerts,
      alertRiskFilters: state.agents.alertRiskFilters,
      fetchingAlerts: state.agents.fetchingAlerts
    }));

  const [noPendingAlertsNotice, setNoPendingAlertsNotice] =
    useState<string>("");

  // Prepare text notice to be displayed after fetching patients
  useEffect(() => {
    if (fetchingPendingAlerts || fetchingAlerts) {
      if (pendingAlerts) {
        // No patients found
        setNoPendingAlertsNotice(i18n.t("Alert.AlertList.NoPendingAlerts"));
      } else {
        // Could not fetch patients
        setNoPendingAlertsNotice(
          i18n.t("Internet_Connection.FailedToRetrieveNotice")
        );
      }
    }
  }, [pendingAlerts, fetchingPendingAlerts, fetchingAlerts]);

  // When the alert item is pressed, trigger the retrieval of alert info
  function onCardPress(item: AlertInfo) {
    AgentTrigger.triggerRetrieveAlertInfo(item);
    setEmptyAlert(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.primaryBackgroundColor }}>
      <SearchBarComponent
        onUserInput={() => {
          null;
        }}
        onSearchClick={() => {
          null;
        }}
        containerStyle={{ backgroundColor: colors.primaryContrastTextColor }}
        placeholder="Search..."
      />

      {/* Filter for Pending Alerts */}
      <RiskFilterPillList alertScreen />

      {/* Show no alerts message if no alert found */}
      {fetchingPendingAlerts || fetchingAlerts ? (
        // Show loading indicator if fetching patients
        <LoadingIndicator flex={1} />
      ) : pendingAlerts && pendingAlerts.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={pendingAlerts}
          renderItem={({ item }) => (
            <AlertRow
              alertDetails={item}
              onCardPress={() => onCardPress(item)}
            />
          )}
        />
      ) : (
        <NoListItemMessage screenMessage={noPendingAlertsNotice} />
      )}
    </View>
  );
};
