import React, { FC } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H3 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import i18n from "util/language/i18n";
import { View } from "react-native";
import { RootState, select } from "util/useRedux";
import { PatientInfoRow } from "./PatientInfoRow";

interface ContactInfoCardProps {
  contactInfo?: {
    phoneNumber: string;
    email: string;
    address: string;
    emergencyContact: string;
  };
}

export const ContactInfoCard: FC<ContactInfoCardProps> = ({ contactInfo }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <CardWrapper>
      <H3 text={i18n.t("Patient_Info.ContactInfo")} style={styles.cardTitle} />
      <View style={{ paddingHorizontal: ms(10) }}>
        <PatientInfoRow
          title={i18n.t("Patient_Info.HPNumber")}
          content="012-3456789"
        />
        <PatientInfoRow
          title={i18n.t("Patient_Info.Email")}
          content="mohammad.zaini@gmail.com"
        />
        <PatientInfoRow
          title={i18n.t("Patient_Info.Address")}
          content="Jalan Kebajikan, Kota Kinabalu, Sabah"
        />
        {/* JQ- TODO: Will be replaced with Flatlist for possibility of multiple emergency contacts */}
        <PatientInfoRow
          title={i18n.t("Patient_Info.EmergencyContact")}
          content="012-9876543 (Nur Amirah - Wife)"
        />
      </View>
    </CardWrapper>
  );
};

const styles = ScaledSheet.create({
  cardTitle: {
    fontWeight: "bold",
    paddingLeft: ms(5),
    paddingBottom: ms(15)
  }
});
