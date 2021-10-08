import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { PatientChatRow } from "components/RowComponents/PatientRows/PatientChatRow";
import { mockPatients } from "mock/mockPatients";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { MainScreenProps } from "web/navigation/types";
import { ScreenName } from "web/navigation";

export const ChatScreen: FC<MainScreenProps[ScreenName.CHAT]> = () => {
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
              generalDetails={item}
              message="temporary"
              unreadMessageCount={2}
            />
          )}
          keyExtractor={(item) => item.patientID!}
        />
      </View>
    </ScreenWrapper>
  );
};
