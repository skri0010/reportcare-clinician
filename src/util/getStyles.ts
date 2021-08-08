import { ViewStyle, StyleProp } from "react-native";
import { ColorScheme } from "models/ColorScheme";
import { ms } from "react-native-size-matters";
import { MaterialTopTabBarOptions } from "@react-navigation/material-top-tabs";
import { DrawerContentOptions } from "@react-navigation/drawer";

// Props for material top tabs options
export const getTopTabBarOptions: (
  colors: ColorScheme
) => MaterialTopTabBarOptions = (colors) => {
  return {
    activeTintColor: colors.primaryContrastTextColor,
    inactiveTintColor: colors.primaryContrastTextColor,
    indicatorStyle: {
      backgroundColor: colors.primaryIndicatorColor,
      marginBottom: ms(2),
      height: ms(3)
    },
    style: {
      backgroundColor: colors.primaryBarColor,
      elevation: 0, // Remove shadow on Android
      shadowOpacity: 0 // Remove shadow on iOS
    }
  };
};

// Props for material bottom tabs options
export const getBottomTabBarOptions: (
  colors: ColorScheme
) => MaterialTopTabBarOptions = (colors) => {
  return {
    activeTintColor: colors.selectedTextColor,
    inactiveTintColor: colors.primaryContrastTextColor,
    indicatorStyle: {
      backgroundColor: colors.primaryIndicatorColor,
      height: ms(3)
    },
    style: {
      backgroundColor: colors.primaryBarColor,
      elevation: 0, // Remove shadow on Android
      shadowOpacity: 0 // Remove shadow on iOS
    }
  };
};

// Props for material side tabs options
export const getSideTabBarOptions: (
  colors: ColorScheme
) => DrawerContentOptions = (colors) => {
  return getBottomTabBarOptions(colors) as DrawerContentOptions;
};

export const getMainScreenHeaderStyle: (
  colors: ColorScheme
) => StyleProp<ViewStyle> = (colors) => {
  return {
    backgroundColor: colors.primaryBarColor,
    elevation: 0, // Remove shadow on Android
    shadowOpacity: 0, // Remove shadow on iOS
    borderBottomWidth: 0
  };
};
