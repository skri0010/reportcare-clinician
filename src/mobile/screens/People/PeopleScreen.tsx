import React, { FC } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PatientsTab } from "./PatientsTab";
import { CliniciansTab } from "./CliniciansTab";
import { getTopTabBarOptions } from "util/getStyles";
import { RootState, select } from "util/useRedux";
import { ScreenName, WithBottomTabsProps } from "mobile/screens";

const Tab = createMaterialTopTabNavigator();

export const PeopleScreen: FC<WithBottomTabsProps[ScreenName.PEOPLE]> = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    // JH-TODO: Replace names with i18n
    <Tab.Navigator tabBarOptions={getTopTabBarOptions(colors)}>
      <Tab.Screen name="Patients" component={PatientsTab} />
      <Tab.Screen name="Clinicians" component={CliniciansTab} />
    </Tab.Navigator>
  );
};
