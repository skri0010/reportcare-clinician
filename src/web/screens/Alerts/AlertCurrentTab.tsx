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
import { NoItemsTextIndicator } from "components/Indicators/NoItemsTextIndicator";

interface AlertCurrentTabProps
  extends AlertRowTabProps,
    AlertListTabsProps.CurrentTabProps {}

export const AlertCurrentTab: FC<AlertCurrentTabProps> = ({
  displayedAlertInfoId,
  onRowPress,
  currentSearched
}) => {
  const { colors, fetchingPendingAlerts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fetchingPendingAlerts: state.alerts.fetchingPendingAlerts
  }));

  const [noPendingAlertsNotice, setNoPendingAlertsNotice] =
    useState<string>("");

  // Prepare text notice to be displayed after fetching patients
  useEffect(() => {
    if (fetchingPendingAlerts) {
      if (currentSearched) {
        // No patients found
        setNoPendingAlertsNotice(i18n.t("Alerts.AlertList.NoPendingAlerts"));
      } else {
        // Could not fetch patients
        setNoPendingAlertsNotice(
          i18n.t("Internet_Connection.FailedToRetrieveNotice")
        );
      }
    }
  }, [currentSearched, fetchingPendingAlerts]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.primaryBackgroundColor }}>
      {/* Show no alerts message if no alert found */}
      {fetchingPendingAlerts ? (
        // Show loading indicator if fetching patients
        <LoadingIndicator flex={1} />
      ) : currentSearched ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator />}
          ListEmptyComponent={() => (
            <NoItemsTextIndicator
              text={i18n.t("Alerts.AlertList.NoPendingAlerts")}
            />
          )}
          data={currentSearched}
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
        <NoListItemMessage screenMessage={noPendingAlertsNotice} />
      )}
    </View>
  );
};
