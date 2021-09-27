import React, { FC, useEffect, useState } from "react";
import { MainScreenProps } from "web/navigation/types";
import { ScreenName } from "web/navigation";
import { View, Text, TouchableOpacity } from "react-native";
import { RootState, select, store } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";
import {
  setLanguage,
  setColorScheme,
  setFontScheme
} from "ic-redux/actions/settings/actionCreator";
import { LanguageID } from "util/language";
import i18n from "util/language/i18n";
import { darkColorScheme, lightColorScheme } from "models/ColorScheme";
import { normalWebFont, largeWebFont } from "models/FontScheme";

// JQ-TODO : Buttons are just for testing purposes and will be removed later on
export const SettingsScreen: FC<MainScreenProps[ScreenName.SETTINGS]> = () => {
  const { colors, language } = select((state: RootState) => ({
    colors: state.settings.colors,
    language: state.settings.language
  }));

  const [lang, setLang] = useState<LanguageID>(language);

  useEffect(() => {
    store.dispatch(setLanguage(lang));
    i18n.changeLanguage(lang.toString());
  }, [lang]);
  return (
    <View>
      {/* Language */}
      <TouchableOpacity
        onPress={() => {
          setLang(LanguageID.ms);
        }}
        style={styles.button}
      >
        <Text> BM </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setLang(LanguageID.en);
        }}
        style={styles.button}
      >
        <Text> EN </Text>
      </TouchableOpacity>

      {/* Color mode */}
      <TouchableOpacity
        onPress={() => {
          store.dispatch(setColorScheme(darkColorScheme));
        }}
        style={styles.button}
      >
        <Text> Dark </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          store.dispatch(setColorScheme(lightColorScheme));
        }}
        style={styles.button}
      >
        <Text> Light </Text>
      </TouchableOpacity>

      {/* Font size */}
      <TouchableOpacity
        onPress={() => {
          store.dispatch(setFontScheme(normalWebFont));
        }}
        style={styles.button}
      >
        <Text> Small Font </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          store.dispatch(setFontScheme(largeWebFont));
        }}
        style={styles.button}
      >
        <Text> Large Font </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = ScaledSheet.create({
  button: {
    margin: "5@ms",
    width: "50@ms",
    borderColor: "black",
    borderWidth: "1@ms"
  }
});
