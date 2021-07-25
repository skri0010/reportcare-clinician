import React, { FC, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { Auth } from "@aws-amplify/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  AuthScreenName,
  AuthScreensProps,
  AuthState
} from "mobile/auth_screens";
import { ScreenWrapper } from "mobile/screens/ScreenWrapper";
import { validatePassword, validateUsername } from "util/validation";
import agentAPI from "agents_implementation/agent_framework/AgentAPI";
import i18n from "util/language/i18n";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "react-native-toast-notifications";
import { LoadingIndicator } from "components/LoadingIndicator";
import agentAPS from "agents_implementation/agents/app-configuration-assistant/APS";
import Belief from "agents_implementation/agent_framework/base/Belief";
import {
  ProcedureConst,
  AsyncStorageKeys,
  BeliefKeys,
  AppAttributes,
  ClinicianAttributes,
  ProcedureAttributes
} from "agents_implementation/agent_framework/AgentEnums";
import { useNetInfo } from "@react-native-community/netinfo";

export const SignIn: FC<AuthScreensProps[AuthScreenName.SIGN_IN]> = ({
  navigation,
  setAuthState
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  // Local states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputValid, setInputValid] = useState(false);
  const [signingIn, setSigningIn] = useState(false);

  // States related to internet connection
  const [connecting, setConnecting] = useState(false);
  const [successToastShown, setSuccessToast] = useState(false);
  const [warningToastShown, setWarningToast] = useState(false);

  const toast = useToast();
  const netInfo = useNetInfo();

  /**
   * Signs in
   * If user has not been configured, creates a user entry in DynamoDB table.
   * Otherwise retrieves the entry and initiates the agents.
   */
  const signIn = async (): Promise<void> => {
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

        setTimeout(() => {
          // Checks facts every 1s to determine if the chain of actions has been completed.
          const checkProcedure = setInterval(async () => {
            const facts = agentAPI.getFacts();
            if (
              facts[BeliefKeys.PROCEDURE][ProcedureAttributes.ADC] ===
              ProcedureConst.INACTIVE
            ) {
              setSigningIn(false);
              clearInterval(checkProcedure);

              // Ensures that entry has been successfully retrieved or created
              const [[, clinicianId], [, clinician]] =
                await AsyncStorage.multiGet([
                  AsyncStorageKeys.CLINICIAN_ID,
                  AsyncStorageKeys.CLINICIAN
                ]);
              if (clinicianId && clinician) {
                toast.show(i18n.t("Auth_SignIn.SignInSuccessful"), {
                  type: "success"
                });
                setAuthState(AuthState.SIGNED_IN);
              } else {
                toast.show(i18n.t("Auth_SignIn.ConfigurationFailed"), {
                  type: "danger"
                });
              }
            }
          }, 500);
        }, 1000);
      })
      .catch(async (error: { code: string; message: string; name: string }) => {
        // eslint-disable-next-line no-console
        console.log(error.message);

        // If user is not confirmed
        if (error.name === "UserNotConfirmedException") {
          await Auth.resendSignUp(username);
          setSigningIn(false);
          toast.show(i18n.t("Auth_SignIn.ResendConfirmCode"), {
            type: "warning"
          });
          navigation.navigate(AuthScreenName.CONFIRM_REGISTER, {
            username: username
          });
        } else {
          setSigningIn(false);
          toast.show(i18n.t("Auth_SignIn.SignInFailed"), { type: "danger" });
        }
      });
  };

  // Validates inputs
  useEffect(() => {
    setInputValid(validateUsername(username) && validatePassword(password));
  }, [username, password]);

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
  const inputLabelStyle = [styles.inputLabel, { fontSize: fonts.h2Size }];
  const inputStyle = [styles.input, { fontSize: fonts.h2Size }];
  const errorTextStyle = [
    styles.title,
    { fontSize: fonts.h3Size, color: colors.errorColor }
  ];
  const footerButtonTextStyle = [
    styles.footerButtonText,
    { color: colors.primaryBarColor, fontSize: fonts.h3Size }
  ];

  return (
    <ScreenWrapper>
      <SafeAreaView
        style={styles.safeAreaContainer}
        pointerEvents={signingIn ? "none" : "auto"}
      >
        {/* App Logo and Name */}
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require("assets/heart-icon.png")}
          />
          <Text style={[styles.title, { fontSize: fonts.appNameSize }]}>
            ReportCare
          </Text>
        </View>

        {/* Sign In */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { fontSize: fonts.appNameSize }]}>
            {i18n.t("Auth_SignIn.SignIn")}
          </Text>
        </View>

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 200 }}
          extraScrollHeight={100}
        >
          {/* Username */}
          <Text style={[inputLabelStyle, { marginTop: ms(-5) }]}>
            {i18n.t("Auth_SignIn.Username")}
          </Text>
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
            placeholder={i18n.t("Auth_SignIn.UsernamePlaceholder")}
            autoCapitalize="none"
          />
          {username !== "" && !validateUsername(username) && (
            <Text style={errorTextStyle}>
              {i18n.t("Auth_SignIn.UsernameError")}
            </Text>
          )}

          {/* Password */}
          <Text style={inputLabelStyle}>{i18n.t("Auth_SignIn.Password")}</Text>
          <TextInput
            style={[
              inputStyle,
              {
                borderColor:
                  password !== "" && !validatePassword(password)
                    ? colors.errorColor
                    : colors.primaryBorderColor
              }
            ]}
            value={password}
            onChangeText={(text) => setPassword(text)}
            placeholder={i18n.t("Auth_SignIn.PasswordPlaceholder")}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            textContentType="password"
          />
          {password !== "" && !validatePassword(password) && (
            <Text style={errorTextStyle}>
              {i18n.t("Auth_SignIn.PasswordError")}
            </Text>
          )}

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => navigation.navigate(AuthScreenName.FORGOT_PW)}
          >
            <Text style={footerButtonTextStyle}>
              {i18n.t("Auth_SignIn.ForgotPassword")}
            </Text>
          </TouchableOpacity>

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={inputValid ? signIn : () => null}
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
              {i18n.t("Auth_SignIn.SignIn")}
            </Text>
          </TouchableOpacity>

          {/* Prompt to Register */}
          <View style={styles.footerContainer}>
            <Text
              style={[
                styles.footerButtonText,
                { color: colors.primaryTextColor, fontSize: fonts.h3Size }
              ]}
            >
              {i18n.t("Auth_SignIn.PromptRegister")}
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate(AuthScreenName.REGISTER)}
            >
              <Text
                style={[
                  footerButtonTextStyle,
                  {
                    fontWeight: "bold",
                    textDecorationLine: "underline"
                  }
                ]}
              >
                {i18n.t("Auth_SignIn.RedirectToRegister")}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      {(signingIn || connecting) && <LoadingIndicator />}
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  safeAreaContainer: {
    margin: ms(15)
  },
  logoContainer: {
    flexDirection: "column",
    alignItems: "center",
    marginTop: ms(30)
  },
  logo: {
    height: ms(55),
    width: ms(75)
  },
  titleContainer: {
    marginTop: ms(15),
    marginBottom: ms(15)
  },
  title: {
    fontWeight: "bold"
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
  footerButtonText: {
    marginTop: ms(5),
    fontWeight: "800"
  },
  footerContainer: {
    marginTop: ms(10),
    flexDirection: "row",
    alignItems: "baseline",
    alignSelf: "center"
  }
});
