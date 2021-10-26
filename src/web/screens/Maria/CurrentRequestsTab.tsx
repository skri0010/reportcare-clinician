import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { MainTitle } from "components/Text";
import { PatientRequestRow } from "components/RowComponents/PatientRows/PatientRequestRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { mockPatients } from "mock/mockPatients";
import i18n from "util/language/i18n";

export const CurrentRequestsTab: FC = () => {
  // FUTURE-TODO: Remove mock data
  return (
    <ScreenWrapper>
      <View>
        <MainTitle title={i18n.t("Home.RequestsByMaria")} />

        <FlatList
          ItemSeparatorComponent={() => <ItemSeparator />}
          ListHeaderComponent={() => <ItemSeparator />}
          ListFooterComponent={() => <ItemSeparator />}
          data={mockPatients}
          renderItem={({ item }) => (
            <PatientRequestRow generalDetails={item} request="temporary" />
          )}
          keyExtractor={(item) => item.patientID!}
        />
      </View>
    </ScreenWrapper>
  );
};
