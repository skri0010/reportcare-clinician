import React, { FC } from "react";
import { H4 } from "components/Text";
import { ScaledSheet } from "react-native-size-matters";
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { select, RootState } from "util/useRedux";
import { Checkbox, CheckboxProps } from "components/InputComponents/Checkbox";

interface CheckboxTextProps extends CheckboxProps {
  text: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  fontSize?: number;
}

export const CheckboxText: FC<CheckboxTextProps> = ({
  text,
  containerStyle,
  textStyle,
  iconSize,
  fontSize,
  checked,
  onPress
}) => {
  const { fonts } = select((state: RootState) => ({
    fonts: state.settings.fonts
  }));

  return (
    <View style={[styles.containerStyle, containerStyle]}>
      <Checkbox
        checked={checked}
        iconSize={iconSize || fonts.h3Size}
        checkboxStyle={styles.iconStyle}
        onPress={onPress}
      />
      <View style={styles.textStyle}>
        <TouchableOpacity onPress={onPress}>
          <H4 text={text} style={[textStyle, { fontSize: fontSize }]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  containerStyle: {
    flexDirection: "row",
    alignItems: "center"
  },
  iconStyle: {
    paddingTop: "2@ms"
  },
  textStyle: { flex: 1 }
});
