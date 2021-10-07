import React, { FC, useState, useEffect } from "react";
import { View, Dimensions } from "react-native";
import { Auth } from "@aws-amplify/auth";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import {
  validateCode,
  validatePassword,
  validateUsername
} from "util/validation";
import i18n from "util/language/i18n";
import { useToast } from "react-native-toast-notifications";
import { LoadingIndicator } from "components/Indicators2/LoadingIndicator";
import { AuthButton } from "components/Buttons/AuthButton";
import { TextField } from "components/InputComponents/TextField";
import { AuthenticationScreenName } from "web/navigation";
import { AuthScreenProps } from "web/navigation/types/AuthenticationStackProps";

export const ForgotPassword: FC<
  AuthScreenProps[AuthenticationScreenName.FORGET_PASSWORD]
> = ({ navigation }) => {
  // Local states
  const [username, setUsername] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [inputValid, setInputValid] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  // Triggers verification code to be sent
  const requestCode = async (): Promise<void> => {
    setLoading(true);
    await Auth.forgotPassword(username)
      .then(() => {
        setCodeSent(true);
        setLoading(false);
        toast.show(i18n.t("Auth_Registration.CodeSent"), { type: "success" });
      })
      .catch((error: { code: string; message: string; name: string }) => {
        // eslint-disable-next-line no-console
        console.log(error.message);
        setLoading(false);
        toast.show(i18n.t("Auth_ForgotPassword.CodeSendFailed"), {
          type: "danger"
        });
      });
  };

  // Submits verification code and new password
  // Navigates to Sign In page after successfully submitted
  const submitNewPassword = async (): Promise<void> => {
    setLoading(true);
    await Auth.forgotPasswordSubmit(username, code, newPassword)
      .then(() => {
        setLoading(false);
        toast.show(i18n.t("Auth_ForgotPassword.ResetPasswordSuccessful"), {
          type: "success"
        });
        navigation.navigate(AuthenticationScreenName.SIGN_IN);
      })
      .catch((error: { code: string; message: string; name: string }) => {
        // eslint-disable-next-line no-console
        console.log(error.message);
        setLoading(false);
        toast.show(i18n.t("Auth_ForgotPassword.ResetPasswordFailed"), {
          type: "danger"
        });
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

  return (
    <ScreenWrapper pointerEvents={loading ? "none" : "auto"}>
      <View style={styles.container}>
        {/* Before verification code is sent */}
        {!codeSent && (
          // Username
          <TextField
            label={i18n.t("Auth_SignIn.Username")}
            value={username}
            onChange={(text) => setUsername(text)}
            placeholder={i18n.t("Auth_SignIn.UsernamePlaceholder")}
            error={username !== "" && !validateUsername(username)}
            errorMessage={i18n.t("Auth_SignIn.UsernameError")}
          />
        )}

        {/* After verification code is sent */}
        {codeSent && (
          <View>
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

            {/* New Password */}
            <TextField
              label={i18n.t("Auth_ForgotPassword.NewPassword")}
              value={newPassword}
              onChange={(text) => setNewPassword(text)}
              placeholder={i18n.t("Auth_ForgotPassword.NewPasswordPlaceholder")}
              secureText
              autoCorrect={false}
              error={newPassword !== "" && !validatePassword(newPassword)}
              errorMessage={i18n.t("Auth_SignIn.PasswordError")}
              textContentType="password"
            />
          </View>
        )}

        {/* Request Code or Submit New Password */}
        <AuthButton
          inputValid={inputValid}
          buttonTitle={
            codeSent
              ? i18n.t("Auth_ForgotPassword.Submit")
              : i18n.t("Auth_ForgotPassword.SendCode")
          }
          onPress={
            inputValid
              ? codeSent
                ? submitNewPassword
                : requestCode
              : () => null
          }
        />
      </View>
      {loading && <LoadingIndicator overlayBackgroundColor />}
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    margin: ms(30),
    alignSelf: "center",
    width: Dimensions.get("window").width / 3
  }
});
