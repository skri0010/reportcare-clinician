import React from "react";
import { StyleProp, ViewStyle, View, TextInput, Platform } from "react-native";
import { RootState, select } from "util/useRedux";
import { ScaledSheet } from "react-native-size-matters";
import { H5, H7 } from "components/Text";

interface TextFieldProps {
  editable?: boolean;
  label: string;
  labelStyle?: StyleProp<ViewStyle>;
  value: string;
  onChange?: (text: string) => void;
  placeholder?: string;
  secureText?: boolean;
  autoCorrect?: boolean;
  error?: boolean;
  errorMessage?: string;
  textContentType?: "password" | "emailAddress" | undefined;
  keyboardType?: "email-address" | "numeric" | "default" | undefined;
  autoCapitalize?: "characters" | "words" | "none" | "sentences" | undefined;
}

export const TextField: React.FC<TextFieldProps> = ({
  editable,
  label,
  labelStyle,
  value,
  onChange,
  placeholder,
  secureText,
  autoCorrect,
  error,
  errorMessage,
  textContentType,
  keyboardType,
  autoCapitalize
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  return (
    <View>
      <H5 text={label} style={[styles.label, labelStyle]} />
      <TextInput
        editable={editable}
        style={[
          styles.input,
          {
            fontSize: fonts.h6Size,
            backgroundColor: colors.primaryBackgroundColor,
            borderColor: error ? colors.errorColor : colors.primaryBorderColor
          }
        ]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        secureTextEntry={secureText}
        autoCorrect={autoCorrect}
        textContentType={textContentType}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      <H7
        text={errorMessage!}
        style={{
          fontWeight: "bold",
          color: colors.errorColor,
          opacity: error ? 1 : 0
        }}
      />
    </View>
  );
};

const styles = ScaledSheet.create({
  label: {
    fontWeight: "600",
    marginTop: "10@ms",
    marginBottom: "5@ms"
  },
  input: {
    borderWidth: "2@ms",
    height: Platform.OS === "web" ? "30@ms" : "40@ms",
    paddingLeft: "10@ms"
  }
});
