import React, { FC } from "react";
import { ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { View } from "react-native";
import { RootState, select } from "util/useRedux";
import { PatientInfoRow, InfoIcon } from "./PatientInfoRow";

interface ContactInfoSectionProps {
  contactInfo?: {
    phoneNumber: string;
    email: string;
    address: string;
    emergencyContact: string;
  };
}

export const ContactInfoSection: FC<ContactInfoSectionProps> = ({
  contactInfo
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View style={styles.infoSection}>
      <PatientInfoRow
        title={i18n.t("Patient_Info.HPNumber")}
        content="012-3456789"
        iconType={InfoIcon.PHONE}
      />
      <PatientInfoRow
        title={i18n.t("Patient_Info.Email")}
        content="mohammad.zaini@gmail.com"
        iconType={InfoIcon.EMAIL}
      />
      <PatientInfoRow
        title={i18n.t("Patient_Info.Address")}
        content="Jalan Kebajikan, Kota Kinabalu, Sabah"
        iconType={InfoIcon.ADDRESS}
      />
      <PatientInfoRow
        title={i18n.t("Patient_Info.EmergencyContact")}
        content="012-9876543"
        iconType={InfoIcon.EMERGENCY}
        subcontent="Nur Amirah - Wife"
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  infoSection: {
    paddingLeft: "30@ms",
    paddingTop: "10@ms",
    paddingBottom: "20@ms"
  }
});
