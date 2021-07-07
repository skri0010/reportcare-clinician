import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { ScreenWrapper } from "screens/ScreenWrapper";
import { PatientChatRow } from "components/RowComponents/PatientRows/PatientChatRow";
import { mockPatients } from "../../mock/mockPatients";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { ScreenName, WithSideTabsProps } from "screens";

export const ChatScreen: FC<WithSideTabsProps[ScreenName.CHAT]> = () => {
  // JH-TODO Add search button later
  // JH-TODO Flatlist
  // JH-TODO Remove mock data

  return (
    <ScreenWrapper>
      <View>
        <FlatList
          ItemSeparatorComponent={() => <ItemSeparator />}
          ListHeaderComponent={() => <ItemSeparator />}
          ListFooterComponent={() => <ItemSeparator />}
          data={mockPatients}
          renderItem={({ item }) => (
            <PatientChatRow
              generalDetails={item.generalDetails}
              message={item.message}
              unreadMessageCount={item.unreadMessageCount}
            />
          )}
          keyExtractor={(item) => item.itemId}
        />
      </View>
    </ScreenWrapper>
  );
};
