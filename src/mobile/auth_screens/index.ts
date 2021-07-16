export enum AuthScreenName {
  SIGN_IN = "SignIn",
  REGISTER = "Register",
  CONFIRM_REGISTER = "ConfirmRegister",
  FORGOT_PW = "ForgotPassword"
}

export type AuthStackParamList = {
  [AuthScreenName.SIGN_IN]: undefined;
  [AuthScreenName.REGISTER]: undefined;
  [AuthScreenName.CONFIRM_REGISTER]: {
    name: string;
    hospitalName: string;
    role: string;
  };
  [AuthScreenName.FORGOT_PW]: undefined;
};

export type { AuthScreensProps } from "./AuthScreensProps";
