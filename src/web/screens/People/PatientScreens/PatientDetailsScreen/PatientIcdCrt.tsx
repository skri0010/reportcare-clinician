import { H4 } from "components/Text";
import React, { FC } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "../../../ScreenWrapper";
import { PatientDetailsTabProps } from "web/screens";
import { PatientDetails } from "rc_agents/model";

interface PatientICDCRTProps extends PatientDetailsTabProps.ICDCRTTabProps {
  details: PatientDetails;
}

export const PatientICDCRT: FC<PatientICDCRTProps> = () => {
  return (
    <ScreenWrapper padding>
      <View>
        <H4 text="To be added" style={null} />
      </View>
    </ScreenWrapper>
  );
};
