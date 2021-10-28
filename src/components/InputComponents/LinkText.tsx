import { H5 } from "components/Text";
import React, { FC } from "react";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";

interface LinkTextProps {
  text: string;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export const LinkText: FC<LinkTextProps> = ({ text, style, onPress }) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  // Local styles
  const footerButtonTextStyle = [
    styles.footerButtonText,
    { color: colors.primaryBarColor }
  ];

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <H5 text={text} style={footerButtonTextStyle} />
    </TouchableOpacity>
  );
};

const styles = ScaledSheet.create({
  footerButtonText: {
    marginTop: "5@ms",
    fontWeight: "600"
  }
});
