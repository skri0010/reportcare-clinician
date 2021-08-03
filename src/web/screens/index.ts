import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorScreenParams } from "@react-navigation/native";

export enum ScreenName {
  MAIN = "Main",
  HOME = "Home",
  PATIENT = "Patients",
  CLINICIAN = "Clinicians",
  CHAT = "Chat",
  TODO = "Todo",
  MARIA = "MARIA",
  SETTING = "SETTING",
  HELP = "HELP"
}

/**
 * Reference: https://reactnavigation.org/docs/typescript/
 *
 * NavigatorScreenParams allows us to use navigator.navigate(
 *  ScreenName, {
 *    screen: [Nested stack screen],
 *    params: { [Parameters of that nested stack screen] }
 *  }
 * )
 */
export type RootStackParamList = {
  [ScreenName.MAIN]: NavigatorScreenParams<SideTabsParamList>;
};

export type SideTabsParamList = {
  // Extract the params from the screen containing the nested navigator
  [ScreenName.HOME]: undefined;
  [ScreenName.PATIENT]: undefined;
  [ScreenName.CLINICIAN]: undefined;
  [ScreenName.CHAT]: undefined;
  [ScreenName.TODO]: undefined;
  [ScreenName.MARIA]: undefined;
  [ScreenName.SETTING]: undefined;
  [ScreenName.HELP]: undefined;
};

// Type checking for main screens (navigation and route)
export type MainScreenProps = StackScreenProps<
  RootStackParamList,
  ScreenName.MAIN
>;

// Type checking for bottom tabs (navigation and route)
export type { WithSideTabsProps } from "web/screens/WithSideTabProps";

export type TodoStackParamList = {
  ViewTodo: {
    mainTitleContent: string;
    patientContent: string;
    notesContent: string;
    createdTimeDate: string;
    modifiedTimeDate: string;
  };
  EditTodo: {
    mainTitleContent: string;
    patientContent: string;
    notesContent: string;
    createdTimeDate: string;
    modifiedTimeDate: string;
  };
  AddTodo: undefined;
};
