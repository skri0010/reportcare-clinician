import React, { FC } from "react";
import { ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { View } from "react-native";
import { PatientInfoRow, InfoIcon } from "./PatientInfoRow";

export interface ContactInfo {
  phoneNumber: string;
  email: string;
  address: string;
  emergencyContact: string;
}

interface ContactInfoSectionProps {
  info: ContactInfo;
}

export const ContactInfoSection: FC<ContactInfoSectionProps> = ({ info }) => {
  return (
    <View style={styles.infoSection}>
      {/* Details of patient contact information */}
      <PatientInfoRow
        title={i18n.t("Patient_Info.HPNumber")}
        content={info.phoneNumber}
        iconType={InfoIcon.PHONE}
      />
      <PatientInfoRow
        title={i18n.t("Patient_Info.Email")}
        content={info.email}
        iconType={InfoIcon.EMAIL}
      />
      <PatientInfoRow
        title={i18n.t("Patient_Info.Address")}
        content={info.address}
        iconType={InfoIcon.ADDRESS}
      />
      <PatientInfoRow
        title={i18n.t("Patient_Info.EmergencyContact")}
        content={info.emergencyContact}
        iconType={InfoIcon.EMERGENCY}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  infoSection: {
    paddingLeft: "30@ms",
    paddingTop: "10@ms",
    paddingBottom: "20@ms",
    flex: 1
  }
});
