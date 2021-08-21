import React, { FC } from "react";
import { ScreenName, MainScreenProps } from "web/screens";
import { View, Text } from "react-native";

export const SettingsScreen: FC<MainScreenProps[ScreenName.SETTINGS]> = () => {
  return (
    <View>
      <Text> Settings </Text>
    </View>
  );
};
