import React, { FC } from "react";
import { Text, View } from "react-native";
import { SearchBarComponent } from "components/bars/SearchBarComponent";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { mockClinician } from "mock/mockClinicians";
import { ClinicianContactRow } from "components/rowComponents/ClinicianRow/ClinicianContactRow";
import { ClinicianShareRow } from "components/rowComponents/ClinicianRow/ClinicianShareRow";

export const CliniciansScreen: FC = () => {
  // JH-TODO: Replace placeholder with i18n
  return (
    <ScreenWrapper>
      <View>
        <SearchBarComponent
          onUserInput={() => {
            null;
          }}
          onSearchClick={() => {
            null;
          }}
          placeholder="Search clinicians"
        />
        <Text> Clinicians </Text>
        <ClinicianContactRow generalDetails={mockClinician[0]} />
        <ClinicianShareRow generalDetails={mockClinician[0]} checked />
      </View>
    </ScreenWrapper>
  );
};
