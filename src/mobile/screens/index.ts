import { StackScreenProps } from "@react-navigation/stack";
import { NavigatorScreenParams } from "@react-navigation/native";

export enum ScreenName {
  MAIN = "Main",
  HOME = "Home",
  PEOPLE = "People",
  CHAT = "Chat",
  TODO = "Todo",
  MARIA = "MARIA"
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
  [ScreenName.MAIN]: NavigatorScreenParams<BottomTabsParamList>;
};

export type BottomTabsParamList = {
  // Extract the params from the screen containing the nested navigator
  [ScreenName.HOME]: undefined;
  [ScreenName.PEOPLE]: undefined;
  [ScreenName.CHAT]: undefined;
  [ScreenName.TODO]: undefined;
  [ScreenName.MARIA]: undefined;
};

// Type checking for main screens (navigation and route)
export type MainScreenProps = StackScreenProps<
  RootStackParamList,
  ScreenName.MAIN
>;

// Type checking for bottom tabs (navigation and route)
export type { WithBottomTabsProps } from "mobile/screens/WithBottomTabProps";
