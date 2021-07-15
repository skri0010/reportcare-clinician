import React, { FC } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "mobile/screens/Home/HomeScreen";
import { PeopleScreen } from "mobile/screens/People/PeopleScreen";
import { ChatScreen } from "mobile/screens/Chat/ChatScreen";
import { TodoScreen } from "mobile/screens/Todo/TodoScreen";
import { MariaScreen } from "mobile/screens/Maria/MariaScreen";
import {
  ScreenName,
  BottomTabsParamList,
  MainScreenProps
} from "mobile/screens";
import { getBottomTabBarOptions } from "util/getStyles";
import { select, RootState } from "util/useRedux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ms } from "react-native-size-matters";

const Tab = createBottomTabNavigator<BottomTabsParamList>();

interface TabIconProps {
  name: string;
  color: string;
  size: number;
}

export const BottomNavigationBar: FC<MainScreenProps> = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const TabIcon: FC<TabIconProps> = ({ name, color, size }) => {
    return <Icon name={name} color={color} size={ms(size, 1)} />;
  };

  return (
    <Tab.Navigator tabBarOptions={getBottomTabBarOptions(colors)}>
      <Tab.Screen
        name={ScreenName.HOME}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="home" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name={ScreenName.PEOPLE}
        component={PeopleScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="account-circle" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name={ScreenName.CHAT}
        component={ChatScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="chat" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name={ScreenName.TODO}
        component={TodoScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="note-text" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name={ScreenName.MARIA}
        component={MariaScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="face-agent" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  );
};
