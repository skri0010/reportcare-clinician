import React, { FC, useContext } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { View } from "react-native";
import { ClinicianInfo } from "aws/models";
import { H3, H4 } from "components/Text";
import { select, RootState } from "util/useRedux";
import { ScreenWrapper } from "../ScreenWrapper";
import { ClinicianContext } from "./CliniciansTab";
import { ContactTitle } from "./ContactTitle";
import i18n from "util/language/i18n";

interface ClinicianDetails {
  generalDetails: ClinicianInfo;
}

interface ClinicianSectionProps {
  title: string;
  information: string;
}

export const ClinicianSection: FC<ClinicianSectionProps> = ({
  title,
  information
}) => {
  return (
    <View>
      <H3 text={title} style={{ fontWeight: "600", marginBottom: ms(10) }} />
      <H4
        text={information}
        style={{ marginBottom: ms(25), paddingLeft: ms(10) }}
      />
    </View>
  );
};

export const ClinicianDetails: FC<ClinicianInfo> = (clinician: 
  ClinicianInfo) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const details = clinician;

  return (
    <ScreenWrapper>
      <ContactTitle name={i18n.t("Information")} isPatient={false} />
      <View style={styles.container}>
        <ClinicianSection
          title="Clinician Name:"
          information={details.name}
        />
        <ClinicianSection
          title={i18n.t("Hospital Name:")}
          information={details.hospitalName}
        />
        <ClinicianSection title={i18n.t("Role:")} information={details.role} />
        <ClinicianSection title={i18n.t("Email:")} information={details.id} />
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    margin: "30@ms",
    marginLeft: "40@ms"
  }
});
