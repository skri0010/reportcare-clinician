import React, { FC, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Auth } from "@aws-amplify/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
// eslint-disable-next-line no-restricted-imports
import { Picker } from "@react-native-picker/picker";
import { Role, Hospital } from "models/ClinicianEnums";
import { RootState, select } from "util/useRedux";
import { AuthScreenName, AuthScreensProps } from "web/auth_screens";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import {
  validateEmail,
  validatePassword,
  validateUsername
} from "util/validation";
import i18n from "util/language/i18n";
import { useToast } from "react-native-toast-notifications";
import { LoadingIndicator } from "components/LoadingIndicator";

export const RegisterAccount: FC<AuthScreensProps[AuthScreenName.REGISTER]> = ({
  navigation
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  // Local states
  const [inputValid, setInputValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [hospital, setHospital] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registering, setRegistering] = useState(false);

  const toast = useToast();

  // Signs up
  // Sends remaining details (name, hospitalName and role) to the following ConfirmRegistration page.
  const register = async (): Promise<void> => {
    setRegistering(true);
    await Auth.signUp({
      username: username,
      password: password,
      attributes: { email: email, "custom:hospital_role": role }
    })
      .then(() => {
        setRegistering(false);
        toast.show(i18n.t("CodeSent"), { type: "success" });
        navigation.navigate(AuthScreenName.CONFIRM_REGISTER, {
          name: name,
          hospitalName: hospital,
          role: role
        });
      })
      .catch((error: { code: string; message: string; name: string }) => {
        // eslint-disable-next-line no-console
        console.log(error.message);
        setRegistering(false);
        toast.show(i18n.t("RegistrationFailed"), { type: "danger" });
      });
  };

  // Sets up picker items for Role
  const roles: string[] = Object.values(Role);
  const rolePickerItems: JSX.Element[] = roles.map((item) => {
    return <Picker.Item key={item} value={item} label={i18n.t(item)} />;
  });
  rolePickerItems.unshift(
    <Picker.Item
      key="default"
      value={undefined}
      label={i18n.t("RolePlaceholder")}
    />
  );

  // Sets up picker items for Hospital
  const hospitals: string[] = Object.values(Hospital);
  const hospitalPickerItems: JSX.Element[] = hospitals.map((item) => {
    return <Picker.Item key={item} value={item} label={item} />;
  });
  hospitalPickerItems.unshift(
    <Picker.Item
      key="default"
      value={undefined}
      label={i18n.t("HospitalPlaceholder")}
    />
  );

  // Validates inputs
  useEffect(() => {
    setInputValid(
      name !== "" &&
        validateEmail(email) &&
        validateUsername(username) &&
        role !== "" &&
        role !== undefined &&
        hospital !== "" &&
        hospital !== undefined &&
        validatePassword(password) &&
        passwordValid
    );
  }, [name, email, username, role, hospital, password, passwordValid]);

  // Compares confirmed password with initial password
  useEffect(() => {
    setPasswordValid(password === confirmPassword);
  }, [password, confirmPassword]);

  // Local styles
  const inputLabelStyle = [styles.inputLabel, { fontSize: fonts.h3Size }];
  const inputStyle = [styles.input, { fontSize: fonts.h4Size }];
  const pickerStyle = [styles.picker, { fontSize: fonts.h4Size }];
  const errorTextStyle = [
    styles.errorText,
    { fontSize: fonts.h4Size, color: colors.errorColor }
  ];

  return (
    <ScreenWrapper>
      <SafeAreaView pointerEvents={registering ? "none" : "auto"}>
        <View style={styles.contentContainer}>
          {/* Left Column */}
          <View style={styles.columnContainer}>
            {/* Name */}
            <Text style={[inputLabelStyle, { marginTop: ms(-5) }]}>
              {i18n.t("Name")}
            </Text>
            <TextInput
              style={inputStyle}
              value={name}
              onChangeText={(text) => setName(text.toUpperCase())}
              placeholder={i18n.t("NamePlaceholder")}
            />

            {/* Email */}
            <Text style={inputLabelStyle}>{i18n.t("Email")}</Text>
            <TextInput
              style={[
                inputStyle,
                {
                  borderColor:
                    email !== "" && !validateEmail(email)
                      ? colors.errorColor
                      : colors.primaryBorderColor
                }
              ]}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder={i18n.t("EmailPlaceholder")}
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
            />
            {email !== "" && !validateEmail(email) && (
              <Text style={errorTextStyle}>{i18n.t("EmailError")}</Text>
            )}

            {/* Role */}
            <Text style={inputLabelStyle}>{i18n.t("Role")}</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={pickerStyle}
                selectedValue={role}
                onValueChange={(value) => {
                  setRole(value);
                }}
              >
                {rolePickerItems}
              </Picker>
            </View>

            {/* Hospital */}
            <Text style={inputLabelStyle}>{i18n.t("Hospital")}</Text>
            <View style={styles.pickerContainer}>
              <Picker
                style={pickerStyle}
                selectedValue={hospital}
                onValueChange={(value) => {
                  setHospital(value as string);
                }}
              >
                {hospitalPickerItems}
              </Picker>
            </View>
          </View>

          {/* Right Column */}
          <View style={styles.columnContainer}>
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

            {/* Confirm Password */}
            <Text style={inputLabelStyle}>{i18n.t("ConfirmPassword")}</Text>
            <TextInput
              style={[
                inputStyle,
                {
                  borderColor:
                    confirmPassword !== "" && !passwordValid
                      ? colors.errorColor
                      : colors.primaryBorderColor
                }
              ]}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              placeholder={i18n.t("ConfirmPasswordPlaceholder")}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              textContentType="password"
            />
            {confirmPassword !== "" && !passwordValid && (
              <Text style={errorTextStyle}>
                {i18n.t("ConfirmPasswordError")}
              </Text>
            )}
          </View>
        </View>

        {/* Register Button */}
        <TouchableOpacity
          onPress={inputValid ? register : () => null}
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
            {i18n.t("Register")}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      {registering && <LoadingIndicator />}
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  contentContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  columnContainer: {
    width: "50%",
    paddingHorizontal: ms(80),
    paddingVertical: ms(15)
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
  pickerContainer: {
    borderWidth: ms(2),
    height: ms(35),
    marginBottom: ms(5),
    justifyContent: "center"
  },
  picker: {
    height: "100%",
    borderWidth: 0
  },
  button: {
    height: ms(40),
    width: ms(200),
    marginTop: ms(15),
    marginBottom: ms(15),
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
