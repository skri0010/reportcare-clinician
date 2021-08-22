import React, { FC, useCallback } from "react";
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

  // Options for all screen
  const buildScreenOptions: () => DrawerNavigationOptions = useCallback(() => {
    // Sign out button
    const SignOutButton: FC = () => {
      const headerButtonSize = ms(20);
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

    return {
      ...getDrawerScreenOptions({
        colors: colors,
        fonts: fonts
      }),
      headerRight: () => <SignOutButton /> // Display sign out button
    };
  }, [colors, fonts, signOut]);

  // Options for individual screens
  const buildOptions: (input: {
    iconName: string;
    iconLabel: string;
  }) => DrawerNavigationOptions = ({ iconName, iconLabel }) => ({
    drawerIcon: ({ color }) => (
      <MainScreenTabButton
        name={iconName}
        subtitle={iconLabel}
        iconColor={color}
        textColor={color}
      />
    )
  });

  // Type check params list. Required because initialParams is insufficient due to Partial<>
  const initialParamsList: MainScreenParamList = {
    [ScreenName.HOME]: undefined,
    [ScreenName.PATIENTS]: {},
    [ScreenName.CLINICIANS]: undefined,
    [ScreenName.CHAT]: undefined,
    [ScreenName.TODO]: undefined,
    [ScreenName.MARIA]: undefined,
    [ScreenName.SETTINGS]: undefined
  };

  return (
    <Drawer.Navigator
      initialRouteName={ScreenName.HOME}
      screenOptions={buildScreenOptions}
      defaultStatus="open"
    >
      <Drawer.Screen
        name={ScreenName.HOME}
        component={HomeScreen}
        options={{
          ...buildOptions({
            iconName: "home",
            iconLabel: i18n.t("ScreenName.Home")
          })
        }}
      />
      <Drawer.Screen
        name={ScreenName.PATIENTS}
        component={PatientsScreen}
        options={{
          ...buildOptions({
            iconName: "account-circle",
            iconLabel: i18n.t("ScreenName.Patients")
          })
        }}
        initialParams={initialParamsList[ScreenName.PATIENTS]}
      />
      <Drawer.Screen
        name={ScreenName.CLINICIANS}
        component={CliniciansScreen}
        options={{
          ...buildOptions({
            iconName: "stethoscope",
            iconLabel: i18n.t("ScreenName.Clinicians")
          })
        }}
      />
      <Drawer.Screen
        name={ScreenName.CHAT}
        component={ChatScreen}
        options={{
          ...buildOptions({
            iconName: "chat",
            iconLabel: i18n.t("ScreenName.Chat")
          })
        }}
      />
      <Drawer.Screen
        name={ScreenName.TODO}
        component={TodoScreen}
        options={{
          ...buildOptions({
            iconName: "note-text",
            iconLabel: i18n.t("ScreenName.Todo")
          })
        }}
        initialParams={{}}
      />
      <Drawer.Screen
        name={ScreenName.MARIA}
        component={MariaScreen}
        options={{
          ...buildOptions({
            iconName: "face-agent",
            iconLabel: i18n.t("ScreenName.MARIA")
          })
        }}
      />
      <Drawer.Screen
        name={ScreenName.SETTINGS}
        component={SettingsScreen}
        options={{
          ...buildOptions({
            iconName: "cog",
            iconLabel: i18n.t("ScreenName.Settings")
          })
        }}
      />
    </Drawer.Navigator>
  );
};
