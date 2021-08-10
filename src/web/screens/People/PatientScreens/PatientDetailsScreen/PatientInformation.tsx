import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import { ScreenWrapper } from "../../../ScreenWrapper";
import { View } from "react-native";
import { BasicInfoSection } from "./PatientInfoSections/BasicInfoSection";
import { ContactInfoSection } from "./PatientInfoSections/ContactInfoSection";
import { InfoTitleBar } from "./PatientInfoSections/InfoTitleBar";
import { PatientScreenName, WithPatientTabsProps } from "..";

export const PatientInformation: FC<
  WithPatientTabsProps[PatientScreenName.INFO]
> = () => {
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
