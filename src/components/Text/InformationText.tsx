/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from "react";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { H7, TextProps } from ".";

interface InformationTextProps {
  TextComponent?: FC<TextProps>;
  textProps?: TextProps;
  boldText: string;
  normalText: string;
  nestedLevel?: number; // Provide left padding similar to nested list items
}

export const InformationText: FC<InformationTextProps> = ({
  TextComponent = H7,
  textProps = {},
  boldText,
  normalText,
  nestedLevel = 0
}) => {
  return (
    <View style={[styles.row, { paddingLeft: ms(5 * nestedLevel) }]}>
      <TextComponent
        {...textProps}
        text={`${boldText}: `}
        style={[textProps.style, { fontWeight: "bold" }]}
      />
      <TextComponent {...textProps} text={normalText} />
    </View>
  );
};

const styles = ScaledSheet.create({
  row: { flexDirection: "row", alignItems: "center" }
});
