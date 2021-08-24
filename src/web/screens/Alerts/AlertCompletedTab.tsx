import React, { FC } from "react";
import { FlatList } from "react-native";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { RootState, select } from "util/useRedux";
import { Alert } from "aws/API";
import { mockCompletedAlerts } from "mock/mockAlerts";
import { AlertRow } from "components/RowComponents/AlertRow";
import { AlertRowTabProps } from "./AlertCurrentTab";
import { ScreenWrapper } from "../ScreenWrapper";
import { AgentTrigger } from "rc_agents/trigger";

export const AlertCompletedTab: FC<AlertRowTabProps> = ({ setEmptyAlert }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  // Trigger the retrieval of alert info when the alert item is selected
  function onCardPress(item: Alert) {
    AgentTrigger.triggerRetrieveAlertInfo(item);
    setEmptyAlert(false);
  }

  return (
    <ScreenWrapper style={{ backgroundColor: colors.primaryBackgroundColor }}>
      {/* Search bar */}
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
      {/* Completed alerts list */}
      <FlatList
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <ItemSeparator />}
        data={mockCompletedAlerts}
        renderItem={({ item }) => (
          <AlertRow alertDetails={item} onCardPress={() => onCardPress(item)} />
        )}
      />
    </ScreenWrapper>
  );
};
