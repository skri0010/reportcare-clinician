import React, { FC, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Dimensions } from "react-native";
import { Auth } from "@aws-amplify/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select, useDispatch } from "util/useRedux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthScreenName, AuthScreensProps, AuthState } from "web/auth-screens";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { validatePassword, validateUsername } from "util/validation";
import agentAPI from "rc_agents/framework/AgentAPI";
import i18n from "util/language/i18n";
import { useToast } from "react-native-toast-notifications";
import { LoadingIndicator } from "components/indicators/LoadingIndicator";
import agentAPS from "rc_agents/agents/app-configuration-assistant/APS";
import Belief from "rc_agents/framework/base/Belief";
import {
  ProcedureConst,
  BeliefKeys,
  AppAttributes,
  ClinicianAttributes,
  ProcedureAttributes
} from "rc_agents/AgentEnums";
import { AsyncStorageKeys } from "rc_agents/storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { setProcedureOngoing } from "ic-redux/actions/agents/actionCreator";
import { AuthButton } from "components/buttons/AuthButton";
import { TextField } from "components/inputComponents/TextField";
import { H1, H4 } from "components/text";

export const SignIn: FC<AuthScreensProps[AuthScreenName.SIGN_IN]> = ({
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

        // Triggers initialization of agents
        agentAPI.startAgents();

        // Triggers APS to retrieve existing entry or create new entry
        setTimeout(() => {
          agentAPS.addBelief(
            new Belief(BeliefKeys.APP, AppAttributes.CONFIGURED, true)
          );
          agentAPS.addBelief(
            new Belief(
              BeliefKeys.CLINICIAN,
              ClinicianAttributes.HAS_ENTRY,
              false
            )
          );
          agentAPI.addFact(
            new Belief(
              BeliefKeys.PROCEDURE,
              ProcedureAttributes.ADC,
              ProcedureConst.ACTIVE
            )
          );
        }, 1000);
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
          navigation.navigate(AuthScreenName.CONFIRM_REGISTER, {
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
    <ScreenWrapper>
      <SafeAreaView
        style={styles.safeAreaContainer}
        pointerEvents={signingIn ? "none" : "auto"}
      >
        {/* App Logo and Name */}
        <View>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("assets/heart-icon.png")}
            />
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
              onPress={() => navigation.navigate(AuthScreenName.FORGOT_PW)}
            >
              <H4
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
              style={[
                footerButtonTextStyle,
                { color: colors.primaryTextColor }
              ]}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate(AuthScreenName.REGISTER)}
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
        </View>
      </SafeAreaView>
      {(signingIn || connecting) && <LoadingIndicator />}
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  safeAreaContainer: {
    margin: ms(30)
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: ms(-10)
  },
  logo: {
    height: ms(55),
    width: ms(75)
  },
  contentContainer: {
    alignSelf: "center",
    width: (Dimensions.get("window").width * 2) / 5
  },
  titleContainer: {
    marginTop: ms(15),
    marginBottom: ms(15)
  },
  title: {
    fontWeight: "bold"
  },
  footerButtonText: {
    marginTop: ms(5),
    fontWeight: "600"
  },
  footerContainer: {
    marginTop: ms(10),
    flexDirection: "row",
    alignItems: "baseline",
    alignSelf: "center"
  }
});
