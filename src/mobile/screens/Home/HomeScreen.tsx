import React, { FC } from "react";
import { View, FlatList } from "react-native";
import { MobileScreenWrapper } from "mobile/screens/MobileScreenWrapper";
import { AlertButton } from "components/Buttons/AlertButton";
import { RiskLevel } from "models/RiskLevel";
import { MainTitle } from "components/Text";
import { PatientRequestRow } from "components/RowComponents/PatientRows/PatientRequestRow";
import { ItemSeparator } from "components/RowComponents/ItemSeparator";
import { mockPatients } from "mock/mockPatients";
import { ScreenName, WithBottomTabsProps } from "mobile/screens";
import i18n from "util/language/i18n";

export const HomeScreen: FC<WithBottomTabsProps[ScreenName.HOME]> = () => {
  return (
    <MobileScreenWrapper>
      {/* Alerts */}
      <MainTitle
        title={i18n.t("Home.Alerts")}
        details={`2 ${i18n.t("Home.ItemsRemaining")})`}
      />

      {/* Alert Button Row */}
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <AlertButton riskLevel={RiskLevel.HIGH} alertCount={1} />
        <AlertButton riskLevel={RiskLevel.MEDIUM} alertCount={1} />
        <AlertButton riskLevel={RiskLevel.LOW} />
        <AlertButton riskLevel={RiskLevel.UNASSIGNED} />
      </View>

      {/* Requests by MARIA */}
      <MainTitle
        title={i18n.t("Home.RequestsByMaria")}
        details={`(2 ${i18n.t("Home.ItemsRemaining")})`}
      />

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
    </MobileScreenWrapper>
  );
};
