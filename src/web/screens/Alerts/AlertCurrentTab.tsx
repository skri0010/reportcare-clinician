import React, { FC, useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { RootState, select } from "util/useRedux";
import { AlertRow } from "components/RowComponents/AlertRow";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import i18n from "util/language/i18n";
import { NoListItemMessage } from "../Shared/NoListItemMessage";
import { AlertRowTabProps } from "web/navigation/navigators/AlertListTabNavigator";
import { AlertListTabsProps } from "web/navigation/types";

interface AlertCurrentTabProps
  extends AlertRowTabProps,
    AlertListTabsProps.CurrentTabProps {}

export const AlertCurrentTab: FC<AlertCurrentTabProps> = ({
  displayedAlertInfoId,
  onRowPress
}) => {
  const { colors, pendingAlerts, fetchingPendingAlerts } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      pendingAlerts: state.alerts.pendingAlerts,
      fetchingPendingAlerts: state.alerts.fetchingPendingAlerts,
      alertRiskFilters: state.filters.alertRiskFilters
    })
  );

  const [noPendingAlertsNotice, setNoPendingAlertsNotice] =
    useState<string>("");

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

  return (
    <View style={{ flex: 1, backgroundColor: colors.primaryBackgroundColor }}>
      {/* Show no alerts message if no alert found */}
      {fetchingPendingAlerts ? (
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
