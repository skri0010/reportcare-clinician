import React, { FC } from "react";
import { ScreenName, MainScreenProps } from "web/screens";
import { View, Text } from "react-native";

export const SettingScreen: FC<MainScreenProps[ScreenName.SETTING]> = () => {
  return (
    <View>
      <Text> Settings </Text>
    </View>
  );
};
