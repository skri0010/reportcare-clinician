import React, { FC } from "react";
import {
  createDrawerNavigator,
  DrawerNavigationOptions
} from "@react-navigation/drawer";
import { HomeScreen } from "web/screens/Home/HomeScreen";
import { CliniciansScreen } from "web/screens/People/CliniciansScreen";
import { PatientsScreen } from "web/screens/People/PatientsScreen";
import { ChatScreen } from "web/screens/Chat/ChatScreen";
import { TodoScreen } from "web/screens/Todo/TodoScreen";
import { MariaScreen } from "web/screens/Maria/MariaScreen";
import { SettingsScreen } from "web/screens/Setting/SettingsScreen";
import { MainScreenTabButton } from "components/Buttons/MainScreenTabButton";
import { ScreenName, MainScreenParamList } from "web/screens";
import { select, RootState } from "util/useRedux";
import { getDrawerScreenOptions } from "util/getStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ms } from "react-native-size-matters";
import i18n from "util/language/i18n";

interface DrawerNavigationProps {
  signOut: () => void;
}

const Drawer = createDrawerNavigator<MainScreenParamList>();

export const DrawerNavigation: FC<DrawerNavigationProps> = ({ signOut }) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  // Helper methods for screen options
  const screenOptions = getDrawerScreenOptions({
    colors: colors,
    fonts: fonts
  });
  const buildScreenOptions: (input: {
    iconName: string;
    iconLabel: string;
  }) => DrawerNavigationOptions = ({ iconName, iconLabel }) => ({
    ...screenOptions,
    headerRight: () => <SignOutButton />, // Display sign out button
    drawerIcon: ({ color }) => (
      <MainScreenTabButton
        name={iconName}
        subtitle={iconLabel}
        iconColor={color}
        textColor={color}
      />
    )
  });

  const headerButtonSize = ms(20);
  // Sign out button
  const SignOutButton: FC = () => {
    return (
      <Icon
        name="logout"
        color={colors.primaryContrastTextColor}
        size={headerButtonSize}
        style={{ paddingRight: headerButtonSize }}
        onPress={signOut}
      />
    );
  };

  return (
    <Drawer.Navigator initialRouteName={ScreenName.HOME} defaultStatus="open">
      <Drawer.Screen
        name={ScreenName.HOME}
        component={HomeScreen}
        options={{
          ...buildScreenOptions({
            iconName: "home",
            iconLabel: i18n.t("ScreenName.Home")
          })
        }}
      />
      <Drawer.Screen
        name={ScreenName.PATIENTS}
        component={PatientsScreen}
        options={{
          ...buildScreenOptions({
            iconName: "account-circle",
            iconLabel: i18n.t("ScreenName.Patients")
          })
        }}
      />
      <Drawer.Screen
        name={ScreenName.CLINICIANS}
        component={CliniciansScreen}
        options={{
          ...buildScreenOptions({
            iconName: "stethoscope",
            iconLabel: i18n.t("ScreenName.Clinicians")
          })
        }}
      />
      <Drawer.Screen
        name={ScreenName.CHAT}
        component={ChatScreen}
        options={{
          ...buildScreenOptions({
            iconName: "chat",
            iconLabel: i18n.t("ScreenName.Chat")
          })
        }}
      />
      <Drawer.Screen
        name={ScreenName.TODO}
        component={TodoScreen}
        options={{
          ...buildScreenOptions({
            iconName: "note-text",
            iconLabel: i18n.t("ScreenName.Todo")
          })
        }}
      />
      <Drawer.Screen
        name={ScreenName.MARIA}
        component={MariaScreen}
        options={{
          ...buildScreenOptions({
            iconName: "face-agent",
            iconLabel: i18n.t("ScreenName.MARIA")
          })
        }}
      />
      <Drawer.Screen
        name={ScreenName.SETTINGS}
        component={SettingsScreen}
        options={{
          ...buildScreenOptions({
            iconName: "cog",
            iconLabel: i18n.t("ScreenName.Settings")
          })
        }}
      />
    </Drawer.Navigator>
  );
};
