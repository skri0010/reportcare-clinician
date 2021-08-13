import { H4 } from "components/Text";
import React, { FC } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "../../../ScreenWrapper";
import { WithPatientsScreenProps, PatientsScreenName } from "web/screens";

export const PatientICDCRT: FC<
  WithPatientsScreenProps[PatientsScreenName.ICDCRT]
> = () => {
  return (
    <ScreenWrapper>
      <View>
        <H4 text="To be added" style={null} />
      </View>
    </ScreenWrapper>
  );
};
