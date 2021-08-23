import React, { FC, useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { RootState, select } from "util/useRedux";
import { AlertRow } from "components/RowComponents/AlertRow";
import { AlertRowTabProps } from "./AlertCurrentTab";
import { ScreenWrapper } from "../ScreenWrapper";
import { RiskFilterPillList } from "web/RiskFilterPillList";
import { AlertInfo, AlertStatus } from "rc_agents/model";
import { LoadingIndicator } from "components/IndicatorComponents/LoadingIndicator";
import { H5 } from "components/Text";
import { ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { AgentTrigger } from "rc_agents/trigger";

export const AlertCompletedTab: FC<AlertRowTabProps> = ({
  setAlertSelected
}) => {
  const { colors, completedAlerts, fetchingCompletedAlerts } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      completedAlerts: state.agents.completedAlerts,
      fetchingCompletedAlerts: state.agents.fetchingCompletedAlerts
    })
  );

  const [noCompletedAlertsNotice, setNoCompletedAlertsNotice] =
    useState<string>("");

  /**
   * Trigger agent to fetch pending alerts on initial load
   */
  useEffect(() => {
    // AgentTrigger.triggerRetriveAlerts(AlertStatus.COMPLETED);
  }, []);

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

  function onCardPress(item: AlertInfo) {
    setAlertSelected(item);
  }

  return (
    <ScreenWrapper style={{ backgroundColor: colors.primaryBackgroundColor }}>
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
        <View style={styles.noAlertsContainer}>
          <H5 text={noCompletedAlertsNotice} style={styles.noAlertsText} />
        </View>
      )}
    </ScreenWrapper>
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
