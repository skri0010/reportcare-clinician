import { ColorScheme } from "models/ColorScheme";
import { ms } from "react-native-size-matters";
import { MaterialTopTabBarOptions } from "@react-navigation/material-top-tabs";

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
