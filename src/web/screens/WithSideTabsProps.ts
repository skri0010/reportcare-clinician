import { ScreenName, RootStackParamList, SideTabsParamList } from "web/screens";
import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { LocalTodo } from "rc_agents/model";

/**
 * Screen props consists of { navigation, route }
 *
 * For nested navigators, it must be combined with nested navigation props
 * - navigation is used for navigation.navigate() type checking
 * - navigated parameters can be accessed via route.params
 *
 * Usage of CompositeNavigationProp allows navigation to RootStack screens
 */
export type WithSideTabsProps = {
  [ScreenName.HOME]: HomeScreenProps;
  [ScreenName.PATIENTS]: PatientScreenProps;
  [ScreenName.CLINICIANS]: ClinicianScreenProps;
  [ScreenName.CHAT]: ChatScreenProps;
  [ScreenName.TODO]: TodoScreenProps;
  [ScreenName.MARIA]: MARIAScreenProps;
  [ScreenName.SETTING]: SETTINGScreenProps;
  [ScreenName.HELP]: HELPScreenProps;
};

// Home
type HomeNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SideTabsParamList, ScreenName.HOME>,
  StackNavigationProp<RootStackParamList>
>;

type HomeScreenProps = {
  navigation: HomeNavigationProps;
  route: RouteProp<SideTabsParamList, ScreenName.HOME>;
};

// Patient
export type PatientNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SideTabsParamList, ScreenName.PATIENTS>,
  StackNavigationProp<RootStackParamList>
>;

type PatientScreenProps = {
  navigation: PatientNavigationProps;
  route: RouteProp<SideTabsParamList, ScreenName.PATIENTS>;
};

// Clinician
type ClinicianNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SideTabsParamList, ScreenName.CLINICIANS>,
  StackNavigationProp<RootStackParamList>
>;

type ClinicianScreenProps = {
  navigation: ClinicianNavigationProps;
  route: RouteProp<SideTabsParamList, ScreenName.CLINICIANS>;
};

// Chat
type ChatNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SideTabsParamList, ScreenName.CHAT>,
  StackNavigationProp<RootStackParamList>
>;

type ChatScreenProps = {
  navigation: ChatNavigationProps;
  route: RouteProp<SideTabsParamList, ScreenName.CHAT>;
};

// Todo
export type TodoNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SideTabsParamList, ScreenName.TODO>,
  StackNavigationProp<RootStackParamList>
>;

type TodoScreenProps = {
  navigation: TodoNavigationProps;
  route: RouteProp<SideTabsParamList, ScreenName.TODO>;
};

// MARIA
type MARIANavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SideTabsParamList, ScreenName.MARIA>,
  StackNavigationProp<RootStackParamList>
>;

type MARIAScreenProps = {
  navigation: MARIANavigationProps;
  route: RouteProp<SideTabsParamList, ScreenName.MARIA>;
};

// SETTING
type SETTINGNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SideTabsParamList, ScreenName.SETTING>,
  StackNavigationProp<RootStackParamList>
>;

type SETTINGScreenProps = {
  navigation: SETTINGNavigationProps;
  route: RouteProp<SideTabsParamList, ScreenName.SETTING>;
};

// HELP
type HELPNavigationProps = CompositeNavigationProp<
  DrawerNavigationProp<SideTabsParamList, ScreenName.HELP>,
  StackNavigationProp<RootStackParamList>
>;

type HELPScreenProps = {
  navigation: HELPNavigationProps;
  route: RouteProp<SideTabsParamList, ScreenName.HELP>;
};
