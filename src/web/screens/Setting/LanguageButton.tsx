import React, { FC, useState } from "react";
import { RootState, select, useDispatch } from "util/useRedux";
import { setLanguage } from "ic-redux/actions/settings/actionCreator";
import { Switch } from "react-native";
import { defaultLanguage, alternateLanguage } from "util/language";

export const LanguageButton: FC = () => {
  const [language, setLang] = useState<boolean>(false);

  const langTotal = select((state: RootState) => ({
    langTotal: state.settings.language
  }));

  const dispatch = useDispatch();

  const toggleLanguageSwitch = () => {
    setLang(!language);
    dispatch(setLanguage(language ? defaultLanguage : alternateLanguage));
    // eslint-disable-next-line no-console
    console.log(langTotal);
  };

  return (
    <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={language ? "#f5dd4b" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleLanguageSwitch}
      value={language}
    />
  );
};
