import React, { FC, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Auth } from "@aws-amplify/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
// eslint-disable-next-line no-restricted-imports
import { Picker } from "@react-native-picker/picker";
import { Role, Hospital } from "models/ClinicianEnums";
import { RootState, select } from "util/useRedux";
import { AuthScreenName, AuthScreensProps } from "mobile/auth_screens";
import { ScreenWrapper } from "mobile/screens/ScreenWrapper";
import {
  validateEmail,
  validatePassword,
  validateUsername
} from "util/validation";
import i18n from "util/language/i18n";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useToast } from "react-native-toast-notifications";
import { LoadingIndicator } from "components/LoadingIndicator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKeys } from "agents_implementation/agent_framework/const/AsyncStorageKeys";

export const RegisterAccount: FC<AuthScreensProps[AuthScreenName.REGISTER]> = ({
  navigation
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  // Local states
  const [inputValid, setInputValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
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
      .then(async () => {
        setRegistering(false);
        toast.show(i18n.t("Auth_Registration.CodeSent"), { type: "success" });
        await AsyncStorage.setItem(
          AsyncStorageKeys.SignUpDetails,
          JSON.stringify({
            name: name,
            hospitalName: hospital,
            role: role
          })
        );
        navigation.navigate(AuthScreenName.CONFIRM_REGISTER, {
          username: username
        });
      })
      .catch((error: { code: string; message: string; name: string }) => {
        // eslint-disable-next-line no-console
        console.log(error.message);
        setRegistering(false);
        toast.show(i18n.t("Auth_Registration.RegistrationFailed"), {
          type: "danger"
        });
      });
  };

  // Sets up picker items for Role
  const roles: string[] = Object.values(Role);
  const rolePickerItems: JSX.Element[] = roles.map((item) => {
    return (
      <Picker.Item
        style={{ fontWeight: "600", fontSize: fonts.h2Size }}
        key={item}
        value={item}
        label={i18n.t(`Auth_Registration.${item}`)}
      />
    );
  });
  rolePickerItems.unshift(
    <Picker.Item
      style={{ fontWeight: "600", fontSize: fonts.h2Size }}
      key="default"
      value={undefined}
      label={i18n.t("Auth_Registration.RolePlaceholder")}
    />
  );

  // Sets up picker items for Hospital
  const hospitals: string[] = Object.values(Hospital);
  const hospitalPickerItems: JSX.Element[] = hospitals.map((item) => {
    return (
      <Picker.Item
        style={{ fontWeight: "600", fontSize: fonts.h2Size }}
        key={item}
        value={item}
        label={item}
      />
    );
  });
  hospitalPickerItems.unshift(
    <Picker.Item
      style={{ fontWeight: "600", fontSize: fonts.h2Size }}
      key="default"
      value={undefined}
      label={i18n.t("Auth_Registration.HospitalPlaceholder")}
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
        passwordMatch
    );
  }, [name, email, username, role, hospital, password, passwordMatch]);

  // Compares confirmed password with initial password
  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

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
        pointerEvents={registering ? "none" : "auto"}
      >
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          {/* Name */}
          <Text style={[inputLabelStyle, { marginTop: ms(-5) }]}>
            {i18n.t("Auth_Registration.Name")}
          </Text>
          <TextInput
            style={inputStyle}
            value={name}
            onChangeText={(text) => setName(text)}
            placeholder={i18n.t("Auth_Registration.NamePlaceholder")}
            keyboardType="default"
            autoCapitalize="characters"
          />

          {/* Email */}
          <Text style={inputLabelStyle}>
            {i18n.t("Auth_Registration.Email")}
          </Text>
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
            placeholder={i18n.t("Auth_Registration.EmailPlaceholder")}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          {email !== "" && !validateEmail(email) && (
            <Text style={errorTextStyle}>
              {i18n.t("Auth_Registration.EmailError")}
            </Text>
          )}

          {/* Role */}
          <Text style={inputLabelStyle}>
            {i18n.t("Auth_Registration.Role")}
          </Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={role}
              onValueChange={(value: string) => {
                setRole(value);
              }}
            >
              {rolePickerItems}
            </Picker>
          </View>

          {/* Hospital */}
          <Text style={inputLabelStyle}>
            {i18n.t("Auth_Registration.Hospital")}
          </Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={hospital}
              onValueChange={(value: string) => {
                setHospital(value);
              }}
            >
              {hospitalPickerItems}
            </Picker>
          </View>

          {/* Username */}
          <Text style={inputLabelStyle}>{i18n.t("Auth_SignIn.Username")}</Text>
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

          {/* Confirm Password */}
          <Text style={inputLabelStyle}>
            {i18n.t("Auth_Registration.ConfirmPassword")}
          </Text>
          <TextInput
            style={[
              inputStyle,
              {
                borderColor:
                  confirmPassword !== "" && !passwordMatch
                    ? colors.errorColor
                    : colors.primaryBorderColor
              }
            ]}
            value={confirmPassword}
            onChangeText={(text) => setConfirmPassword(text)}
            placeholder={i18n.t("Auth_Registration.ConfirmPasswordPlaceholder")}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
            textContentType="password"
          />
          {confirmPassword !== "" && !passwordMatch && (
            <Text style={errorTextStyle}>
              {i18n.t("Auth_Registration.ConfirmPasswordError")}
            </Text>
          )}

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
                  fontSize: fonts.h2Size,
                  opacity: inputValid ? 1 : 0.3,
                  color: colors.primaryContrastTextColor
                },
                styles.buttonText
              ]}
            >
              {i18n.t("Auth_Registration.Register")}
            </Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </SafeAreaView>
      {registering && <LoadingIndicator />}
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  safeAreaContainer: {
    margin: ms(15)
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
  picker: {
    borderWidth: ms(2),
    height: ms(40),
    marginBottom: ms(5),
    justifyContent: "center"
  },
  pickerItem: {
    fontWeight: "600"
  },
  button: {
    height: ms(45),
    width: ms(250),
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
