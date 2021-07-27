import React, { FC } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen } from "web/screens/Home/HomeScreen";
import { CliniciansTab } from "web/screens/People/CliniciansTab";
import { PatientsTab } from "web/screens/People/PatientsTab";
import { ChatScreen } from "web/screens/Chat/ChatScreen";
import { TodoScreen } from "web/screens/Todo/TodoScreen";
import { MariaScreen } from "web/screens/Maria/MariaScreen";
import { SettingScreen } from "web/screens/Setting/SettingScreen";
import { HelpScreen } from "web/screens/Help/HelpScreen";
import { ScreenName, SideTabsParamList, MainScreenProps } from "./screens";
import { select, RootState } from "util/useRedux";
import { getBottomTabBarOptions } from "util/getStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ms, ScaledSheet } from "react-native-size-matters";
import { View, Text, TextStyle } from "react-native";

const Drawer = createDrawerNavigator<SideTabsParamList>();

interface TabIconProps {
  name: string;
  color: string;
  subtitle: string;
}

export const SideNavigationBar: FC<MainScreenProps> = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const menuTitleColor = {
    color: colors.primaryContrastTextColor
  } as TextStyle;

  const iconSize = ms(15);
  const drawerSize = ms(48);

  const TabIcon: FC<TabIconProps> = ({ name, color, subtitle }) => {
    return (
      <View>
        <Icon
          style={styles.icon}
          name={name}
          color={color}
          size={ms(iconSize)}
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
        width: drawerSize
      }}
      initialRouteName={ScreenName.TODO}
    >
      <Drawer.Screen
        name={ScreenName.HOME}
        component={HomeScreen}
        options={{
          drawerIcon: ({ color }) => (
            <TabIcon name="home" color={color} subtitle="Home" />
          ),
          drawerLabel: () => null,
          headerTitleAlign: "center"
        }}
      />
      <Drawer.Screen
        name={ScreenName.PATIENT}
        component={PatientsTab}
        options={{
          drawerIcon: ({ color }) => (
            <TabIcon name="account-circle" color={color} subtitle="Patients" />
          ),
          drawerLabel: () => null
        }}
      />
      <Drawer.Screen
        name={ScreenName.CLINICIAN}
        component={CliniciansTab}
        options={{
          drawerIcon: ({ color }) => (
            <TabIcon name="stethoscope" color={color} subtitle="Clinicians" />
          ),
          drawerLabel: () => null
        }}
      />
      <Drawer.Screen
        name={ScreenName.CHAT}
        component={ChatScreen}
        options={{
          drawerIcon: ({ color }) => (
            <TabIcon name="chat" color={color} subtitle="Chat" />
          ),
          drawerLabel: () => null
        }}
      />
      <Drawer.Screen
        name={ScreenName.TODO}
        component={TodoScreen}
        options={{
          drawerIcon: ({ color }) => (
            <TabIcon name="note-text" color={color} subtitle="Todo" />
          ),
          drawerLabel: () => null
        }}
      />
      <Drawer.Screen
        name={ScreenName.MARIA}
        component={MariaScreen}
        options={{
          drawerIcon: ({ color }) => (
            <TabIcon name="face-agent" color={color} subtitle="MARIA" />
          ),
          drawerLabel: () => null
        }}
      />
      <Drawer.Screen
        name={ScreenName.SETTING}
        component={SettingScreen}
        options={{
          drawerIcon: ({ color }) => (
            <TabIcon name="cog" color={color} subtitle="Settings" />
          ),
          drawerLabel: () => null
        }}
      />
      <Drawer.Screen
        name={ScreenName.HELP}
        component={HelpScreen}
        options={{
          drawerIcon: ({ color }) => (
            <TabIcon name="help-circle-outline" color={color} subtitle="Help" />
          ),
          drawerLabel: () => null
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = ScaledSheet.create({
  icon: {
    alignSelf: "center"
  },
  text: {
    textAlign: "center",
    fontSize: "6@ms"
  }
});
