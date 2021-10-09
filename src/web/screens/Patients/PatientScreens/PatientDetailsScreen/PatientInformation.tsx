import React, { FC } from "react";
import { View } from "react-native";
import { ms } from "react-native-size-matters";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import {
  BasicInfo,
  BasicInfoSection
} from "./PatientInformationComponents/BasicInfoSection";
import {
  ContactInfo,
  ContactInfoSection
} from "./PatientInformationComponents/ContactInfoSection";
import { InfoTitleBar } from "../../../../../components/Bars/InfoTitleBar";
import { PatientDetailsTabProps } from "web/navigation/types";
import { getAge } from "util/utilityFunctions";
import { PatientInfo } from "aws/API";

interface PatientInformationProps extends PatientDetailsTabProps.InfoTabProps {
  info: PatientInfo;
}

export const PatientInformation: FC<PatientInformationProps> = ({ info }) => {
  const basicInfo: BasicInfo = {
    gender: info.gender,
    age: getAge(info.birthDate),
    birthDate: new Date(info.birthDate).toLocaleDateString(),
    location: info.hospitalLocation,
    class: info.NHYAclass,
    language: info.language
  };

  const contactInfo: ContactInfo = {
    phoneNumber: info.phoneNumber,
    email: info.email,
    address: info.address,
    emergencyContactNumber: info.emergencyContactNumber,
    emergencyContactName: info.emergencyContactName
  };

  return (
    <ScreenWrapper padding>
      <View style={{ marginHorizontal: ms(40) }}>
        {/* Patient Basic information */}
        <InfoTitleBar title="Patient_Info.BasicInfo" />
        <BasicInfoSection info={basicInfo} />
        {/* Patient Medical Information */}
        <InfoTitleBar title="Patient_Info.ContactInfo" />
        <ContactInfoSection info={contactInfo} />
      </View>
    </ScreenWrapper>
  );
};
