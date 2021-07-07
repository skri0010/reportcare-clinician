import React, { FC } from "react";
import { Text, View } from "react-native";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { ScreenWrapper } from "screens/ScreenWrapper";
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
          placeholder="Search clinicians"
        />
        <Text> Clinicians </Text>
        <ClinicianContactRow generalDetails={mockClinician.generalDetails} />
        <ClinicianShareRow
          generalDetails={mockClinician.generalDetails}
          checked={mockClinician.checked}
        />
      </View>
    </ScreenWrapper>
  );
};
