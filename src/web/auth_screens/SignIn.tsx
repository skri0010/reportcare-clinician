import React, { FC, useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { Auth } from "@aws-amplify/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { DataStore } from "@aws-amplify/datastore";
import { ClinicianInfo } from "aws/models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthScreenName, AuthScreensProps } from "web/auth_screens";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { validatePassword, validateUsername } from "util/validation";
import agentAPI from "agents_implementation/agent_framework/AgentAPI";
import i18n from "util/language/i18n";

export const SignIn: FC<AuthScreensProps[AuthScreenName.SIGN_IN]> = ({
  navigation
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  // Local states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inputValid, setInputValid] = useState(false);

  /**
   * Signs in
   * If user has not been configured, creates a user entry in DynamoDB table.
   * Otherwise retrieves the entry and initiates the agents.
   */
  const signIn = async (): Promise<void> => {
    await Auth.signIn({
      username: username,
      password: password
    })
      .then(async () => {
        const unconfigured = await AsyncStorage.getItem("Unconfigured");

        // User signs in for the first time after signing up
        if (unconfigured && JSON.parse(unconfigured) === true) {
          const details = await AsyncStorage.getItem("Details");
          if (details) {
            const detailsObj: {
              name: string;
              hospitalName: string;
              role: string;
            } = JSON.parse(details);

            // Creates new entry in DynamoDB table
            await DataStore.save(
              new ClinicianInfo({
                name: detailsObj.name,
                hospitalName: detailsObj.hospitalName,
                clinicianID: username,
                role: detailsObj.role,
                facts: "",
                APS: "",
                DTA: "",
                UXSA: ""
              })
            )
              .then(async (response) => {
                // Locally stores entry Id and clinician Id
                await AsyncStorage.multiSet([
                  ["UserId", response.id],
                  ["ClinicianId", username]
                ]);
                await AsyncStorage.multiRemove(["Unconfigured", "Details"]);
              })
              .catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
              });
          }
        } else {
          // User already has an entry in DynamoDB table
          await DataStore.query(ClinicianInfo, (c) =>
            c.clinicianID("eq", username)
          )
            .then(async (results) => {
              if (results.length > 0) {
                const clinician = results.pop();
                if (clinician) {
                  await AsyncStorage.multiSet([
                    ["UserId", clinician.id],
                    ["ClinicianId", clinician.clinicianID]
                  ]);
                }
              }
            })
            .catch((error) => {
              // eslint-disable-next-line no-console
              console.log(error);
            });
        }
        // Triggers initialization of agents
        agentAPI.startAgents();
      })
      .catch((error: { code: string; message: string; name: string }) => {
        // eslint-disable-next-line no-console
        console.log(error.message);
      });
  };

  // Validates inputs
  useEffect(() => {
    setInputValid(validateUsername(username) && validatePassword(password));
  }, [username, password]);

  // Local styles
  const inputLabelStyle = [styles.inputLabel, { fontSize: fonts.h3Size }];
  const inputStyle = [styles.input, { fontSize: fonts.h4Size }];
  const errorTextStyle = [
    styles.title,
    { fontSize: fonts.h4Size, color: colors.errorColor }
  ];
  const footerButtonTextStyle = [
    styles.footerButtonText,
    { color: colors.primaryBarColor, fontSize: fonts.h4Size }
  ];

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.safeAreaContainer}>
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

        {/* Sign In Content */}
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { fontSize: fonts.h1Size }]}>
              {i18n.t("SignIn")}
            </Text>
          </View>

          {/* Username */}
          <Text style={[inputLabelStyle, { marginTop: ms(-5) }]}>
            {i18n.t("Username")}
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
            placeholder={i18n.t("UsernamePlaceholder")}
            autoCapitalize="none"
          />
          {username !== "" && !validateUsername(username) && (
            <Text style={errorTextStyle}>{i18n.t("UsernameError")}</Text>
          )}

          {/* Password */}
          <Text style={inputLabelStyle}>{i18n.t("Password")}</Text>
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
            placeholder={i18n.t("PasswordPlaceholder")}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            textContentType="password"
          />
          {password !== "" && !validatePassword(password) && (
            <Text style={errorTextStyle}>{i18n.t("PasswordError")}</Text>
          )}

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => navigation.navigate(AuthScreenName.FORGOT_PW)}
          >
            <Text style={footerButtonTextStyle}>
              {i18n.t("ForgotPassword")}
            </Text>
          </TouchableOpacity>
        </View>

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
                fontSize: fonts.h3Size,
                opacity: inputValid ? 1 : 0.3,
                color: colors.primaryContrastTextColor
              },
              styles.buttonText
            ]}
          >
            {i18n.t("SignIn")}
          </Text>
        </TouchableOpacity>

        {/* Prompt to Register */}
        <View style={styles.footerContainer}>
          <Text style={[styles.footerButtonText, { fontSize: fonts.h4Size }]}>
            {i18n.t("PromptRegister")}
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
              {i18n.t("RedirectToRegister")}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
    width: Dimensions.get("window").width / 2
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
