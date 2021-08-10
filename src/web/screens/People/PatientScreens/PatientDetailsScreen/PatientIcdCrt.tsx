import { H4 } from "components/Text";
import React, { FC } from "react";
import { View } from "react-native";
import { PatientScreenName, WithPatientTabsProps } from "..";
import { ScreenWrapper } from "../../../ScreenWrapper";

export const PatientIcdCrt: FC<WithPatientTabsProps[PatientScreenName.ICDCRT]> =
  () => {
    return (
      <ScreenWrapper>
        <View>
          <H4 text="To be added" style={null} />
        </View>
      </ScreenWrapper>
    );
  };
