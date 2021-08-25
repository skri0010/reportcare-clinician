import React, { FC } from "react";
import { MainScreenProps } from "web/navigation/types";
import { ScreenName } from "web/navigation";
import { View, Text } from "react-native";

export const SettingsScreen: FC<MainScreenProps[ScreenName.SETTINGS]> = () => {
  return (
    <View>
      <Text> Settings </Text>
    </View>
  );
};
