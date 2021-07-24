import React, { FC, useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { Auth } from "@aws-amplify/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { AuthScreenName, AuthScreensProps } from "mobile/auth_screens";
import { ScreenWrapper } from "mobile/screens/ScreenWrapper";
import { validateCode, validateUsername } from "util/validation";
import i18n from "util/language/i18n";
import { useToast } from "react-native-toast-notifications";
import { LoadingIndicator } from "components/LoadingIndicator";

export const ConfirmRegistration: FC<
  AuthScreensProps[AuthScreenName.CONFIRM_REGISTER]
> = ({ navigation, route }) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  // Local states
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [inputValid, setInputValid] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const toast = useToast();

  /**
   * Confirms sign up
   * Stores received details (name, hospitalName and role) in AsyncStorage for configuration
   * Navigates to Sign In page after succesfully submitted
   */
  const confirm = async (): Promise<void> => {
    setConfirming(true);
    await Auth.confirmSignUp(username, code)
      .then(async () => {
        setConfirming(false);
        toast.show(i18n.t("Auth_ConfirmRegistration.RegistrationSuccessful"), {
          type: "success"
        });
        navigation.navigate(AuthScreenName.SIGN_IN);
      })
      .catch((error: { code: string; message: string; name: string }) => {
        // eslint-disable-next-line no-console
        console.log(error.message);
        setConfirming(false);
        toast.show(
          i18n.t("Auth_ConfirmRegistration.ConfirmRegistrationFailed"),
          { type: "danger" }
        );
      });
  };

  // Initializes received username
  useEffect(() => {
    const usernameParam = route.params.username;
    if (usernameParam) {
      setUsername(usernameParam);
    }
  }, [route.params.username]);

  // Validates inputs
  useEffect(() => {
    setInputValid(validateUsername(username) && validateCode(code));
  }, [username, code]);

  // Local styles
  const inputLabelStyle = [styles.inputLabel, { fontSize: fonts.h2Size }];
  const inputStyle = [styles.input, { fontSize: fonts.h2Size }];
  const errorTextStyle = [
    styles.errorText,
    { fontSize: fonts.h3Size, color: colors.errorColor }
  ];

  return (
    <ScreenWrapper>
      <SafeAreaView
        style={styles.safeAreaContainer}
        pointerEvents={confirming ? "none" : "auto"}
      >
        {/* Username */}
        <Text style={inputLabelStyle}>{i18n.t("Auth_SignIn.Username")}</Text>
        <TextInput editable={false} style={inputStyle} value={username} />

        {/* Verification Code */}
        <Text style={inputLabelStyle}>
          {i18n.t("Auth_ConfirmRegistration.VerificationCode")}
        </Text>
        <TextInput
          style={inputStyle}
          value={code}
          onChangeText={(text) => setCode(text)}
          placeholder={i18n.t(
            "Auth_ConfirmRegistration.VerificationCodePlaceholder"
          )}
          autoCapitalize="none"
        />
        {code !== "" && !validateCode(code) && (
          <Text style={errorTextStyle}>
            {i18n.t("Auth_ConfirmRegistration.VerificationCodeError")}
          </Text>
        )}

        {/* Confirm Button */}
        <TouchableOpacity
          onPress={inputValid ? confirm : () => null}
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
                fontSize: fonts.h2Size,
                opacity: inputValid ? 1 : 0.3,
                color: colors.primaryContrastTextColor
              },
              styles.buttonText
            ]}
          >
            {i18n.t("Auth_ConfirmRegistration.Confirm")}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      {confirming && <LoadingIndicator />}
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  safeAreaContainer: {
    margin: ms(20)
  },
  inputLabel: {
    fontWeight: "bold",
    marginTop: ms(10),
    marginBottom: ms(10)
  },
  input: {
    borderWidth: ms(2),
    height: ms(40),
    marginBottom: ms(5)
  },
  button: {
    height: ms(45),
    width: ms(250),
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
