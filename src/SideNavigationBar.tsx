import React, { FC } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen } from "screens/Home/HomeScreen";
import { CliniciansTab } from "screens/People/CliniciansTab";
import { PatientsTab } from "screens/People/PatientsTab";
import { ChatScreen } from "screens/Chat/ChatScreen";
import { TodoScreen } from "screens/Todo/TodoScreen";
import { MariaScreen } from "screens/Maria/MariaScreen";
import { SettingScreen } from "screens/Setting/SettingScreen";
import { HelpScreen } from "screens/Help/HelpScreen";
import { ScreenName, SideTabsParamList, MainScreenProps } from "screens";
import { select, RootState } from "util/useRedux";
import { getBottomTabBarOptions } from "shared/util/getStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ms, ScaledSheet } from "react-native-size-matters";
import { View, Text, TextStyle } from "react-native";

const Drawer = createDrawerNavigator<SideTabsParamList>();

interface TabIconProps {
  name: string;
  color: string;
  size: number;
  subtitle: string;
}

export const SideNavigationBar: FC<MainScreenProps> = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const menuTitleColor = {
    color: colors.primaryContrastTextColor
  } as TextStyle;

  const TabIcon: FC<TabIconProps> = ({ name, color, size, subtitle }) => {
    return (
      <View>
        <Icon
          style={styles.icon}
          name={name}
          color={color}
          size={ms(size, 0.25)}
        />
        <Text style={[styles.text, menuTitleColor]}> {subtitle} </Text>
      </View>
    );
  };

  return (
    <Drawer.Navigator
      drawerType="permanent"
      drawerContentOptions={getBottomTabBarOptions(colors)}
      drawerStyle={{
        backgroundColor: colors.primaryBarColor,
        width: 90
      }}
    >
      <Drawer.Screen
        name={ScreenName.HOME}
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <TabIcon name="home" color={color} size={size} subtitle="Home" />
          ),
          drawerLabel: () => null
        }}
      />
      <Drawer.Screen
        name={ScreenName.PATIENT}
        component={PatientsTab}
        options={{
          drawerIcon: ({ color, size }) => (
            <TabIcon
              name="account-circle"
              color={color}
              size={size}
              subtitle="Patients"
            />
          ),
          drawerLabel: () => null
        }}
      />
      <Drawer.Screen
        name={ScreenName.CLINICIAN}
        component={CliniciansTab}
        options={{
          drawerIcon: ({ color, size }) => (
            <TabIcon
              name="stethoscope"
              color={color}
              size={size}
              subtitle="Clinicians"
            />
          ),
          drawerLabel: () => null
        }}
      />
      <Drawer.Screen
        name={ScreenName.CHAT}
        component={ChatScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <TabIcon name="chat" color={color} size={size} subtitle="Chat" />
          ),
          drawerLabel: () => null
        }}
      />
      <Drawer.Screen
        name={ScreenName.TODO}
        component={TodoScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <TabIcon
              name="note-text"
              color={color}
              size={size}
              subtitle="Todo"
            />
          ),
          drawerLabel: () => null
        }}
      />
      <Drawer.Screen
        name={ScreenName.MARIA}
        component={MariaScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <TabIcon
              name="face-agent"
              color={color}
              size={size}
              subtitle="MARIA"
            />
          ),
          drawerLabel: () => null
        }}
      />
      <Drawer.Screen
        name={ScreenName.SETTING}
        component={SettingScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <TabIcon name="cog" color={color} size={size} subtitle="Settings" />
          ),
          drawerLabel: () => null
        }}
      />
      <Drawer.Screen
        name={ScreenName.HELP}
        component={HelpScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <TabIcon
              name="help-circle-outline"
              color={color}
              size={size}
              subtitle="Help"
            />
          ),
          drawerLabel: () => null
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = ScaledSheet.create({
  icon: {
    paddingLeft: "7@ms"
  },
  text: {
    textAlign: "center",
    fontSize: "6@ms"
  }
});
