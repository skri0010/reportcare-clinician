import React, { FC } from "react";
// import { CompletedRequestsTab } from "./CompletedRequestsTab";
// import { CurrentRequestsTab } from "./CurrentRequestsTab";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import { getTopTabBarOptions } from "util/getStyles";
// import { RootState, select } from "util/useRedux";
import { ScreenName, MainScreenProps } from "web/screens";
import { View, Text } from "react-native";

// const Tab = createMaterialTopTabNavigator();

export const MariaScreen: FC<MainScreenProps[ScreenName.MARIA]> = () => {
  // const { colors } = select((state: RootState) => ({
  //   colors: state.settings.colors
  // }));

  return (
    // JH-TODO: Replace names with i18n
    // <Tab.Navigator tabBarOptions={getTopTabBarOptions(colors)}>
    //   <Tab.Screen name="Current" component={CurrentRequestsTab} />
    //   <Tab.Screen name="Completed" component={CompletedRequestsTab} />
    // </Tab.Navigator>
    <View>
      <Text> Maria </Text>
    </View>
  );
};
