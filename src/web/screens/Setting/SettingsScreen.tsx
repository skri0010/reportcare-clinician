import React, { FC } from "react";
import { MainScreenProps } from "web/navigation/types";
import { ScreenName } from "web/navigation";
import i18n from "util/language/i18n";
import { SettingsCard } from "./SettingsCard";
import { useDispatch } from "react-redux";
import {
  setColorScheme,
  setLanguage
} from "ic-redux/actions/settings/actionCreator";
import { View } from "react-native";
import { RootState, select } from "util/useRedux";
import { alternateLanguage, defaultLanguage } from "util/language";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { ColorSchemeName } from "models/ColorScheme";

export const SettingsScreen: FC<MainScreenProps[ScreenName.SETTINGS]> = () => {
  const { colorSchemeName, language } = select((state: RootState) => ({
    colorSchemeName: state.settings.colorSchemeName,
    language: state.settings.language
  }));

  const dispatch = useDispatch();

  // FUTURE-TODO: If you wish to incorporate additional color schemes, this boolean should be modified as well
  // Boolean for dark mode and language selected
  const darkMode = colorSchemeName === ColorSchemeName.DARK;
  const bmSelected = language === alternateLanguage;

  // Selected Language
  const languageSelected =
    bmSelected === true ? defaultLanguage : alternateLanguage;

  const toggleDarkMode = () => {
    // FUTURE-TODO: If you wish to incorporate additional color schemes, this should be replaced to directly use ColorSchemeName
    dispatch(
      setColorScheme(darkMode ? ColorSchemeName.LIGHT : ColorSchemeName.DARK)
    );
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
