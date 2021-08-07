import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import { H4 } from "components/Text/index";
import { View } from "react-native";

interface PatientInfoRowProps {
  title: string;
  content: string;
}
export const PatientInfoRow: FC<PatientInfoRowProps> = ({ title, content }) => {
  return (
    <View
      style={{
        paddingBottom: ms(5)
      }}
    >
      <H4
        text={`${title}`}
        style={{ fontWeight: "bold", paddingBottom: ms(3) }}
      />
      <H4 text={content} style={null} />
    </View>
  );
};
