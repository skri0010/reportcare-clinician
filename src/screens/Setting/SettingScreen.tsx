import React, { FC } from "react";
import { ScreenName, WithSideTabsProps } from "screens";
import { View, Text } from "react-native";

export const SettingScreen: FC<WithSideTabsProps[ScreenName.SETTING]> = () => {
  return (
    <View>
      <Text> Settings </Text>
    </View>
  );
};
