import React, { FC } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { View } from "react-native";
import { ClinicianInfo } from "aws/models";
import { ScreenWrapper } from "../ScreenWrapper";
import { ContactTitle } from "./ContactTitle";
import i18n from "util/language/i18n";
import { ClinicianSection } from "./ClinicianSection";

interface ClinicianDetailsProp {
  clinicianDetails: ClinicianInfo;
}

export const ClinicianDetails: FC<ClinicianDetailsProp> = ({
  clinicianDetails
}) => {
  return (
    <ScreenWrapper>
      <ContactTitle name={i18n.t("Information")} isPatient={false} />
      <View style={styles.container}>
        <ClinicianSection
          title="Clinician Name:"
          information={clinicianDetails.name}
        />
        <ClinicianSection
          title="Hospital Name:"
          information={clinicianDetails.hospitalName}
        />
        <ClinicianSection title="Role:" information={clinicianDetails.role} />
        <ClinicianSection title="Email:" information={clinicianDetails.id} />
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    margin: "30@ms",
    marginLeft: "40@ms"
  },
  infoSection: {
    paddingLeft: "30@ms",
    paddingTop: "10@ms",
    paddingBottom: "20@ms",
    flex: 1
  }
});
