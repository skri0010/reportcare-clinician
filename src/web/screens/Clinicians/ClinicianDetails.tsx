import React, { FC } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { View } from "react-native";
import { ClinicianInfo } from "aws/API";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { ContactTitle } from "components/RowComponents/ContactTitle";
import i18n from "util/language/i18n";
import { InfoTitleBar } from "components/Bars/InfoTitleBar";
import { ClinicianInfoRow } from "./ClinicianInfoRow";

interface ClinicianDetailsProp {
  clinicianDetails: ClinicianInfo;
}

export const ClinicianDetails: FC<ClinicianDetailsProp> = ({
  clinicianDetails
}) => {
  return (
    <ScreenWrapper>
      <ContactTitle name={i18n.t(clinicianDetails.name)} isPatient={false} />
      <View style={{ marginHorizontal: ms(40) }}>
        <InfoTitleBar title="General Details" />
        <View style={styles.infoSection}>
          <ClinicianInfoRow
            title="Email:"
            content={clinicianDetails.id}
            iconType="email"
          />
          <ClinicianInfoRow
            title="Role:"
            content={clinicianDetails.role}
            iconType="doctor"
          />
          <ClinicianInfoRow
            title="Hospital Name:"
            content={clinicianDetails.hospitalName}
            iconType="hospital"
          />
        </View>
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
