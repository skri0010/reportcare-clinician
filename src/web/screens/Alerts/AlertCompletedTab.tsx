import React, { FC, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { RootState, select } from "util/useRedux";
import { AlertRow } from "components/RowComponents/AlertRow";
import { AlertRowTabProps } from "./AlertCurrentTab";
import { RiskFilterPillList } from "components/Buttons/RiskFilterPillList";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import i18n from "util/language/i18n";
import { NoListItemMessage } from "../Shared/NoListItemMessage";
import { AgentTrigger } from "rc_agents/trigger";
import { AlertInfo } from "rc_agents/model";

export const AlertCompletedTab: FC<AlertRowTabProps> = ({ setEmptyAlert }) => {
  const { colors, completedAlerts, fetchingCompletedAlerts } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      completedAlerts: state.agents.completedAlerts,
      fetchingCompletedAlerts: state.agents.fetchingCompletedAlerts
    })
  );

  const [noCompletedAlertsNotice, setNoCompletedAlertsNotice] =
    useState<string>("");

  // Trigger the retrieval of alert info when the alert item is selected
  function onCardPress(item: AlertInfo) {
    AgentTrigger.triggerRetrieveAlertInfo(item);
    setEmptyAlert(false);
  }

  // Prepare text notice to be displayed after fetching patients
  useEffect(() => {
    if (fetchingCompletedAlerts) {
      if (completedAlerts) {
        // No patients found
        setNoCompletedAlertsNotice(i18n.t("Alert.AlertList.NoCompletedAlerts"));
      } else {
        // Could not fetch patients
        setNoCompletedAlertsNotice(
          i18n.t("Internet_Connection.FailedToRetrieveNotice")
        );
      }
    }
  }, [completedAlerts, fetchingCompletedAlerts]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.primaryBackgroundColor }}>
      <SearchBarComponent
        onSearchClick={() => {
          null;
        }}
        onUserInput={() => {
          null;
        }}
        containerStyle={{ backgroundColor: colors.primaryContrastTextColor }}
        placeholder="Search..."
      />

      {/* Filter for Completed Alerts */}
      <RiskFilterPillList alertScreen />

      {/* Show loading if alerts is still being fetched */}
      {fetchingCompletedAlerts ? (
        <LoadingIndicator flex={1} />
      ) : completedAlerts && completedAlerts.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={completedAlerts}
          renderItem={({ item }) => (
            <AlertRow
              alertDetails={item}
              onCardPress={() => onCardPress(item)}
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
