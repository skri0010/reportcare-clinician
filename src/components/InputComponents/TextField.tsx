import React from "react";
import { StyleProp, ViewStyle, View, TextInput, Platform } from "react-native";
import { RootState, select } from "util/useRedux";
import { ScaledSheet, ms } from "react-native-size-matters";
import { H3, H5 } from "components/Text";

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
      <H3 text={label} style={[styles.label, labelStyle]} />
      <TextInput
        editable={editable}
        style={[
          styles.input,
          {
            fontSize: fonts.h4Size,
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
      {error && (
        <H5
          text={errorMessage!}
          style={{ fontWeight: "bold", color: colors.errorColor }}
        />
      )}
    </View>
  );
};

const styles = ScaledSheet.create({
  label: {
    fontWeight: "600",
    marginTop: ms(10),
    marginBottom: ms(5)
  },
  input: {
    borderWidth: ms(2),
    height: Platform.OS === "web" ? ms(30) : ms(40),
    marginBottom: ms(5)
  }
});
