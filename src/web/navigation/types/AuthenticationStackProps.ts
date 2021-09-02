import {
  AuthenticationScreenName,
  AuthenticationStackParamList
} from "web/navigation";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Navigation and route for Auth screen

export type AuthScreenProps = {
  [AuthenticationScreenName.SIGN_IN]: SignInScreenProps;
  [AuthenticationScreenName.REGISTRATION]: RegistrationScreenProps;
  [AuthenticationScreenName.CONFIRM_REGISTRATION]: ConfirmRegistrationScreenProps;
  [AuthenticationScreenName.FORGET_PASSWORD]: ForgetPasswordScreenProps;
};

type SignInScreenProps = {
  navigation: SignInScreenNavigation;
  route: RouteProp<
    AuthenticationStackParamList,
    AuthenticationScreenName.SIGN_IN
  >;
  setAuthState: (state: string) => void;
};

type RegistrationScreenProps = {
  navigation: SignInScreenNavigation;
  route: RouteProp<
    AuthenticationStackParamList,
    AuthenticationScreenName.REGISTRATION
  >;
};
type ConfirmRegistrationScreenProps = {
  navigation: SignInScreenNavigation;
  route: RouteProp<
    AuthenticationStackParamList,
    AuthenticationScreenName.CONFIRM_REGISTRATION
  >;
};
type ForgetPasswordScreenProps = {
  navigation: SignInScreenNavigation;
  route: RouteProp<
    AuthenticationStackParamList,
    AuthenticationScreenName.FORGET_PASSWORD
  >;
};

// Navigation declared to be used in this module as well as exported to other props

export type SignInScreenNavigation = StackNavigationProp<
  AuthenticationStackParamList,
  AuthenticationScreenName.SIGN_IN
>;

export type RegistrationScreenNavigation = StackNavigationProp<
  AuthenticationStackParamList,
  AuthenticationScreenName.REGISTRATION
>;

export type ConfirmRegistrationScreenNavigation = StackNavigationProp<
  AuthenticationStackParamList,
  AuthenticationScreenName.CONFIRM_REGISTRATION
>;

export type ForgetPasswordScreenNavigation = StackNavigationProp<
  AuthenticationStackParamList,
  AuthenticationScreenName.FORGET_PASSWORD
>;
