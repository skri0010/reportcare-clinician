import React, { FC, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Auth } from "@aws-amplify/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import { ms, ScaledSheet } from "react-native-size-matters";
import { Picker } from "@react-native-picker/picker";
import { Role, Hospital } from "rc_agents/model";
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
import { LoadingIndicator } from "components/indicators/LoadingIndicator";
import { AuthButton } from "components/buttons/AuthButton";
import { TextField } from "components/inputComponents/TextField";
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
        style={{ fontWeight: "600", fontSize: fonts.h4Size }}
        key={item}
        value={item}
        label={i18n.t(`Auth_Registration.${item}`)}
      />
    );
  });
  rolePickerItems.unshift(
    <Picker.Item
      style={{ fontWeight: "600", fontSize: fonts.h4Size }}
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
        style={{ fontWeight: "600", fontSize: fonts.h4Size }}
        key={item}
        value={item}
        label={item}
      />
    );
  });
  hospitalPickerItems.unshift(
    <Picker.Item
      style={{ fontWeight: "600", fontSize: fonts.h4Size }}
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
  const pickerStyle = [
    styles.picker,
    { borderColor: colors.primaryBorderColor }
  ];

  return (
    <ScreenWrapper>
      <SafeAreaView
        style={styles.safeAreaContainer}
        pointerEvents={registering ? "none" : "auto"}
      >
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          {/* Name */}
          <TextField
            label={i18n.t("Auth_Registration.Name")}
            labelStyle={{ marginTop: ms(-5) }}
            value={name}
            onChange={(text) => setName(text)}
            placeholder={i18n.t("Auth_Registration.NamePlaceholder")}
            keyboardType="default"
            autoCapitalize="characters"
          />

          {/* Email */}
          <TextField
            label={i18n.t("Auth_Registration.Email")}
            value={email}
            onChange={(text) => setEmail(text)}
            placeholder={i18n.t("Auth_Registration.EmailPlaceholder")}
            error={email !== "" && !validateEmail(email)}
            errorMessage={i18n.t("Auth_Registration.EmailError")}
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          {/* Role */}
          <Text style={inputLabelStyle}>
            {i18n.t("Auth_Registration.Role")}
          </Text>
          <View style={pickerStyle}>
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
          <View style={pickerStyle}>
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
          <TextField
            label={i18n.t("Auth_SignIn.Username")}
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
            placeholder={i18n.t("Auth_Registration.ConfirmPasswordPlaceholder")}
            secureText
            autoCorrect={false}
            error={confirmPassword !== "" && !passwordMatch}
            errorMessage={i18n.t("Auth_Registration.ConfirmPasswordError")}
            textContentType="password"
          />

          {/* Register Button */}
          <AuthButton
            inputValid={inputValid}
            buttonTitle={i18n.t("Auth_Registration.Register")}
            onPress={inputValid ? register : () => null}
            style={{ marginBottom: ms(15) }}
          />
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
    fontWeight: "600",
    marginTop: ms(10),
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
  }
});
