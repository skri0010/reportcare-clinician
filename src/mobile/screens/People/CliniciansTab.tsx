import React, { FC } from "react";
import { View } from "react-native";
import { SearchBarComponent } from "components/bars/SearchBarComponent";
import { MobileScreenWrapper } from "mobile/screens/MobileScreenWrapper";
import { mockClinician } from "mock/mockClinicians";
import { ClinicianContactRow } from "components/rowComponents/ClinicianRow/ClinicianContactRow";
import { ClinicianShareRow } from "components/rowComponents/ClinicianRow/ClinicianShareRow";

export const CliniciansTab: FC = () => {
  // JH-TODO: Replace placeholder with i18n
  return (
    <MobileScreenWrapper>
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
    </MobileScreenWrapper>
  );
};
