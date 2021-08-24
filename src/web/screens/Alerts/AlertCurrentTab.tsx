import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { RootState, select } from "util/useRedux";
import { Alert } from "aws/API";
import { mockPendingAlerts } from "mock/mockAlerts";
import { AlertRow } from "components/RowComponents/AlertRow";
import { ScreenWrapper } from "../ScreenWrapper";
import { AgentTrigger } from "rc_agents/trigger";

export interface AlertRowTabProps {
  setEmptyAlert: (state: boolean) => void;
}
export const AlertCurrentTab: FC<AlertRowTabProps> = ({ setEmptyAlert }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  // When the alert item is pressed, trigger the retrieval of alert info
  function onCardPress(item: Alert) {
    AgentTrigger.triggerRetrieveAlertInfo(item);
    setEmptyAlert(false);
  }

  return (
    <ScreenWrapper style={{ backgroundColor: colors.primaryBackgroundColor }}>
      <View style={{ flex: 1 }}>
        {/* Search bar */}
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
        {/* Pending alerts list */}
        <FlatList
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <ItemSeparator />}
          data={mockPendingAlerts}
          renderItem={({ item }) => (
            <AlertRow
              alertDetails={item}
              onCardPress={() => onCardPress(item)}
            />
          )}
        />
      </View>
    </ScreenWrapper>
  );
};
