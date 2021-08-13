import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import { ScreenWrapper } from "../../../ScreenWrapper";
import { View } from "react-native";
import { BasicInfoSection } from "./PatientInfoSections/BasicInfoSection";
import { ContactInfoSection } from "./PatientInfoSections/ContactInfoSection";
import { InfoTitleBar } from "./PatientInfoSections/InfoTitleBar";
import { WithPatientsScreenProps, PatientsScreenName } from "web/screens";

export const PatientInformation: FC<
  WithPatientsScreenProps[PatientsScreenName.INFO]
> = () => {
  // JQ-TODO Query for information here
  return (
    <ScreenWrapper padding>
      <View style={{ marginHorizontal: ms(40) }}>
        {/* Patient Basic informations */}
        <InfoTitleBar title="Patient_Info.BasicInfo" />
        <BasicInfoSection />
        {/* Patient Medical Information */}
        <InfoTitleBar title="Patient_Info.ContactInfo" />
        <ContactInfoSection />
      </View>
    </ScreenWrapper>
  );
};
