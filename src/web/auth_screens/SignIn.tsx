import React, { FC, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { Auth } from "@aws-amplify/auth";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select, useDispatch } from "util/useRedux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { validatePassword, validateUsername } from "util/validation";
import i18n from "util/language/i18n";
import { useToast } from "react-native-toast-notifications";
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { Belief } from "agents-framework";
import { BeliefKeys, AppAttributes } from "rc_agents/clinician_framework";
import { agentAPI } from "rc_agents/clinician_framework/ClinicianAgentAPI";
import { AsyncStorageKeys } from "rc_agents/storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { setProcedureOngoing } from "ic-redux/actions/agents/actionCreator";
import { AuthButton } from "components/Buttons/AuthButton";
import { TextField } from "components/InputComponents/TextField";
import { H1, H4, H5 } from "components/Text";
import { AuthScreenProps } from "web/navigation/types/AuthenticationStackProps";
import { AuthenticationScreenName } from "web/navigation";
import { AuthState } from ".";
import { AgentTrigger } from "rc_agents/trigger";

export const SignIn: FC<AuthScreenProps[AuthenticationScreenName.SIGN_IN]> = ({
  navigation,
  setAuthState
}) => {
  const { colors, fonts, procedureOngoing, procedureSuccessful } = select(
    (state: RootState) => ({
      colors: state.settings.colors,
      fonts: state.settings.fonts,
      procedureOngoing: state.agents.procedureOngoing,
      procedureSuccessful: state.agents.procedureSuccessful
    })
  );

  // Local states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputValid, setInputValid] = useState(false);
  const [signingIn, setSigningIn] = useState(false); // used locally to indicate ongoing sign in attempt

  // States related to internet connection
  const [connecting, setConnecting] = useState(false);
  const [successToastShown, setSuccessToast] = useState(false);
  const [warningToastShown, setWarningToast] = useState(false);

  const toast = useToast();
  const netInfo = useNetInfo();
  const dispatch = useDispatch();

  /**
   * Signs in
   * If user has not been configured, creates a user entry in DynamoDB table.
   * Otherwise retrieves the entry and initiates the agents.
   */
  const signIn = async (): Promise<void> => {
    // Start of sign in attempt
    dispatch(setProcedureOngoing(true));
    setSigningIn(true);

    await Auth.signIn({
      username: username,
      password: password
    })
      .then(async () => {
        await AsyncStorage.setItem(AsyncStorageKeys.USERNAME, username);

        // Triggers APS to retrieve existing entry or create new entry
        AgentTrigger.triggerAssociateData();
      })
      .catch(async (error: { code: string; message: string; name: string }) => {
        // eslint-disable-next-line no-console
        console.log(error.message);

        // If user is not confirmed
        if (error.name === "UserNotConfirmedException") {
          await Auth.resendSignUp(username);

          // End of sign in attempt
          setSigningIn(false);
          dispatch(setProcedureOngoing(false));

          toast.show(i18n.t("Auth_SignIn.ResendConfirmCode"), {
            type: "warning"
          });
          navigation.navigate(AuthenticationScreenName.CONFIRM_REGISTRATION, {
            username: username
          });
        } else {
          // End of sign in attempt
          setSigningIn(false);
          dispatch(setProcedureOngoing(false));

          toast.show(i18n.t("Auth_SignIn.SignInFailed"), { type: "danger" });
        }
      });
  };

  // Validates inputs
  useEffect(() => {
    setInputValid(validateUsername(username) && validatePassword(password));
  }, [username, password]);

  // Detects completion of sign in procedure
  useEffect(() => {
    // Procedure has completed and sign in successful
    if (signingIn && !procedureOngoing && procedureSuccessful) {
      setSigningIn(false);
      toast.show(i18n.t("Auth_SignIn.SignInSuccessful"), {
        type: "success"
      });
      setAuthState(AuthState.SIGNED_IN);
    }

    // Procedure has completed and sign in unsuccessful
    else if (signingIn && !procedureOngoing && !procedureSuccessful) {
      setSigningIn(false);
      toast.show(i18n.t("Auth_SignIn.ConfigurationFailed"), {
        type: "danger"
      });
    }
  }, [signingIn, procedureOngoing, setAuthState, procedureSuccessful, toast]);

  // Checks for internet connection
  useEffect(() => {
    if (
      netInfo.isConnected === false ||
      netInfo.isInternetReachable === false
    ) {
      if (!warningToastShown) {
        toast.show(i18n.t("Internet_Connection.OnlineToSignIn"), {
          type: "danger"
        });
        setWarningToast(true);
        setSuccessToast(false);
      }
      setConnecting(true);
    } else if (netInfo.isConnected && netInfo.isInternetReachable) {
      agentAPI.addFact(new Belief(BeliefKeys.APP, AppAttributes.ONLINE, true));
      if (warningToastShown && !successToastShown) {
        toast.show(i18n.t("Internet_Connection.OnlineNotice"), {
          type: "success"
        });
        setSuccessToast(true);
        setWarningToast(false);
      }
      setConnecting(false);
    }
  }, [
    netInfo.isConnected,
    netInfo.isInternetReachable,
    successToastShown,
    toast,
    warningToastShown
  ]);

  // Local styles
  const footerButtonTextStyle = [
    styles.footerButtonText,
    { color: colors.primaryBarColor }
  ];

  return (
    <ScreenWrapper fixed pointerEvents={signingIn ? "none" : "auto"}>
      {/* App Logo and Name */}
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("assets/heart-icon.png")} />
        <Text style={[styles.title, { fontSize: fonts.appNameSize }]}>
          ReportCare
        </Text>
      </View>

      {/* Sign In Content */}
      <View style={styles.contentContainer}>
        <View style={styles.titleContainer}>
          <H1 text={i18n.t("Auth_SignIn.SignIn")} style={styles.title} />
        </View>

        {/* Username */}
        <TextField
          label={i18n.t("Auth_SignIn.Username")}
          labelStyle={{ marginTop: ms(-5) }}
          value={username}
          onChange={(text) => setUsername(text)}
          placeholder={i18n.t("Auth_SignIn.UsernamePlaceholder")}
          error={username !== "" && !validateUsername(username)}
          errorMessage={i18n.t("Auth_SignIn.UsernameError")}
        />

        {/* Password */}
        <TextField
          label={i18n.t("Auth_SignIn.Password")}
          value={password}
          onChange={(text) => setPassword(text)}
          placeholder={i18n.t("Auth_SignIn.PasswordPlaceholder")}
          secureText
          autoCorrect={false}
          error={password !== "" && !validatePassword(password)}
          errorMessage={i18n.t("Auth_SignIn.PasswordError")}
          textContentType="password"
        />

        {/* Forgot Password */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(AuthenticationScreenName.FORGET_PASSWORD)
          }
        >
          <H5
            text={i18n.t("Auth_SignIn.ForgotPassword")}
            style={footerButtonTextStyle}
          />
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <AuthButton
        inputValid={inputValid}
        buttonTitle={i18n.t("Auth_SignIn.SignIn")}
        onPress={inputValid ? signIn : () => null}
      />

      {/* Prompt to Register */}
      <View style={styles.footerContainer}>
        <H4
          text={i18n.t("Auth_SignIn.PromptRegister")}
          style={[footerButtonTextStyle, { color: colors.primaryTextColor }]}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(AuthenticationScreenName.REGISTRATION)
          }
        >
          <H4
            text={i18n.t("Auth_SignIn.RedirectToRegister")}
            style={[
              footerButtonTextStyle,
              {
                fontWeight: "bold",
                textDecorationLine: "underline"
              }
            ]}
          />
        </TouchableOpacity>
      </View>
      {(signingIn || connecting) && <LoadingIndicator overlayBackgroundColor />}
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: "35@ms"
  },
  logo: {
    height: "55@ms",
    width: "75@ms"
  },
  contentContainer: {
    alignSelf: "center",
    width: (Dimensions.get("window").width * 2) / 5
  },
  titleContainer: {
    marginTop: "15@ms",
    marginBottom: "15@ms"
  },
  title: {
    fontWeight: "bold"
  },
  footerButtonText: {
    marginTop: "5@ms",
    fontWeight: "600"
  },
  footerContainer: {
    marginTop: "30@ms",
    flexDirection: "row",
    alignItems: "baseline",
    alignSelf: "center"
  }
});
