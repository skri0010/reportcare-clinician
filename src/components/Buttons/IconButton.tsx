/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from "react";
import { RootState, select } from "util/useRedux";
import {
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TextStyle
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

export enum IconType {
  MATERIAL = "MATERIAL",
  MATERIAL_COMMUNITY = "MATERIAL_COMMUNITY",
  FONTAWESOME = "FONT_AWESOME"
}

export interface IconButtonProps {
  name: string;
  type: IconType;
  onPress: () => void;
  size?: number;
  containerStyle?: StyleProp<ViewStyle>;
  containerBorderColor?: string;
  containerBackgroundColor?: string;
  iconStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}

export const IconButton: FC<IconButtonProps> = ({
  name,
  type,
  onPress,
  size,
  containerStyle,
  containerBorderColor,
  containerBackgroundColor,
  iconStyle,
  disabled
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const iconProps = {
    name: name,
    size: size || fonts.h2Size,
    style: [{ color: colors.primaryContrastTextColor }, iconStyle]
  };

  const Icon: FC = () => {
    switch (type) {
      case IconType.MATERIAL:
        return <MaterialIcon {...iconProps} />;
      case IconType.MATERIAL_COMMUNITY:
        return <MaterialCommunityIcon {...iconProps} />;
      case IconType.FONTAWESOME:
        return <FontAwesomeIcon {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          borderColor: containerBorderColor || "transparent",
          backgroundColor: containerBackgroundColor || "transparent"
        },
        containerStyle
      ]}
      disabled={disabled}
    >
      <Icon />
    </TouchableOpacity>
  );
};
