/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, FC } from "react";
import { RootState } from "ic-redux/store";
import { StyleProp, ViewStyle } from "react-native";
import { SearchBar } from "react-native-elements";
import { select } from "util/useRedux";

// Interface for Search bar component props
interface SearchBarComponentProps {
  onUserInput: (newValue: string) => void;
  placeholder?: string;
  containerStyle?: {
    backgroundColor?: string;
    borderBottomColor?: string;
    borderTopColor?: string;
  };
  inputContainerStyle?: {
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    // Known issue with bottom border, https://github.com/react-native-elements/react-native-elements/issues/2495
    borderBottomWidth?: number;
  };
}

// Search bar component
export const SearchBarComponent: FC<SearchBarComponentProps> = ({
  onUserInput,
  placeholder,
  containerStyle,
  inputContainerStyle
}) => {
  const { colors } = select((state: RootState) => ({
    colors: state.settings.colors
  }));

  const searchBarContainerStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.primaryBarColor,
    borderBottomColor: colors.primaryBarColor,
    borderTopColor: colors.primaryBarColor,
    ...containerStyle
  };

  const searchBarInputContainerStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.primaryBackgroundColor,
    ...inputContainerStyle
  };

  const [input, setInput] = useState<string>("");

  // On input by user, setState of component and trigger parent callback function
  const onChangeText = (newValue: string) => {
    setInput(newValue);
    onUserInput(newValue);
  };

  // JH-TODO: Replace placeholder with i18n
  return null;
  // <SearchBar
  //   platform="default"
  //   placeholder={placeholder || "Search"}
  //   onChangeText={onChangeText}
  //   value={input}
  //   containerStyle={searchBarContainerStyle}
  //   inputContainerStyle={searchBarInputContainerStyle}
  // />
};
