import { PatientsScreenName, PatientsScreenParamList } from ".";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { PatientsScreenNavigation } from "web/screens/MainScreenProps";

// Navigation and route for patients screen

export type PatientsScreenProps = {
  [PatientsScreenName.OVERVIEW]: OverviewScreenProps;
  [PatientsScreenName.PARAMETERS]: ParameterScreenProps;
  [PatientsScreenName.ICDCRT]: ICDCRTScreenProps;
  [PatientsScreenName.HISTORY]: HistoryScreenProps;
  [PatientsScreenName.INFO]: InfoScreenProps;
};

type OverviewScreenProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      PatientsScreenParamList,
      PatientsScreenName.OVERVIEW
    >,
    PatientsScreenNavigation
  >;
  route: RouteProp<PatientsScreenParamList, PatientsScreenName.OVERVIEW>;
};

type ParameterScreenProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      PatientsScreenParamList,
      PatientsScreenName.PARAMETERS
    >,
    PatientsScreenNavigation
  >;
  route: RouteProp<PatientsScreenParamList, PatientsScreenName.PARAMETERS>;
};

type ICDCRTScreenProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      PatientsScreenParamList,
      PatientsScreenName.ICDCRT
    >,
    PatientsScreenNavigation
  >;
  route: RouteProp<PatientsScreenParamList, PatientsScreenName.ICDCRT>;
};

type HistoryScreenProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      PatientsScreenParamList,
      PatientsScreenName.HISTORY
    >,
    PatientsScreenNavigation
  >;
  route: RouteProp<PatientsScreenParamList, PatientsScreenName.HISTORY>;
};

type InfoScreenProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      PatientsScreenParamList,
      PatientsScreenName.INFO
    >,
    PatientsScreenNavigation
  >;
  route: RouteProp<PatientsScreenParamList, PatientsScreenName.INFO>;
};
