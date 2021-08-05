import { H4 } from "components/Text";
import React, { FC } from "react";
import { View } from "react-native";
import { ScreenWrapper } from "../../ScreenWrapper";
import { PatientParameterProps } from "./PatientHistory";

export const PatientIcdCrt: FC<PatientParameterProps> = () => {
  return (
    <ScreenWrapper>
      <View>
        <H4 text="To be added" style={null} />
      </View>
    </ScreenWrapper>
  );
};
