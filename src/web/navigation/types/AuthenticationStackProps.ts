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
  navigation: StackNavigationProp<
    AuthenticationStackParamList,
    AuthenticationScreenName.SIGN_IN
  >;

  route: RouteProp<
    AuthenticationStackParamList,
    AuthenticationScreenName.SIGN_IN
  >;
  setAuthState: (state: string) => void;
};

type RegistrationScreenProps = {
  navigation: StackNavigationProp<
    AuthenticationStackParamList,
    AuthenticationScreenName.REGISTRATION
  >;
  route: RouteProp<
    AuthenticationStackParamList,
    AuthenticationScreenName.REGISTRATION
  >;
};
type ConfirmRegistrationScreenProps = {
  navigation: StackNavigationProp<
    AuthenticationStackParamList,
    AuthenticationScreenName.CONFIRM_REGISTRATION
  >;
  route: RouteProp<
    AuthenticationStackParamList,
    AuthenticationScreenName.CONFIRM_REGISTRATION
  >;
};
type ForgetPasswordScreenProps = {
  navigation: StackNavigationProp<
    AuthenticationStackParamList,
    AuthenticationScreenName.FORGET_PASSWORD
  >;
  route: RouteProp<
    AuthenticationStackParamList,
    AuthenticationScreenName.FORGET_PASSWORD
  >;
};
