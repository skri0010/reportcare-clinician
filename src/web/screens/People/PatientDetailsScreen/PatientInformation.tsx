import React, { FC } from "react";
import { ScaledSheet, ms } from "react-native-size-matters";
import { ScreenWrapper } from "../../ScreenWrapper";
import { View } from "react-native";
import { PatientInfo } from "aws/models";
import { RootState, select } from "util/useRedux";
import { H3, H4 } from "components/Text/index";
import i18n from "util/language/i18n";
import { BasicInfoCard } from "./PatientInfoCards/BasicInfoCard";
import { ContactInfoCard } from "./PatientInfoCards/ContactInfoCard";

interface PatientInformationProps {
  patientInfo: PatientInfo;
}

export const PatientInformation: FC<PatientInformationProps> = ({
  patientInfo
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));
  // JQ-TODO Query for information here
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BasicInfoCard />
        <ContactInfoCard />
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: ms(10)
  }
});
