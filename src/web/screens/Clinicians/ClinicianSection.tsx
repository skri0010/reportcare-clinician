import { H3, H4 } from "components/Text";
import React, { FC } from "react";
import { View } from "react-native";
import { ms } from "react-native-size-matters";

interface ClinicianSectionProps {
  title: string;
  information: string;
}

export const ClinicianSection: FC<ClinicianSectionProps> = ({
  title,
  information
}) => {
  return (
    <View>
      <H3 text={title} style={{ fontWeight: "600", marginBottom: ms(10) }} />
      <H4
        text={information}
        style={{ marginBottom: ms(25), paddingLeft: ms(10) }}
      />
    </View>
  );
};
