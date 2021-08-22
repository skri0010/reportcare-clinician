import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { ScreenWrapper } from "mobile/screens/ScreenWrapper";
import { MainTitle } from "components/text";
import { PatientRequestRow } from "components/rowComponents/PatientRows/PatientRequestRow";
import { ItemSeparator } from "components/rowComponents/ItemSeparator";
import { mockPatients } from "mock/mockPatients";

export const CurrentRequestsTab: FC = () => {
  // JH-TODO Remove mock data
  // JH-TODO Flatlist
  // JH-TODO: Replace titles with i18n

  return (
    <ScreenWrapper>
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
    </ScreenWrapper>
  );
};
