import { H4 } from "components/text";
import { PatientDetails } from "rc_agents/model";
import React, { FC } from "react";
import { View } from "react-native";
import { PatientDetailsTabProps } from "web/navigation/types";
import { ScreenWrapper } from "web/screens/ScreenWrapper";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PatientICDCRTProps extends PatientDetailsTabProps.ICDCRTTabProps {
  details: PatientDetails;
}

export const PatientICDCRT: FC<PatientICDCRTProps> = ({ details }) => {
  return (
    <ScreenWrapper padding>
      <View>
        <H4 text="To be added" style={null} />
      </View>
    </ScreenWrapper>
  );
};
