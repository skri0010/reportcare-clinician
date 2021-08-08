import React, { FC } from "react";
import { ViewBase, View, FlatList } from "react-native";
import { RiskLevel } from "models/RiskLevel";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { RootState, select } from "util/useRedux";
import { Alert } from "aws/API";
import i18n from "util/language/i18n";
import { mockAlerts, mockPendingAlerts } from "mock/mockAlerts";
import { AlertRow } from "components/RowComponents/AlertRow";

export interface AlertRowTabProps {
    setAlertSelected: (item: Alert) => void;
}
export const AlertCurrentTab: FC<AlertRowTabProps> = ({ setAlertSelected }) => {

  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  function onCardPress(item: Alert){
      setAlertSelected(item);
  }

  return (
      <View style={{ flex: 1 }}>
          <SearchBarComponent onUserInput={() => {
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
          ItemSeparatorComponent={() => <ItemSeparator/>}
          data={mockPendingAlerts}
          renderItem={({ item }) => (
              <AlertRow 
              alertDetails={item}
              onCardPress={() => onCardPress(item)}
              />
          )}
          />
      </View>
  );

};