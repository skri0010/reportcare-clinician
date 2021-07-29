import React, { FC } from "react";
import { View, FlatList, Dimensions } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { PatientDetailsRow } from "components/RowComponents/PatientRows/PatientDetailsRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { mockPatients } from "mock/mockPatients";
import { RowSelectionWrapper } from "../RowSelectionTab";

export const PatientsTab: FC = () => {
  // JH-TODO: Replace placeholder with i18n
  return (
    <ScreenWrapper>
      <View style={{ flexDirection: "row", height: "100%" }}>
        <View style={{ flex: 1, height: Dimensions.get("window").height }}>
          <RowSelectionWrapper title="Patient" riskFilterTag>
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}
              ItemSeparatorComponent={() => <ItemSeparator />}
              ListHeaderComponent={() => <ItemSeparator />}
              ListFooterComponent={() => <ItemSeparator />}
              data={mockPatients}
              renderItem={({ item }) => (
                <PatientDetailsRow
                  generalDetails={item.generalDetails}
                  patientClass={item.patientClass}
                  age={item.age}
                />
              )}
              keyExtractor={(item) => item.itemId}
            />
          </RowSelectionWrapper>
        </View>

        <View style={{ flex: 2, backgroundColor: "#E2E2E2" }} />
      </View>
    </ScreenWrapper>
  );
};
