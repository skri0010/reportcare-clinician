import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { ScreenWrapper } from "mobile/screens/ScreenWrapper";
import { AlertButton } from "components/Buttons/AlertButton";
import { RiskLevel } from "models/RiskLevel";
import { MainTitle } from "components/Text";
import { PatientRequestRow } from "components/RowComponents/PatientRows/PatientRequestRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { mockPatients } from "mock/mockPatients";
import { ScreenName, WithBottomTabsProps } from "mobile/screens";

export const HomeScreen: FC<WithBottomTabsProps[ScreenName.HOME]> = () => {
  // JH-TODO Replace titles with i18n
  return (
    <ScreenWrapper>
      {/* Alerts */}
      <MainTitle title="Alerts" details="(2 remaining)" />

      {/* Alert Button Row */}
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        {/* JH-TODO: Remove hardcoding of alertCount */}
        <AlertButton riskLevel={RiskLevel.HIGH} alertCount={1} />
        <AlertButton riskLevel={RiskLevel.MEDIUM} alertCount={1} />
        <AlertButton riskLevel={RiskLevel.LOW} />
        <AlertButton riskLevel={RiskLevel.UNASSIGNED} />
      </View>

      {/* Requests by MARIA */}
      <MainTitle title="Requests by MARIA" details="(2 remaining)" />

      {/* Patient Requests List */}
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
    </ScreenWrapper>
  );
};
