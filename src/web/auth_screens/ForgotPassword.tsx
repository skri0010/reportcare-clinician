import React, { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Auth } from "@aws-amplify/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { AuthScreenName, AuthScreensProps } from "web/auth_screens";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import {
  validateCode,
  validatePassword,
  validateUsername
} from "util/validation";
import i18n from "util/language/i18n";

export const ForgotPassword: FC<AuthScreensProps[AuthScreenName.FORGOT_PW]> = ({
  navigation
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  // Local states
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [inputValid, setInputValid] = useState(false);
  const [codeSent, setCodeSent] = useState(false);

  // Triggers verification code to be sent
  const requestCode = async (): Promise<void> => {
    await Auth.forgotPassword(username)
      .then(() => setCodeSent(true))
      .catch((error: { code: string; message: string; name: string }) => {
        // eslint-disable-next-line no-console
        console.log(error.message);
      });
  };

  // Submits verification code and new password
  // Navigates to Sign In page after successfully submitted
  const submitNewPassword = async (): Promise<void> => {
    await Auth.forgotPasswordSubmit(username, code, newPassword)
      .then(() => navigation.navigate(AuthScreenName.SIGN_IN))
      .catch((error: { code: string; message: string; name: string }) => {
        // eslint-disable-next-line no-console
        console.log(error.message);
      });
  };

  // Validates inputs
  useEffect(() => {
    if (codeSent) {
      setInputValid(validateCode(code) && validatePassword(newPassword));
    } else {
      setInputValid(validateUsername(username));
    }
  }, [username, code, newPassword, codeSent]);

  // Local styles
  const inputLabelStyle = [styles.inputLabel, { fontSize: fonts.h3Size }];
  const inputStyle = [styles.input, { fontSize: fonts.h4Size }];
  const errorTextStyle = [
    styles.errorText,
    { fontSize: fonts.h4Size, color: colors.errorColor }
  ];

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.safeAreaContainer}>
        {/* Before verification code is sent */}
        {!codeSent && (
          <View>
            {/* Username */}
            <Text style={inputLabelStyle}>{i18n.t("Username")}</Text>
            <TextInput
              style={[
                inputStyle,
                {
                  borderColor:
                    username !== "" && !validateUsername(username)
                      ? colors.errorColor
                      : colors.primaryBorderColor
                }
              ]}
              value={username}
              onChangeText={(text) => setUsername(text)}
              placeholder={i18n.t("UsernamePlaceholder")}
              autoCapitalize="none"
            />
            {username !== "" && !validateUsername(username) && (
              <Text style={errorTextStyle}>{i18n.t("UsernameError")}</Text>
            )}
          </View>
        )}

        {/* After verification code is sent */}
        {codeSent && (
          <View>
            {/* Verification Code */}
            <Text style={inputLabelStyle}>{i18n.t("VerificationCode")}</Text>
            <TextInput
              style={inputStyle}
              value={code}
              onChangeText={(text) => setCode(text)}
              placeholder={i18n.t("VerificationCodePlaceholder")}
              autoCapitalize="none"
            />
            {code !== "" && !validateCode(code) && (
              <Text style={errorTextStyle}>
                {i18n.t("VerificationCodeError")}
              </Text>
            )}

            {/* New Password */}
            <Text style={inputLabelStyle}>{i18n.t("NewPassword")}</Text>
            <TextInput
              style={[
                inputStyle,
                {
                  borderColor:
                    newPassword !== "" && !validatePassword(newPassword)
                      ? colors.errorColor
                      : colors.primaryBorderColor
                }
              ]}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
              placeholder={i18n.t("NewPasswordPlaceholder")}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              textContentType="password"
            />
            {newPassword !== "" && !validatePassword(newPassword) && (
              <Text style={errorTextStyle}>{i18n.t("PasswordError")}</Text>
            )}
          </View>
        )}

        {/* Request Code or Submit New Password */}
        <TouchableOpacity
          onPress={
            inputValid
              ? codeSent
                ? submitNewPassword
                : requestCode
              : () => null
          }
          style={[
            {
              backgroundColor: inputValid
                ? colors.primaryButtonColor
                : colors.separatorColor
            },
            styles.button
          ]}
        >
          <Text
            style={[
              {
                fontSize: fonts.h3Size,
                opacity: inputValid ? 1 : 0.3,
                color: colors.primaryContrastTextColor
              },
              styles.buttonText
            ]}
          >
            {codeSent ? i18n.t("Submit") : i18n.t("SendCode")}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  safeAreaContainer: {
    margin: ms(30),
    alignSelf: "center",
    width: Dimensions.get("window").width / 2
  },
  inputLabel: {
    fontWeight: "bold",
    marginTop: ms(10),
    marginBottom: ms(10)
  },
  input: {
    borderWidth: ms(2),
    height: ms(35),
    marginBottom: ms(5)
  },
  button: {
    height: ms(40),
    width: ms(200),
    marginTop: ms(15),
    borderRadius: "10@ms",
    justifyContent: "center",
    alignSelf: "center"
  },
  buttonText: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold"
  },
  errorText: {
    fontWeight: "bold"
  }
});
