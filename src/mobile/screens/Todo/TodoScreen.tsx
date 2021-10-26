import React, { FC } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { TodoCurrentTab } from "./TodoCurrentTab";
import { TodoCompletedTab } from "./TodoCompletedTab";
import { getTopTabBarOptions } from "util/getStyles";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithBottomTabsProps } from "mobile/screens";
import i18n from "util/language/i18n";

const Tab = createMaterialTopTabNavigator();

export const TodoScreen: FC<WithBottomTabsProps[ScreenName.TODO]> = () => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  return (
    <Tab.Navigator
      screenOptions={getTopTabBarOptions({ colors: colors, fonts: fonts })}
    >
      <Tab.Screen name={i18n.t("Todo.Current")} component={TodoCurrentTab} />
      <Tab.Screen
        name={i18n.t("Todo.Completed")}
        component={TodoCompletedTab}
      />
    </Tab.Navigator>
  );
};
