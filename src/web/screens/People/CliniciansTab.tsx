import React, { FC } from "react";
import { View, TextStyle } from "react-native";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { mockClinician } from "mock/mockClinicians";
import { ClinicianContactRow } from "components/RowComponents/ClinicianRow/ClinicianContactRow";
import { ClinicianShareRow } from "components/RowComponents/ClinicianRow/ClinicianShareRow";
import { H4 } from "components/Text";
import { ScaledSheet } from "react-native-size-matters";
import { lightColorScheme } from "models/ColorScheme";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithSideTabsProps } from "web/screens";
import { ClinicianList } from "./ClinicianList";

export const CliniciansTab: FC<WithSideTabsProps[ScreenName.CLINICIAN]> = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const titleColor = { color: colors.primaryContrastTextColor } as TextStyle;
  // JH-TODO: Replace placeholder with i18n
  return (
    <ScreenWrapper>
      <View style={[styles.clinicianTab]}>
      <View style={[styles.leftColumn]} >
      <View style={[styles.clinicianTitle]}>
        <H4 text="Clinicians" style={[styles.title, titleColor]}/>
        </View>
      <View>
        < ClinicianList/>
        <ClinicianContactRow generalDetails={mockClinician.generalDetails} />
        <ClinicianShareRow
          generalDetails={mockClinician.generalDetails}
          checked={mockClinician.checked}
        />
      </View>
      </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  title: {
    fontWeight: "bold",
    padding: "10@ms"
  },
  leftColumn: {
    backgroundColor: "white",
    height: "100%", 
    width:"30%"
  },
  clinicianTitle: {
    backgroundColor: lightColorScheme.primaryBarColor,
    padding: "0@ms"
  },
  clinicianTab: {
    flexDirection: "row"
  }
});
