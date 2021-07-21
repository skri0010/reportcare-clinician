import React, { FC, useState, useEffect } from "react";
import { Dimensions, Text, TextInput, TouchableOpacity } from "react-native";
import { Auth } from "@aws-amplify/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { AuthScreenName, AuthScreensProps } from "web/auth_screens";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { validateCode, validateUsername } from "util/validation";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
        const { name, hospitalName, role } = route.params;
        if (name && hospitalName && role) {
          await AsyncStorage.setItem("Details", JSON.stringify(route.params));
        }
        setConfirming(false);
        toast.show(i18n.t("RegistrationSuccessful"), { type: "success" });
        navigation.navigate(AuthScreenName.SIGN_IN);
      })
      .catch((error: { code: string; message: string; name: string }) => {
        // eslint-disable-next-line no-console
        console.log(error.message);
        setConfirming(false);
        toast.show(i18n.t("ConfirmRegistrationFailed"), { type: "danger" });
      });
  };

  // Validates inputs
  useEffect(() => {
    setInputValid(validateUsername(username) && validateCode(code));
  }, [username, code]);

  // Local styles
  const inputLabelStyle = [styles.inputLabel, { fontSize: fonts.h3Size }];
  const inputStyle = [styles.input, { fontSize: fonts.h4Size }];
  const errorTextStyle = [
    styles.errorText,
    { fontSize: fonts.h4Size, color: colors.errorColor }
  ];

  return (
    <ScreenWrapper>
      <SafeAreaView
        style={styles.safeAreaContainer}
        pointerEvents={confirming ? "none" : "auto"}
      >
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
          <Text style={errorTextStyle}>{i18n.t("VerificationCodeError")}</Text>
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
                fontSize: fonts.h3Size,
                opacity: inputValid ? 1 : 0.3,
                color: colors.primaryContrastTextColor
              },
              styles.buttonText
            ]}
          >
            {i18n.t("Confirm")}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      {confirming && <LoadingIndicator />}
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
