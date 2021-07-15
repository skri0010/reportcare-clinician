/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, FC } from "react";
import { RootState } from "ic-redux/store";
import {
  StyleProp,
  View,
  ViewStyle,
  TextInput,
  TouchableOpacity
} from "react-native";
import { select } from "util/useRedux";
import { ScaledSheet, ms } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Interface for Search bar component props
interface SearchBarComponentProps {
  onUserInput: (newValue: string) => void;
  onSearchClick: () => void;
  placeholder?: string;
  containerStyle?: {
    backgroundColor?: string;
    borderColor?: string;
    color?: string;
  };
}

// Search bar component
export const SearchBarComponent: FC<SearchBarComponentProps> = ({
  onUserInput,
  onSearchClick,
  placeholder,
  containerStyle
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const searchBarContainerStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.primaryContrastTextColor,
    borderColor: colors.primaryTextColor
  };

  const searchBarTextStyle: StyleProp<ViewStyle> = {
    backgroundColor: colors.primaryContrastTextColor,
    color: colors.primaryTextColor,
    ...containerStyle
  };

  const [input, setInput] = useState<string>("");

  // On input by user, setState of component and trigger parent callback function
  const onChangeText = (newValue: string) => {
    setInput(newValue);
    onUserInput(newValue);
  };

  // JH-TODO: Replace placeholder with i18n
  return (
    <View>
      <View style={[styles.container, searchBarContainerStyle]}>
        <TextInput
          autoCorrect={false}
          onChangeText={onChangeText}
          placeholder={placeholder || "Search"}
          value={input}
          style={[
            styles.textField,
            searchBarTextStyle,
            { fontSize: fonts.h2Size, paddingHorizontal: "5@ms" }
          ]}
        />
        <TouchableOpacity onPress={onSearchClick} style={styles.button}>
          <Icon
            name="magnify"
            style={[searchBarTextStyle, { fontSize: fonts.h2Size }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
    margin: "5@ms",
    borderWidth: "1@ms",
    borderRadius: "3@ms"
  },
  textField: {
    height: "100%",
    width: "100%",
    paddingLeft: "5@ms",
    outlineWidth: "0@ms"
  },
  button: {
    margin: "5@ms"
  }
});
