import React, { FC } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions
} from "@react-navigation/stack";
import { RootState, select } from "util/useRedux";
import { SignIn } from "../../auth_screens/SignIn";
import { RegisterAccount } from "../../auth_screens/RegisterAccount";
import { ForgotPassword } from "../../auth_screens/ForgotPassword";
import { ConfirmRegistration } from "../../auth_screens/ConfirmRegistration";
import { getMainScreenHeaderStyle } from "util/getStyles";
import i18n from "util/language/i18n";
import {
  AuthenticationScreenName,
  AuthenticationStackParamList
} from "web/navigation";

interface AuthStackNavigatorProps {
  setAuthState: (state: string) => void;
}

const Stack = createStackNavigator<AuthenticationStackParamList>();

export const AuthStackNavigator: FC<AuthStackNavigatorProps> = ({
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

  // Options for individual screens
  const buildOptions: (input: {
    headerTitle: string;
  }) => StackNavigationOptions = ({ headerTitle }) => ({
    headerStyle: screenHeaderStyle,
    headerTitle: headerTitle,
    headerTintColor: colors.primaryContrastTextColor,
    headerTitleAlign: "center",
    headerTitleStyle: headerTitleStyle
  });

  // Type check params list. Required because initialParams is insufficient due to Partial<>
  const initialParamsList: AuthenticationStackParamList = {
    [AuthenticationScreenName.SIGN_IN]: undefined,
    [AuthenticationScreenName.CONFIRM_REGISTRATION]: {},
    [AuthenticationScreenName.FORGET_PASSWORD]: undefined,
    [AuthenticationScreenName.REGISTRATION]: undefined
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={AuthenticationScreenName.SIGN_IN}
          options={{ headerShown: false }}
        >
          {(props) => (
            <SignIn
              navigation={props.navigation}
              route={props.route}
              setAuthState={setAuthState}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name={AuthenticationScreenName.REGISTRATION}
          component={RegisterAccount}
          options={{
            ...buildOptions({
              headerTitle: i18n.t("Auth_Registration.RegisterAccount")
            })
          }}
        />
        <Stack.Screen
          name={AuthenticationScreenName.CONFIRM_REGISTRATION}
          component={ConfirmRegistration}
          options={{
            ...buildOptions({
              headerTitle: i18n.t(
                "Auth_ConfirmRegistration.ConfirmRegistration"
              )
            })
          }}
          initialParams={initialParamsList.ConfirmRegistration}
        />
        <Stack.Screen
          name={AuthenticationScreenName.FORGET_PASSWORD}
          component={ForgotPassword}
          options={{
            ...buildOptions({
              headerTitle: i18n.t("Auth_ForgotPassword.ResetPassword")
            })
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
