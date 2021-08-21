import { H4 } from "components/Text";
import React, { FC } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "../../../ScreenWrapper";
import { PatientsScreenProps, PatientsScreenName } from "web/screens";

export const PatientICDCRT: FC<PatientsScreenProps[PatientsScreenName.ICDCRT]> =
  () => {
    return (
      <ScreenWrapper padding>
        <View>
          <H4 text="To be added" style={null} />
        </View>
      </ScreenWrapper>
    );
  };
