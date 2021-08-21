import { ScreenName, MainScreenParamList } from "web/screens";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";

/**
 * Screen props consists of { navigation, route }
 *
 * For nested navigators, it must be combined with nested navigation props
 * - navigation is used for navigation.navigate() type checking
 * - navigated parameters can be accessed via route.params
 *
 * Usage of CompositeNavigationProp allows navigation to RootStack screens
 */
export type MainScreenProps = {
  [ScreenName.HOME]: HomeScreenProps;
  [ScreenName.PATIENTS]: PatientScreenProps;
  [ScreenName.CLINICIANS]: ClinicianScreenProps;
  [ScreenName.CHAT]: ChatScreenProps;
  [ScreenName.TODO]: TodoScreenProps;
  [ScreenName.MARIA]: MARIAScreenProps;
  [ScreenName.SETTING]: SettingsScreenProps;
};

// Properties for main screens

type HomeScreenProps = {
  navigation: DrawerNavigationProp<MainScreenParamList, ScreenName.HOME>;
  route: RouteProp<MainScreenParamList, ScreenName.HOME>;
};

type PatientScreenProps = {
  navigation: DrawerNavigationProp<MainScreenParamList, ScreenName.PATIENTS>;
  route: RouteProp<MainScreenParamList, ScreenName.PATIENTS>;
};

type ClinicianScreenProps = {
  navigation: DrawerNavigationProp<MainScreenParamList, ScreenName.CLINICIANS>;
  route: RouteProp<MainScreenParamList, ScreenName.CLINICIANS>;
};

type ChatScreenProps = {
  navigation: DrawerNavigationProp<MainScreenParamList, ScreenName.CHAT>;
  route: RouteProp<MainScreenParamList, ScreenName.CHAT>;
};

type TodoScreenProps = {
  navigation: DrawerNavigationProp<MainScreenParamList, ScreenName.TODO>;
  route: RouteProp<MainScreenParamList, ScreenName.TODO>;
};

type MARIAScreenProps = {
  navigation: DrawerNavigationProp<MainScreenParamList, ScreenName.MARIA>;
  route: RouteProp<MainScreenParamList, ScreenName.MARIA>;
};

type SettingsScreenProps = {
  navigation: DrawerNavigationProp<MainScreenParamList, ScreenName.SETTING>;
  route: RouteProp<MainScreenParamList, ScreenName.SETTING>;
};
