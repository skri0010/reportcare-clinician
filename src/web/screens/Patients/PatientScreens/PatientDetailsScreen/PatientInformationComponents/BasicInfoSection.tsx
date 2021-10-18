import React, { FC } from "react";
import { ScaledSheet } from "react-native-size-matters";
import i18n from "util/language/i18n";
import { View } from "react-native";
import { PatientInfoRow, InfoIcon } from "./PatientInfoRow";
import { capitalizeFirstLetter } from "util/utilityFunctions";

export interface BasicInfo {
  gender: string;
  age: string;
  birthDate: string;
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
        content={capitalizeFirstLetter(info.gender)}
        iconType={InfoIcon.GENDER}
      />
      <PatientInfoRow
        title={i18n.t("Patient_Info.DOB")}
        content={info.birthDate}
        iconType={InfoIcon.BIRTHDATE}
        subcontent={`${info.age} ${i18n.t("Patient_Info.Years")}`}
      />
      <PatientInfoRow
        title={i18n.t("Patient_Info.Location")}
        content={info.location}
        iconType={InfoIcon.LOCATION}
      />
      <PatientInfoRow
        title={i18n.t("Patient_Info.Class")}
        content={`NHYA ${info.class}`}
        iconType={InfoIcon.CLASS}
      />
      <PatientInfoRow
        title={i18n.t("Patient_Info.LanguageSpoken")}
        content={capitalizeFirstLetter(info.language)}
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
