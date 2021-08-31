import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { MobileScreenWrapper } from "mobile/screens/MobileScreenWrapper";
import { MainTitle } from "components/Text";
import { PatientRequestRow } from "components/RowComponents/PatientRows/PatientRequestRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { mockPatients } from "mock/mockPatients";

export const CurrentRequestsTab: FC = () => {
  // JH-TODO Remove mock data
  // JH-TODO Flatlist
  // JH-TODO: Replace titles with i18n

  return (
    <MobileScreenWrapper>
      <View>
        <MainTitle title="Requests by MARIA" />

        <FlatList
          ItemSeparatorComponent={() => <ItemSeparator />}
          ListHeaderComponent={() => <ItemSeparator />}
          ListFooterComponent={() => <ItemSeparator />}
          data={mockPatients}
          renderItem={({ item }) => (
            <PatientRequestRow
              generalDetails={item}
              request="Verify titration values"
            />
          )}
          keyExtractor={(item) => item.patientID!}
        />
      </View>
    </MobileScreenWrapper>
  );
};
