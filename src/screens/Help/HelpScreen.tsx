import React, { FC } from "react";
import { ScreenName, WithSideTabsProps } from "screens";
import { View, Text } from "react-native";

export const HelpScreen: FC<WithSideTabsProps[ScreenName.HELP]> = () => {
  return (
    <View>
      <Text> HELP </Text>
    </View>
  );
};
