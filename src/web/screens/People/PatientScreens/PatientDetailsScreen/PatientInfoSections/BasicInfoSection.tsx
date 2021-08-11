import React, { FC } from "react";
import { ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { View } from "react-native";
import { RootState, select } from "util/useRedux";
import { PatientInfoRow, InfoIcon } from "./PatientInfoRow";

interface BasicInfoSectionProps {
  basicInfo?: {
    gender: string;
    age: string;
    birthdate: string;
    location: string;
    class: string;
    language: string;
  };
}

export const BasicInfoSection: FC<BasicInfoSectionProps> = ({ basicInfo }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View style={styles.infoSection}>
      <PatientInfoRow
        title={i18n.t("Patient_Info.Gender")}
        content="Male"
        iconType={InfoIcon.GENDER}
      />
      <PatientInfoRow
        title={i18n.t("Patient_Info.DOB")}
        content="10-10-1966"
        iconType={InfoIcon.BIRTHDATE}
        subcontent="55 years old"
      />
      <PatientInfoRow
        title={i18n.t("Patient_Info.Location")}
        content="Remote"
        iconType={InfoIcon.LOCATION}
      />
      <PatientInfoRow
        title={i18n.t("Patient_Info.Class")}
        content="NHYA III"
        iconType={InfoIcon.CLASS}
      />
      <PatientInfoRow
        title={i18n.t("Patient_Info.LanguageSpoken")}
        content="English, Malay"
        iconType={InfoIcon.LANGUAGE}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  infoSection: {
    paddingHorizontal: "30@ms",
    paddingTop: "10@ms",
    paddingBottom: "20@ms",
    flex: 1
  }
});
