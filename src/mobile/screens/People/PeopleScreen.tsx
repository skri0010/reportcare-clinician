import React, { FC } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PatientsTab } from "./PatientsTab";
import { CliniciansTab } from "./CliniciansTab";
import { getTopTabBarOptions } from "util/getStyles";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithBottomTabsProps } from "mobile/screens";
import i18n from "util/language/i18n";

const Tab = createMaterialTopTabNavigator();

export const PeopleScreen: FC<WithBottomTabsProps[ScreenName.PEOPLE]> = () => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  return (
    <Tab.Navigator
      screenOptions={getTopTabBarOptions({ colors: colors, fonts: fonts })}
    >
      <Tab.Screen
        name={i18n.t("ScreenName.Patients")}
        component={PatientsTab}
      />
      <Tab.Screen
        name={i18n.t("ScreenName.Clinicians")}
        component={CliniciansTab}
      />
    </Tab.Navigator>
  );
};
