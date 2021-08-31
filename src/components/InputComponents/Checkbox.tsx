import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { select, RootState } from "util/useRedux";

export interface CheckboxProps {
  checked: boolean;
  onPress: () => void;
  checkboxStyle?: StyleProp<ViewStyle>;
  iconSize?: number;
  iconColor?: string;
  iconStyle?: StyleProp<ViewStyle>;
}

export const Checkbox: FC<CheckboxProps> = ({
  checked,
  onPress,
  checkboxStyle,
  iconSize = ms(20),
  iconColor,
  iconStyle
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ paddingRight: ms(5) }, checkboxStyle]}
    >
      {checked ? (
        <Icon
          name="check-box"
          size={iconSize}
          color={iconColor || colors.acceptIconColor}
          style={iconStyle}
        />
      ) : (
        <Icon
          name="check-box-outline-blank"
          size={iconSize}
          style={iconStyle}
        />
      )}
    </TouchableOpacity>
  );
};
