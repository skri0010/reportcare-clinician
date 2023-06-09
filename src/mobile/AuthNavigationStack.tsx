/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackParamList, AuthScreenName } from "./auth_screens";
import { RootState, select } from "util/useRedux";
import { SignIn } from "./auth_screens/SignIn";
import { RegisterAccount } from "./auth_screens/RegisterAccount";
import { ForgotPassword } from "./auth_screens/ForgotPassword";
import { ConfirmRegistration } from "./auth_screens/ConfirmRegistration";
import { getMainScreenHeaderStyle } from "util/getStyles";
import i18n from "util/language/i18n";

interface AuthNavigationStackProps {
  setAuthState: (state: string) => void;
}

const Stack = createStackNavigator<AuthStackParamList>();

export const AuthNavigationStack: FC<AuthNavigationStackProps> = ({
  setAuthState
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const screenHeaderStyle = getMainScreenHeaderStyle(colors);

  const headerTitleStyle = {
    fontSize: fonts.h3Size
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={AuthScreenName.SIGN_IN}>
        <Stack.Screen
          name={AuthScreenName.SIGN_IN}
          options={{ headerShown: false }}
        >
          {(props) => <SignIn {...props} setAuthState={setAuthState} />}
        </Stack.Screen>
        <Stack.Screen
          name={AuthScreenName.REGISTER}
          component={RegisterAccount}
          options={{
            headerStyle: screenHeaderStyle,
            headerTitle: i18n.t("Auth_Registration.RegisterAccount"),
            headerTintColor: colors.primaryContrastTextColor,
            headerTitleAlign: "center",
            headerTitleStyle: headerTitleStyle
          }}
        />
        <Stack.Screen
          name={AuthScreenName.CONFIRM_REGISTER}
          component={ConfirmRegistration}
          options={{
            headerStyle: screenHeaderStyle,
            headerTitle: i18n.t("Auth_ConfirmRegistration.ConfirmRegistration"),
            headerTintColor: colors.primaryContrastTextColor,
            headerTitleAlign: "center",
            headerTitleStyle: headerTitleStyle
          }}
        />
        <Stack.Screen
          name={AuthScreenName.FORGOT_PW}
          component={ForgotPassword}
          options={{
            headerStyle: screenHeaderStyle,
            headerTitle: i18n.t("Auth_ForgotPassword.ResetPassword"),
            headerTintColor: colors.primaryContrastTextColor,
            headerTitleAlign: "center",
            headerTitleStyle: headerTitleStyle
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
