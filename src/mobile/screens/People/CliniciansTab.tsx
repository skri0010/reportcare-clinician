import React, { FC } from "react";
import { View } from "react-native";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { ScreenWrapper } from "mobile/screens/ScreenWrapper";
import { mockClinician } from "mock/mockClinicians";
import { ClinicianContactRow } from "components/RowComponents/ClinicianRow/ClinicianContactRow";
import { ClinicianShareRow } from "components/RowComponents/ClinicianRow/ClinicianShareRow";

export const CliniciansTab: FC = () => {
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
        {/* <Text> Clinicians </Text> */}
        <ClinicianContactRow generalDetails={mockClinician[0]} />
        <ClinicianShareRow generalDetails={mockClinician[0]} checked />
      </View>
    </ScreenWrapper>
  );
};
