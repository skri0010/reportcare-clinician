import React, { FC, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { RootState, select } from "util/useRedux";
import { AlertRow } from "components/RowComponents/AlertRow";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import i18n from "util/language/i18n";
import { NoListItemMessage } from "../Shared/NoListItemMessage";
import { AlertListTabsProps } from "web/navigation/types";
import { AlertRowTabProps } from "web/navigation/navigators/AlertListTabNavigator";
import { NoItemsTextIndicator } from "components/Indicators/NoItemsTextIndicator";

interface AlertCompletedTabProps
  extends AlertRowTabProps,
    AlertListTabsProps.CompletedTabProps {}

export const AlertCompletedTab: FC<AlertCompletedTabProps> = ({
  displayedAlertInfoId,
  onRowPress,
  completedSearched
}) => {
  const { colors, fetchingCompletedAlerts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fetchingCompletedAlerts: state.alerts.fetchingCompletedAlerts
  }));

  const [noCompletedAlertsNotice, setNoCompletedAlertsNotice] =
    useState<string>("");

  // Prepare text notice to be displayed after fetching patients
  useEffect(() => {
    if (fetchingCompletedAlerts) {
      if (completedSearched) {
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
  }, [completedSearched, fetchingCompletedAlerts]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.primaryBackgroundColor }}>
      {/* Show loading if alerts is still being fetched */}
      {fetchingCompletedAlerts ? (
        <LoadingIndicator flex={1} />
      ) : completedSearched ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={completedSearched}
          ListEmptyComponent={() => (
            <NoItemsTextIndicator
              text={i18n.t("Alerts.AlertList.NoCompletedAlerts")}
            />
          )}
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
