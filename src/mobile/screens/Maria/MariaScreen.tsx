import React, { FC } from "react";
import { CompletedRequestsTab } from "./CompletedRequestsTab";
import { CurrentRequestsTab } from "./CurrentRequestsTab";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getTopTabBarOptions } from "util/getStyles";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithBottomTabsProps } from "mobile/screens";
import i18n from "util/language/i18n";

const Tab = createMaterialTopTabNavigator();

export const MariaScreen: FC<WithBottomTabsProps[ScreenName.MARIA]> = () => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  return (
    <Tab.Navigator
      screenOptions={getTopTabBarOptions({ colors: colors, fonts: fonts })}
    >
      <Tab.Screen
        name={i18n.t("Maria.Current")}
        component={CurrentRequestsTab}
      />
      <Tab.Screen
        name={i18n.t("Maria.Completed")}
        component={CompletedRequestsTab}
      />
    </Tab.Navigator>
  );
};
