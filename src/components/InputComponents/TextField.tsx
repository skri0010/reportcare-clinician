import React from "react";
import {
  StyleProp,
  View,
  TextInput,
  Platform,
  TextStyle,
  ViewStyle
} from "react-native";
import { RootState, select } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";
import { H7 } from "components/Text";
import { Label } from "components/Text/Label";

interface TextFieldProps {
  editable?: boolean;
  label: string;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<ViewStyle>;
  value: string;
  onChange?: (text: string) => void;
  placeholder?: string;
  secureText?: boolean;
  autoCorrect?: boolean;
  error?: boolean;
  errorMessage?: string;
  errorBottomMargin?: number;
  textContentType?: "password" | "emailAddress" | undefined;
  keyboardType?: "email-address" | "numeric" | "default" | undefined;
  autoCapitalize?: "characters" | "words" | "none" | "sentences" | undefined;
  selectTextOnFocus?: boolean;
  multiline?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  editable,
  label,
  labelStyle,
  inputStyle,
  value,
  onChange,
  placeholder,
  secureText,
  autoCorrect,
  error,
  errorMessage,
  errorBottomMargin,
  textContentType,
  keyboardType,
  autoCapitalize,
  selectTextOnFocus,
  multiline
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  return (
    <View>
      <Label text={label} style={labelStyle} />
      <TextInput
        editable={editable}
        style={[
          styles.input,
          {
            // fontSize: fonts.h6Size,
            backgroundColor: colors.primaryBackgroundColor,
            borderColor: error ? colors.errorColor : colors.primaryBorderColor,
            color: colors.primaryTextColor
          },
          inputStyle || { fontSize: fonts.h6Size }
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        secureTextEntry={secureText}
        autoCorrect={autoCorrect}
        textContentType={textContentType}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        selectTextOnFocus={selectTextOnFocus}
        multiline={multiline}
      />
      <H7
        text={errorMessage!}
        style={{
          fontWeight: "bold",
          color: colors.errorColor,
          opacity: error ? 1 : 0,
          ...(errorBottomMargin ? { marginBottom: errorBottomMargin } : {})
        }}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  input: {
    borderWidth: "2@ms",
    height: Platform.OS === "web" ? "30@ms" : "40@ms",
    paddingLeft: "10@ms"
  }
});
