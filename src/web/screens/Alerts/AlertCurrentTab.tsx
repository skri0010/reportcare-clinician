import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { RootState, select } from "util/useRedux";
import { Alert } from "aws/API";
import { mockPendingAlerts } from "mock/mockAlerts";
import { AlertRow } from "components/RowComponents/AlertRow";
import { ScreenWrapper } from "../ScreenWrapper";

export interface AlertRowTabProps {
  setAlertSelected: (item: Alert) => void;
}
export const AlertCurrentTab: FC<AlertRowTabProps> = ({ setAlertSelected }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  function onCardPress(item: Alert) {
    setAlertSelected(item);
  }

  return (
    <ScreenWrapper style={{ backgroundColor: colors.primaryBackgroundColor }}>
      <View style={{ flex: 1 }}>
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
