import React, { FC } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H3 } from "components/Text/index";
import { CardWrapper } from "web/screens/Home/CardWrapper";
import i18n from "util/language/i18n";
import { View } from "react-native";
import { RootState, select } from "util/useRedux";
import { PatientInfoRow } from "./PatientInfoRow";

interface BasicInfoCardProps {
  basicInfo?: {
    gender: string;
    age: string;
    birthdate: string;
    location: string;
    class: string;
    language: string;
  };
}

export const BasicInfoCard: FC<BasicInfoCardProps> = ({ basicInfo }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <CardWrapper>
      <H3 text={i18n.t("Patient_Info.BasicInfo")} style={styles.cardTitle} />
      <View style={{ paddingHorizontal: ms(10) }}>
        <PatientInfoRow title={i18n.t("Patient_Info.Gender")} content="Male" />
        <PatientInfoRow
          title={i18n.t("Patient_Info.Age")}
          content="55 years old"
        />
        <PatientInfoRow
          title={i18n.t("Patient_Info.DOB")}
          content="10-10-1966"
        />
        <PatientInfoRow
          title={i18n.t("Patient_Info.Location")}
          content="Remote"
        />
        <PatientInfoRow
          title={i18n.t("Patient_Info.Class")}
          content="NHYA III"
        />
        <PatientInfoRow
          title={i18n.t("Patient_Info.LanguageSpoken")}
          content="English, Malay"
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
