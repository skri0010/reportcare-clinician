import React, { FC } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ms, ScaledSheet } from "react-native-size-matters";
import { View } from "react-native";
import { H6 } from "components/text";
import { RootState, select } from "util/useRedux";

interface MainScreenTabButtonProps {
  name: string;
  subtitle: string;
  iconColor?: string;
  textColor?: string;
}

export const MainScreenTabButton: FC<MainScreenTabButtonProps> = ({
  name,
  subtitle,
  iconColor,
  textColor
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const tabIconSize = ms(22);
  return (
    <View style={styles.tabIconContainer}>
      <Icon
        name={name}
        color={iconColor || colors.primaryContrastIconColor}
        size={tabIconSize}
      />
      <H6
        text={subtitle}
        style={{ color: textColor || colors.primaryContrastTextColor }}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  tabIconContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  }
});
