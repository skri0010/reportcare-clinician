import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { ScreenWrapper } from "mobile/screens/ScreenWrapper";
import { PatientChatRow } from "components/rowComponents/PatientRows/PatientChatRow";
import { mockPatients } from "mock/mockPatients";
import { ItemSeparator } from "components/rowComponents/ItemSeparator";
import { ScreenName, WithBottomTabsProps } from "mobile/screens";

export const ChatScreen: FC<WithBottomTabsProps[ScreenName.CHAT]> = () => {
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
    </ScreenWrapper>
  );
};
