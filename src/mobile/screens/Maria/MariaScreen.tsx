import React, { FC } from "react";
import { CompletedRequestsTab } from "./CompletedRequestsTab";
import { CurrentRequestsTab } from "./CurrentRequestsTab";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getTopTabBarOptions } from "util/getStyles";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithBottomTabsProps } from "mobile/screens";

const Tab = createMaterialTopTabNavigator();

export const MariaScreen: FC<WithBottomTabsProps[ScreenName.MARIA]> = () => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  return (
    // JH-TODO: Replace names with i18n
    <Tab.Navigator
      screenOptions={getTopTabBarOptions({ colors: colors, fonts: fonts })}
    >
      <Tab.Screen name="Current" component={CurrentRequestsTab} />
      <Tab.Screen name="Completed" component={CompletedRequestsTab} />
    </Tab.Navigator>
  );
};
