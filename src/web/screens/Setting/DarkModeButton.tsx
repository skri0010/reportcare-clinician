import React, { FC, useState } from "react";
import { useDispatch } from "util/useRedux";
import { setColorScheme } from "ic-redux/actions/settings/actionCreator";
import { lightColorScheme } from "models/ColorScheme";
import { darkColorScheme } from "models/ColorScheme/darkColorScheme";
import { Switch } from "react-native";

export const DarkModeButton: FC = () => {
  const [darkMode, setIsDarkMode] = useState<boolean>(false);

  const dispatch = useDispatch();

  const toggleDarkMode = () => {
    setIsDarkMode(!darkMode);
    dispatch(setColorScheme(darkMode ? lightColorScheme : darkColorScheme));
  };

  return (
    <Switch
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      thumbColor={darkMode ? "#f5dd4b" : "#f4f3f4"}
      ios_backgroundColor="#3e3e3e"
      onValueChange={toggleDarkMode}
      value={darkMode}
    />
  );
};
