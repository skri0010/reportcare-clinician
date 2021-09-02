import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { RootState, select } from "util/useRedux";
import { SignIn } from "../../auth_screens/SignIn";
import { RegisterAccount } from "../../auth_screens/RegisterAccount";
import { ForgotPassword } from "../../auth_screens/ForgotPassword";
import { ConfirmRegistration } from "../../auth_screens/ConfirmRegistration";
import { getMainScreenHeaderStyle } from "util/getStyles";
import i18n from "util/language/i18n";
import { AuthenticationStackParamList } from "..";
import { AuthenticationScreenName } from "../navigatorScreenNames";

interface AuthNavigationStackProps {
  setAuthState: (state: string) => void;
}

const Stack = createStackNavigator<AuthenticationStackParamList>();

export const AuthNavigationStack: FC<AuthNavigationStackProps> = ({
  setAuthState
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  const screenHeaderStyle = getMainScreenHeaderStyle(colors);

  const headerTitleStyle = {
    fontSize: fonts.h4Size
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={AuthenticationScreenName.SIGN_IN}
          options={{ headerShown: false }}
        >
          {(screenProps) => (
            <SignIn
              navigation={screenProps.navigation}
              route={screenProps.route}
              setAuthState={setAuthState}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name={AuthenticationScreenName.REGISTRATION}
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
          name={AuthenticationScreenName.CONFIRM_REGISTRATION}
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
          name={AuthenticationScreenName.FORGET_PASSWORD}
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
