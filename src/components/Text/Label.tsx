import React, { FC } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { H5 } from "components/Text";
import { StyleProp, TextStyle } from "react-native";

interface LabelProps {
  text: string;
  style?: StyleProp<TextStyle>;
}

export const Label: FC<LabelProps> = ({ text, style }) => {
  return <H5 text={text} style={[styles.label, style]} />;
};

const styles = ScaledSheet.create({
  label: {
    fontWeight: "600",
    marginTop: "10@ms",
    marginBottom: "5@ms"
  }
});
