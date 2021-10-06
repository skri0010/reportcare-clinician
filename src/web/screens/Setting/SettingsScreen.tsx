import React, { FC } from "react";
import { MainScreenProps } from "web/navigation/types";
import { ScreenName } from "web/navigation";
import { Text } from "react-native";

export const SettingsScreen: FC<MainScreenProps[ScreenName.SETTINGS]> = () => {
  return <Text>Settings</Text>;
};
