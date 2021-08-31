import React, { FC } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TodoCurrentTab } from "./TodoCurrentTab";
import { TodoCompletedTab } from "./TodoCompletedTab";
import { getTopTabBarOptions } from "util/getStyles";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithBottomTabsProps } from "mobile/screens";

const Tab = createMaterialTopTabNavigator();

export const TodoScreen: FC<WithBottomTabsProps[ScreenName.TODO]> = () => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  return (
    // JH-TODO: Replace names with i18n
    <Tab.Navigator
      screenOptions={getTopTabBarOptions({ colors: colors, fonts: fonts })}
    >
      <Tab.Screen name="Todo" component={TodoCurrentTab} />
      <Tab.Screen name="Completed" component={TodoCompletedTab} />
    </Tab.Navigator>
  );
};
