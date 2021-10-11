import React, { useState, FC } from "react";
import { select, RootState } from "util/useRedux";
import {
  StyleProp,
  View,
  ViewStyle,
  TextInput,
  TouchableOpacity,
  Platform
} from "react-native";
import { ScaledSheet, ms } from "react-native-size-matters";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

// Interface for Search bar component props
interface SearchBarComponentProps {
  onUserInput: (newValue: string) => void;
  onSearchClick: (searchString: string) => void;
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
    borderColor: colors.primaryBorderColor
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
    <View style={{ backgroundColor: colors.primaryBackgroundColor }}>
      <View
        style={[
          styles.container,
          searchBarContainerStyle,
          { backgroundColor: colors.primaryBackgroundColor }
        ]}
      >
        <TextInput
          autoCorrect={false}
          onChangeText={onChangeText}
          placeholder={placeholder || "Search"}
          value={input}
          style={[
            styles.textField,
            searchBarTextStyle,
            {
              fontSize: fonts.h4Size,
              paddingHorizontal: ms(5),
              backgroundColor: colors.primaryBackgroundColor
            },
            Platform.select({
              android: {},
              ios: {},
              default: {
                outlineStyle: "none"
              }
            } as any)
          ]}
        />
        <TouchableOpacity
          onPress={() => onSearchClick(input)}
          style={styles.button}
        >
          <Icon
            name="magnify"
            style={[
              searchBarTextStyle,
              { fontSize: fonts.h4Size },
              { backgroundColor: colors.primaryBackgroundColor }
            ]}
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
    margin: "5@ms",
    borderWidth: "1@ms",
    borderRadius: "3@ms"
  },
  textField: {
    paddingLeft: "5@ms",
    flexGrow: 2
  },
  button: {
    margin: "5@ms"
  }
});
