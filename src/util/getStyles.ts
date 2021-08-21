import { ViewStyle, StyleProp, TextStyle } from "react-native";
import { ColorScheme } from "models/ColorScheme";
import { ms } from "react-native-size-matters";
import { MaterialTopTabBarOptions } from "@react-navigation/material-top-tabs";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { FontScheme } from "models/FontScheme";

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

// JH-TODO-NAV: Remove export
// Style for main screen header
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

// Style for main screen header title
const getMainScreenHeaderTitleStyle: (
  colors: ColorScheme,
  fonts: FontScheme
) => TextStyle = (colors, fonts) => {
  return {
    color: colors.primaryContrastTextColor,
    fontSize: fonts.h4Size
  };
};

// Style for drawer screen
export const getDrawerScreenOptions: (input: {
  colors: ColorScheme;
  fonts: FontScheme;
  drawerWidth?: number;
}) => DrawerNavigationOptions = ({ colors, fonts, drawerWidth = ms(60) }) => {
  const headerStyle = getMainScreenHeaderStyle(colors);
  const headerTitleStyle = getMainScreenHeaderTitleStyle(colors, fonts);

  return {
    headerLeft: () => null, // Hide drawer icon,
    headerStyle: headerStyle,
    headerTitleStyle: headerTitleStyle,
    drawerStyle: {
      width: drawerWidth,
      borderRightWidth: 0, // Remove white line between drawer and header,
      backgroundColor: colors.primaryBarColor,
      elevation: 0, // Remove shadow on Android
      shadowOpacity: 0 // Remove shadow on iOS
    },
    drawerActiveTintColor: colors.selectedTextColor,
    drawerType: "permanent"
  };
};
