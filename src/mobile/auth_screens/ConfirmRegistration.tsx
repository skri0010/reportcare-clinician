import React, { FC, useState, useEffect } from "react";
import { Auth } from "@aws-amplify/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import { AuthScreenName, AuthScreensProps } from "mobile/auth_screens";
import { MobileScreenWrapper } from "mobile/screens/MobileScreenWrapper";
import { validateCode, validateUsername } from "util/validation";
import i18n from "util/language/i18n";
import { useToast } from "react-native-toast-notifications";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { AuthButton } from "components/Buttons/AuthButton";
import { TextField } from "components/InputComponents/TextField";

export const ConfirmRegistration: FC<
  AuthScreensProps[AuthScreenName.CONFIRM_REGISTER]
> = ({ navigation, route }) => {
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

  return (
    <MobileScreenWrapper>
      <SafeAreaView
        style={styles.safeAreaContainer}
        pointerEvents={confirming ? "none" : "auto"}
      >
        {/* Username */}
        <TextField
          editable={false}
          label={i18n.t("Auth_SignIn.Username")}
          value={username}
        />

        {/* Verification Code */}
        <TextField
          label={i18n.t("Auth_ConfirmRegistration.VerificationCode")}
          value={code}
          onChange={(text) => setCode(text)}
          placeholder={i18n.t(
            "Auth_ConfirmRegistration.VerificationCodePlaceholder"
          )}
          error={code !== "" && !validateCode(code)}
          errorMessage={i18n.t(
            "Auth_ConfirmRegistration.VerificationCodeError"
          )}
        />

        {/* Confirm Button */}
        <AuthButton
          inputValid={inputValid}
          buttonTitle={i18n.t("Auth_ConfirmRegistration.Confirm")}
          onPress={inputValid ? confirm : () => null}
        />
      </SafeAreaView>
      {confirming && <LoadingIndicator overlayBackgroundColor />}
    </MobileScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  safeAreaContainer: {
    margin: ms(20)
  }
});
