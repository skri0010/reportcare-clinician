import React, { FC, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Auth } from "@aws-amplify/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import { Picker } from "@react-native-picker/picker";
import { Role, Hospital } from "rc_agents/model";
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
import { LoadingIndicator } from "components/Indicators/LoadingIndicator";
import { AuthButton } from "components/Buttons/AuthButton";
import { TextField } from "components/InputComponents/TextField";
import { Storage } from "rc_agents/storage";

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
        await Storage.setSignUpDetails({
          name: name,
          hospitalName: hospital,
          role: role
        });
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
        key={item}
        value={item}
        label={i18n.t(`Auth_Registration.${item}`)}
      />
    );
  });
  rolePickerItems.unshift(
    <Picker.Item
      key="default"
      value={undefined}
      label={i18n.t("Auth_Registration.RolePlaceholder")}
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
      label={i18n.t("Auth_Registration.HospitalPlaceholder")}
    />
  );

  // Validates inputs
  useEffect(() => {
    setInputValid(
      (name &&
        validateEmail(email) &&
        validateUsername(username) &&
        role &&
        hospital &&
        validatePassword(password) &&
        passwordMatch) as boolean
    );
  }, [name, email, username, role, hospital, password, passwordMatch]);

  // Compares confirmed password with initial password
  useEffect(() => {
    setPasswordMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  // Local styles
  const inputLabelStyle = [styles.inputLabel, { fontSize: fonts.h3Size }];
  const pickerContainerStyle = [
    styles.pickerContainer,
    { borderColor: colors.primaryBorderColor }
  ];
  const pickerStyle = [styles.picker, { fontSize: fonts.h4Size }];

  return (
    <ScreenWrapper>
      <SafeAreaView pointerEvents={registering ? "none" : "auto"}>
        <View style={styles.contentContainer}>
          {/* Left Column */}
          <View style={styles.columnContainer}>
            {/* Name */}
            <TextField
              label={i18n.t("Auth_Registration.Name")}
              labelStyle={{ marginTop: ms(-5) }}
              value={name}
              onChange={(text: string) => setName(text.toUpperCase())}
              placeholder={i18n.t("Auth_Registration.NamePlaceholder")}
            />

            {/* Email */}
            <TextField
              label={i18n.t("Auth_Registration.Email")}
              value={email}
              onChange={(text) => setEmail(text)}
              placeholder={i18n.t("Auth_Registration.EmailPlaceholder")}
              error={email !== "" && !validateEmail(email)}
              errorMessage={i18n.t("Auth_Registration.EmailError")}
            />

            {/* Role */}
            <Text style={inputLabelStyle}>
              {i18n.t("Auth_Registration.Role")}
            </Text>
            <View style={pickerContainerStyle}>
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
            <Text style={inputLabelStyle}>
              {i18n.t("Auth_Registration.Hospital")}
            </Text>
            <View style={pickerContainerStyle}>
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

            {/* Confirm Password */}
            <TextField
              label={i18n.t("Auth_Registration.ConfirmPassword")}
              value={confirmPassword}
              onChange={(text) => setConfirmPassword(text)}
              placeholder={i18n.t(
                "Auth_Registration.ConfirmPasswordPlaceholder"
              )}
              secureText
              autoCorrect={false}
              error={confirmPassword !== "" && !passwordMatch}
              errorMessage={i18n.t("Auth_Registration.ConfirmPasswordError")}
              textContentType="password"
            />
          </View>
        </View>

        {/* Register Button */}
        <AuthButton
          inputValid={inputValid}
          buttonTitle={i18n.t("Auth_Registration.Register")}
          onPress={inputValid ? register : () => null}
        />
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
    fontWeight: "600",
    marginTop: ms(10),
    marginBottom: ms(5)
  },
  pickerContainer: {
    borderWidth: ms(2),
    height: ms(30),
    marginBottom: ms(5),
    justifyContent: "center"
  },
  picker: {
    height: "100%",
    borderWidth: 0
  }
});
