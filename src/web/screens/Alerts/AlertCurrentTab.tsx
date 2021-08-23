import React, { FC, useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { RootState, select } from "util/useRedux";
import { AlertRow } from "components/RowComponents/AlertRow";
import { RiskFilterPillList } from "web/RiskFilterPillList";
import { AlertInfo, AlertStatus } from "rc_agents/model";
import { LoadingIndicator } from "components/IndicatorComponents/LoadingIndicator";
import { ScaledSheet } from "react-native-size-matters";
import { H5 } from "components/Text";
import i18n from "util/language/i18n";
import { AgentTrigger } from "rc_agents/trigger";

export interface AlertRowTabProps {
  setAlertSelected: (item: AlertInfo) => void;
}
export const AlertCurrentTab: FC<AlertRowTabProps> = ({ setAlertSelected }) => {
  const { colors, pendingAlerts, fetchingPendingAlerts } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      pendingAlerts: state.agents.pendingAlerts,
      fetchingPendingAlerts: state.agents.fetchingPendingAlerts
    })
  );

  const [noPendingAlertsNotice, setNoPendingAlertsNotice] =
    useState<string>("");

  /**
   * Trigger agent to fetch pending alerts on initial load
   */
  useEffect(() => {
    AgentTrigger.triggerRetriveAlerts(AlertStatus.PENDING);
  }, []);

  // Prepare text notice to be displayed after fetching patients
  useEffect(() => {
    if (fetchingPendingAlerts) {
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
  }, [pendingAlerts, fetchingPendingAlerts]);

  function onCardPress(item: AlertInfo) {
    setAlertSelected(item);
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
      <RiskFilterPillList alertScreen pendingAlert />

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
              onCardPress={() => onCardPress(item)}
            />
          )}
        />
      ) : (
        <View style={styles.noAlertsContainer}>
          <H5 text={noPendingAlertsNotice} style={styles.noAlertsText} />
        </View>
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  noAlertsContainer: {
    flex: 1,
    paddingTop: "10@ms",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: "30@ms"
  },
  noAlertsText: {
    textAlign: "center"
  }
});
