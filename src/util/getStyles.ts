import { ViewStyle, StyleProp, TextStyle, View } from "react-native";
import { ColorScheme } from "models/ColorScheme";
import { FontScheme } from "models/FontScheme";
import { DrawerNavigationOptions } from "@react-navigation/drawer";
import { MaterialTopTabNavigationOptions } from "@react-navigation/material-top-tabs";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { StackNavigationOptions } from "@react-navigation/stack";
import { ms } from "react-native-size-matters";
import { isMobile } from "./device";

// JH-TODO-NAV: Remove export
// Style for main screen header
export const getMainScreenHeaderStyle: (
  colors: ColorScheme,
  height?: number
) => StyleProp<ViewStyle> = (colors, height = ms(40)) => {
  return {
    backgroundColor: colors.secondaryBarColor,
    height: height,
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
    fontSize: fonts.h2Size
  };
};

// Style for drawer screen
export const getDrawerScreenOptions: (input: {
  colors: ColorScheme;
  fonts: FontScheme;
  drawerWidth?: number;
}) => DrawerNavigationOptions = ({
  colors,
  fonts,
  drawerWidth = ms(isMobile ? 80 : 60) // Larger drawer width for mobile, smaller drawer width for desktop
}) => {
  const headerHeight = ms(40);
  const headerStyle = getMainScreenHeaderStyle(colors, headerHeight);
  const headerTitleStyle = getMainScreenHeaderTitleStyle(colors, fonts);

  return {
    ...(isMobile ? {} : { headerLeft: () => null }), // Show drawer icon for mobile, hide for desktop
    headerTintColor: colors.primaryContrastTextColor, // Change color of header icons (drawer)
    headerStyle: headerStyle,
    headerTitleStyle: headerTitleStyle,
    headerTitleAlign: "center",
    drawerStyle: {
      width: drawerWidth,
      borderRightWidth: 0, // Remove white line between drawer and header,
      backgroundColor: colors.secondaryBarColor,
      elevation: 0, // Remove shadow on Android
      shadowOpacity: 0 // Remove shadow on iOS
    },
    drawerLabel: () => null,
    drawerLabelStyle: { flex: 0 },
    drawerItemStyle: {
      height: drawerWidth * 0.8,
      justifyContent: "center"
    }, // Icon and label style
    drawerContentContainerStyle: { paddingTop: headerHeight },
    drawerActiveTintColor: colors.selectedIconColor,
    drawerInactiveTintColor: colors.primaryContrastIconColor,
    drawerType: isMobile ? "slide" : "permanent" // Slide for mobile, permanent for desktop
  };
};

// Style for top tabs
export const getTopTabBarOptions: (input: {
  colors: ColorScheme;
  fonts: FontScheme;
}) => MaterialTopTabNavigationOptions = ({ colors, fonts }) => {
  return {
    tabBarLabelStyle: {
      fontSize: fonts.h6Size,
      textTransform: "none",
      color: colors.primaryTextColor
    },
    tabBarIndicatorStyle: { backgroundColor: colors.primaryBarColor },
    tabBarStyle: { backgroundColor: colors.primaryBackgroundColor }
  };
};

// JH-TODO-NAV: Update
// Props for material bottom tabs options
export const getBottomTabBarOptions: (input: {
  colors: ColorScheme;
  fonts: FontScheme;
}) => BottomTabNavigationOptions = ({ colors, fonts }) => {
  return {};
};

// Props for stack options
export const getStackOptions: (input: {
  colors: ColorScheme;
  fonts: FontScheme;
}) => StackNavigationOptions = ({ colors, fonts }) => {
  return {
    headerStyle: {
      height: fonts.h1Size + ms(25),
      backgroundColor: colors.primaryBackgroundColor
    },
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: fonts.h1Size,
      paddingLeft: ms(15)
    },
    headerTintColor: colors.primaryIconColor
  };
};

// Styles for pickers
export const getPickerStyles: (input: {
  colors: ColorScheme;
  fonts: FontScheme;
  error?: boolean;
}) => {
  pickerContainerStyle: StyleProp<ViewStyle>;
  pickerStyle: StyleProp<TextStyle>;
} = ({ colors, fonts, error = false }) => {
  const pickerContainerStyle: StyleProp<ViewStyle> = {
    borderWidth: ms(2),
    height: ms(30),
    marginBottom: ms(5),
    justifyContent: "center",
    borderColor: error ? colors.errorColor : colors.primaryBorderColor
  };

  const pickerStyle: StyleProp<TextStyle> = {
    height: "100%",
    paddingLeft: ms(10),
    borderWidth: 0,
    fontSize: fonts.h6Size
  };

  return {
    pickerContainerStyle: pickerContainerStyle,
    pickerStyle: pickerStyle
  };
};
