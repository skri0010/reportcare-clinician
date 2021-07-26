import { AuthScreenName, AuthStackParamList } from "mobile/auth_screens";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type AuthScreensProps = {
  [AuthScreenName.SIGN_IN]: SignInScreenProps;
  [AuthScreenName.REGISTER]: RegisterScreenProps;
  [AuthScreenName.CONFIRM_REGISTER]: ConfirmRegisterScreenProps;
  [AuthScreenName.FORGOT_PW]: ForgotPwScreenProps;
};

// SignIn
type SignInScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, AuthScreenName.SIGN_IN>;
  route: RouteProp<AuthStackParamList, AuthScreenName.SIGN_IN>;
  setAuthState: (state: string) => void;
};

// Register
type RegisterScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, AuthScreenName.REGISTER>;
  route: RouteProp<AuthStackParamList, AuthScreenName.REGISTER>;
};

// ConfirmRegistration
type ConfirmRegisterScreenProps = {
  navigation: StackNavigationProp<
    AuthStackParamList,
    AuthScreenName.CONFIRM_REGISTER
  >;
  route: RouteProp<AuthStackParamList, AuthScreenName.CONFIRM_REGISTER>;
};

// ForgotPassword
type ForgotPwScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, AuthScreenName.FORGOT_PW>;
  route: RouteProp<AuthStackParamList, AuthScreenName.FORGOT_PW>;
};
