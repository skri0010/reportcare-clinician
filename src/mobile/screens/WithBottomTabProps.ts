import {
  ScreenName,
  RootStackParamList,
  BottomTabsParamList
} from "mobile/screens";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";

/**
 * Screen props consists of { navigation, route }
 *
 * For nested navigators, it must be combined with nested navigation props
 * - navigation is used for navigation.navigate() type checking
 * - navigated parameters can be accessed via route.params
 *
 * Usage of CompositeNavigationProp allows navigation to RootStack screens
 */
export type WithBottomTabsProps = {
  [ScreenName.HOME]: HomeScreenProps;
  [ScreenName.PEOPLE]: PeopleScreenProps;
  [ScreenName.CHAT]: ChatScreenProps;
  [ScreenName.TODO]: TodoScreenProps;
  [ScreenName.MARIA]: MARIAScreenProps;
};

// Home
type HomeNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsParamList, ScreenName.HOME>,
  StackNavigationProp<RootStackParamList>
>;

type HomeScreenProps = {
  navigation: HomeNavigationProps;
  route: RouteProp<BottomTabsParamList, ScreenName.HOME>;
};

// People
type PeopleNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsParamList, ScreenName.PEOPLE>,
  StackNavigationProp<RootStackParamList>
>;

type PeopleScreenProps = {
  navigation: PeopleNavigationProps;
  route: RouteProp<BottomTabsParamList, ScreenName.PEOPLE>;
};

// Chat
type ChatNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsParamList, ScreenName.CHAT>,
  StackNavigationProp<RootStackParamList>
>;

type ChatScreenProps = {
  navigation: ChatNavigationProps;
  route: RouteProp<BottomTabsParamList, ScreenName.CHAT>;
};

// Todo
type TodoNavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsParamList, ScreenName.TODO>,
  StackNavigationProp<RootStackParamList>
>;

type TodoScreenProps = {
  navigation: TodoNavigationProps;
  route: RouteProp<BottomTabsParamList, ScreenName.TODO>;
};

// MARIA
type MARIANavigationProps = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabsParamList, ScreenName.MARIA>,
  StackNavigationProp<RootStackParamList>
>;

type MARIAScreenProps = {
  navigation: MARIANavigationProps;
  route: RouteProp<BottomTabsParamList, ScreenName.MARIA>;
};
