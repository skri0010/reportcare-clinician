import React, { FC } from "react";
import { View } from "react-native";
import { SearchBarComponent } from "components/Bars/SearchBarComponent";
import { MobileScreenWrapper } from "mobile/screens/MobileScreenWrapper";
import { mockClinician } from "mock/mockClinicians";
import { ClinicianContactRow } from "components/RowComponents/ClinicianRow/ClinicianContactRow";
import { ClinicianShareRow } from "components/RowComponents/ClinicianRow/ClinicianShareRow";
import i18n from "util/language/i18n";

export const CliniciansTab: FC = () => {
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
          placeholder={i18n.t("Clinicians.SearchBarPlaceholder")}
        />
        {/* <Text> Clinicians </Text> */}
        <ClinicianContactRow generalDetails={mockClinician[0]} />
        <ClinicianShareRow generalDetails={mockClinician[0]} checked />
      </View>
    </MobileScreenWrapper>
  );
};
