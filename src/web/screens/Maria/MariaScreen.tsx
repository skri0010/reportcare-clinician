import React, { FC } from "react";
// import { CompletedRequestsTab } from "./CompletedRequestsTab";
// import { CurrentRequestsTab } from "./CurrentRequestsTab";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import { getTopTabBarOptions } from "util/getStyles";
// import { RootState, select } from "util/useRedux";
// import i18n from "util/language/i18n";
import { MainScreenProps } from "web/navigation/types";
import { ScreenName } from "web/navigation";
import { View, Text } from "react-native";

// const Tab = createMaterialTopTabNavigator();

export const MariaScreen: FC<MainScreenProps[ScreenName.MARIA]> = () => {
  // const { colors } = select((state: RootState) => ({
  //   colors: state.settings.colors
  // }));

  return (
    // <Tab.Navigator tabBarOptions={getTopTabBarOptions(colors)}>
    //   <Tab.Screen
    //     name={i18n.t("Maria.Current")}
    //     component={CurrentRequestsTab}
    //   />
    //   <Tab.Screen
    //     name={i18n.t("Maria.Completed")}
    //     component={CompletedRequestsTab}
    //   />
    // </Tab.Navigator>
    <View>
      <Text> Maria </Text>
    </View>
  );
};
