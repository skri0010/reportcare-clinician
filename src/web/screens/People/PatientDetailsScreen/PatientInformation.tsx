import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import { ScreenWrapper } from "../../ScreenWrapper";
import { View } from "react-native";
import { PatientInfo } from "aws/models";
import { RootState, select } from "util/useRedux";
import { BasicInfoSection } from "./PatientInfoSections/BasicInfoSection";
import { ContactInfoSection } from "./PatientInfoSections/ContactInfoSection";
import { InfoTitleBar } from "./PatientInfoSections/InfoTitleBar";

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
      <View style={{ marginHorizontal: ms(40) }}>
        <InfoTitleBar title="Patient_Info.BasicInfo" />
        <BasicInfoSection />
        <InfoTitleBar title="Patient_Info.ContactInfo" />
        <ContactInfoSection />
      </View>
    </ScreenWrapper>
  );
};
