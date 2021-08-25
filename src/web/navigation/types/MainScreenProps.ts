import { MainScreenParamList, ScreenName } from "web/navigation";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";

// Navigation and route props for main screens

export type MainScreenProps = {
  [ScreenName.HOME]: HomeScreenProps;
  [ScreenName.PATIENTS]: PatientScreenProps;
  [ScreenName.CLINICIANS]: ClinicianScreenProps;
  [ScreenName.ALERTS]: AlertScreenProps;
  [ScreenName.TODO]: TodoScreenProps;
  [ScreenName.CHAT]: ChatScreenProps;
  [ScreenName.MARIA]: MARIAScreenProps;
  [ScreenName.SETTINGS]: SettingsScreenProps;
};

type HomeScreenProps = {
  navigation: HomeScreenNavigation;
  route: RouteProp<MainScreenParamList, ScreenName.HOME>;
};

type PatientScreenProps = {
  navigation: PatientsScreenNavigation;
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
  navigation: TodoScreenNavigation;
  route: RouteProp<MainScreenParamList, ScreenName.TODO>;
};

type AlertScreenProps = {
  navigation: DrawerNavigationProp<MainScreenParamList, ScreenName.ALERTS>;
  route: RouteProp<MainScreenParamList, ScreenName.ALERTS>;
};

type MARIAScreenProps = {
  navigation: DrawerNavigationProp<MainScreenParamList, ScreenName.MARIA>;
  route: RouteProp<MainScreenParamList, ScreenName.MARIA>;
};

type SettingsScreenProps = {
  navigation: DrawerNavigationProp<MainScreenParamList, ScreenName.SETTINGS>;
  route: RouteProp<MainScreenParamList, ScreenName.SETTINGS>;
};

// Navigation declared to be used in this module as well as exported to other props

export type HomeScreenNavigation = DrawerNavigationProp<
  MainScreenParamList,
  ScreenName.HOME
>;

export type PatientsScreenNavigation = DrawerNavigationProp<
  MainScreenParamList,
  ScreenName.PATIENTS
>;

export type TodoScreenNavigation = DrawerNavigationProp<
  MainScreenParamList,
  ScreenName.TODO
>;
