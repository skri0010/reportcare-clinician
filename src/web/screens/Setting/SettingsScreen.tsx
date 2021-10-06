import { View } from "react-native";
import React, { FC } from "react";
import { MainScreenProps } from "web/navigation/types";
import { RootState, select } from "util/useRedux";
import { ScreenName } from "web/navigation";
import { DarkModeButton } from "./DarkModeButton";
import { LanguageButton } from "./LanguageButton";
import i18n from "util/language/i18n";
import { ScreenWrapper } from "../ScreenWrapper";
import { SettingsCard } from "./SettingsCard";

export const SettingsScreen: FC<MainScreenProps[ScreenName.SETTINGS]> = () => {
  return (
    <ScreenWrapper>
      <SettingsCard
        title={i18n.t("Settings.DarkMode")}
        description={i18n.t("Settings.DarkModeDescription")}
        type
      />
      <SettingsCard
        title={i18n.t("Settings.Language")}
        description={i18n.t("Settings.LanguageDescription")}
        type={false}
      />
    </ScreenWrapper>
  );
};
