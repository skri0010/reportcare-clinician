import React, { FC } from "react";
import { MainScreenProps } from "web/navigation/types";
import { ScreenName } from "web/navigation";
import i18n from "util/language/i18n";
import { ScreenWrapper } from "../ScreenWrapper";
import { SettingsCard } from "./SettingsCard";
import { useDispatch } from "react-redux";
import {
  setColorScheme,
  setLanguage
} from "ic-redux/actions/settings/actionCreator";
import { darkColorScheme, lightColorScheme } from "models/ColorScheme";
import { View } from "react-native";
import { RootState, select } from "util/useRedux";
import { alternateLanguage, defaultLanguage } from "util/language";

export const SettingsScreen: FC<MainScreenProps[ScreenName.SETTINGS]> = () => {
  const { colorScheme, language } = select((state: RootState) => ({
    colorScheme: state.settings.colors,
    language: state.settings.language
  }));

  const dispatch = useDispatch();

  // Boolean for dark mode and language selected
  const darkMode =
    JSON.stringify(colorScheme) === JSON.stringify(darkColorScheme);
  const bmSelected = language === alternateLanguage;

  // Selected Language
  const languageSelected =
    bmSelected === true ? defaultLanguage : alternateLanguage;

  const toggleDarkMode = () => {
    dispatch(setColorScheme(darkMode ? lightColorScheme : darkColorScheme));
  };

  const toggleLanguageSwitch = () => {
    // Change language selected in i18n
    i18n.changeLanguage(languageSelected.toString());
    // Trigger re render to render newly selected language
    dispatch(setLanguage(languageSelected));
  };

  return (
    <ScreenWrapper>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          display: "flex",
          alignItems: "center"
        }}
      >
        <SettingsCard
          title={i18n.t("Settings.DarkMode")}
          description={i18n.t("Settings.DarkModeDescription")}
          onValueChange={() => toggleDarkMode()}
          value={darkMode}
        />
        <SettingsCard
          title={i18n.t("Settings.Language")}
          description={i18n.t("Settings.LanguageDescription")}
          onValueChange={() => toggleLanguageSwitch()}
          value={bmSelected}
        />
      </View>
    </ScreenWrapper>
  );
};
