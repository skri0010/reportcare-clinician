import { Platform, View, Text, Switch } from "react-native";
import React, { FC, useState } from "react";
import { MainScreenProps } from "web/navigation/types";
import { RootState, select } from "util/useRedux";
import { ScreenName } from "web/navigation";
import {
  settingsReducer,
  SettingsState
} from "ic-redux/reducers/settingsReducer";
import {
  FontScheme,
  largeWebFont,
  normalMobileFontScheme,
  normalWebFont
} from "models/FontScheme";
import { darkColorScheme } from "models/ColorScheme/darkColorScheme";
import { LanguageID, defaultLanguage, alternateLanguage } from "util/language";
import { isMobile } from "util/device";
import { setColorScheme } from "ic-redux/actions/settings/actionCreator";
import { DarkModeButton } from "./DarkModeButton";
import { LanguageButton } from "./LanguageButton";

export const SettingsScreen: FC<MainScreenProps[ScreenName.SETTINGS]> = () => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  return (
    <View>
      <DarkModeButton />
      <LanguageButton />
    </View>
  );
};
