import React, { FC, useState, useEffect } from "react";
import { View } from "react-native";
import { ms } from "react-native-size-matters";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import {
  BasicInfo,
  BasicInfoSection
} from "./PatientInfoSections/BasicInfoSection";
import {
  ContactInfo,
  ContactInfoSection
} from "./PatientInfoSections/ContactInfoSection";
import { InfoTitleBar } from "./PatientInfoSections/InfoTitleBar";
import { WithPatientsScreenProps, PatientsScreenName } from "web/screens";
import { RootState, select } from "util/useRedux";
import { LoadingIndicator } from "components/IndicatorComponents/LoadingIndicator";
import { getAge } from "util/utilityFunctions";

export const PatientInformation: FC<
  WithPatientsScreenProps[PatientsScreenName.INFO]
> = () => {
  const { patientDetails } = select((state: RootState) => ({
    colors: state.settings.colors,
    patientDetails: state.agents.patientDetails
  }));

  const [basicInfo, setBasicInfo] = useState<BasicInfo>();
  const [contactInfo, setContactInfo] = useState<ContactInfo>();

  // Set basic and contact info after patient details are retrieved
  useEffect(() => {
    if (patientDetails) {
      const info = patientDetails.patientInfo;
      // Set basic info
      const basicInfoToSet: BasicInfo = {
        // JH-TODO-NEW: Schema is missing hardcoded values
        gender: info.gender,
        age: getAge(info.birthDate),
        birthDate: new Date(info.birthDate).toLocaleDateString(),
        location: info.hospitalLocation,
        class: info.NHYAclass,
        language: info.language
      };
      setBasicInfo(basicInfoToSet);

      const contactInfoToSet: ContactInfo = {
        phoneNumber: info.phoneNumber,
        email: info.email,
        address: info.address,
        emergencyContactNumber: info.emergencyContactNumber,
        emergencyContactName: info.emergencyContactName
      };
      setContactInfo(contactInfoToSet);
    }
  }, [patientDetails]);

  return (
    <ScreenWrapper padding>
      {patientDetails && basicInfo && contactInfo ? (
        <View style={{ marginHorizontal: ms(40) }}>
          {/* Patient Basic information */}
          <InfoTitleBar title="Patient_Info.BasicInfo" />
          <BasicInfoSection info={basicInfo} />
          {/* Patient Medical Information */}
          <InfoTitleBar title="Patient_Info.ContactInfo" />
          <ContactInfoSection info={contactInfo} />
        </View>
      ) : (
        // Show loading indicator if patient details is null
        <LoadingIndicator />
      )}
    </ScreenWrapper>
  );
};
