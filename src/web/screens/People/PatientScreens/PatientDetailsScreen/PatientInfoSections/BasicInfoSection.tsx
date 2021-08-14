import React, { FC } from "react";
import { ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { View } from "react-native";
import { PatientInfoRow, InfoIcon } from "./PatientInfoRow";

export interface BasicInfo {
  gender: string;
  age: string;
  birthdate: string;
  location: string;
  class: string;
  language: string;
}
interface BasicInfoSectionProps {
  info: BasicInfo;
}

export const BasicInfoSection: FC<BasicInfoSectionProps> = ({ info }) => {
  return (
    <View style={styles.infoSection}>
      {/* Details of patient basic information */}
      <PatientInfoRow
        title={i18n.t("Patient_Info.Gender")}
        content={info.gender}
        iconType={InfoIcon.GENDER}
      />
      {/* JH-TODO-NEW: Calculate age */}
      <PatientInfoRow
        title={i18n.t("Patient_Info.DOB")}
        content={info.birthdate}
        iconType={InfoIcon.BIRTHDATE}
        subcontent={info.age}
      />
      {/* JH-TODO-NEW: Update this location attribute */}
      <PatientInfoRow
        title={i18n.t("Patient_Info.Location")}
        content="Remote"
        iconType={InfoIcon.LOCATION}
      />
      <PatientInfoRow
        title={i18n.t("Patient_Info.Class")}
        content={`NHYA ${info.class}`}
        iconType={InfoIcon.CLASS}
      />
      <PatientInfoRow
        title={i18n.t("Patient_Info.LanguageSpoken")}
        content={info.language}
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
