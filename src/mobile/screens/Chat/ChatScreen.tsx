import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { MobileScreenWrapper } from "mobile/screens/MobileScreenWrapper";
import { PatientChatRow } from "components/RowComponents/PatientRows/PatientChatRow";
import { mockPatients } from "mock/mockPatients";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { ScreenName, WithBottomTabsProps } from "mobile/screens";

export const ChatScreen: FC<WithBottomTabsProps[ScreenName.CHAT]> = () => {
  // JH-TODO Add search button later
  // JH-TODO Flatlist
  // JH-TODO Remove mock data

  return (
    <MobileScreenWrapper>
      <View>
        <FlatList
          ItemSeparatorComponent={() => <ItemSeparator />}
          ListHeaderComponent={() => <ItemSeparator />}
          ListFooterComponent={() => <ItemSeparator />}
          data={mockPatients}
          renderItem={({ item }) => (
            // TODO : Clarify how chat data is stored
            <PatientChatRow
              generalDetails={item}
              message="Temporary chat"
              unreadMessageCount={2}
            />
          )}
          keyExtractor={(item) => item.patientID!}
        />
      </View>
    </MobileScreenWrapper>
  );
};
