import { PatientsScreenName, PatientsScreenParamList } from ".";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { PatientNavigationProps } from "web/screens/WithSideTabsProps";

/**
 * Screen props consists of { navigation, route }
 *
 * For nested navigators, it must be combined with nested navigation props
 * - navigation is used for navigation.navigate() type checking
 * - navigated parameters can be accessed via route.params
 *
 * Usage of CompositeNavigationProp allows navigation to RootStack screens
 */
export type WithPatientsScreenProps = {
  [PatientsScreenName.OVERVIEW]: OverviewScreenProps;
  [PatientsScreenName.PARAMETERS]: ParameterScreenProps;
  [PatientsScreenName.ICDCRT]: ICDCRTScreenProps;
  [PatientsScreenName.HISTORY]: HistoryScreenProps;
  [PatientsScreenName.INFO]: InfoScreenProps;
};

// Overview
type OverviewNavigationProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<
    PatientsScreenParamList,
    PatientsScreenName.OVERVIEW
  >,
  PatientNavigationProps
>;

type OverviewScreenProps = {
  navigation: OverviewNavigationProps;
  route: RouteProp<PatientsScreenParamList, PatientsScreenName.OVERVIEW>;
};

// Parameter
type ParamaterNavigationProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<
    PatientsScreenParamList,
    PatientsScreenName.PARAMETERS
  >,
  PatientNavigationProps
>;

type ParameterScreenProps = {
  navigation: ParamaterNavigationProps;
  route: RouteProp<PatientsScreenParamList, PatientsScreenName.PARAMETERS>;
};

// ICD/CRT
type ICDCRTNavigationProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<
    PatientsScreenParamList,
    PatientsScreenName.ICDCRT
  >,
  PatientNavigationProps
>;

type ICDCRTScreenProps = {
  navigation: ICDCRTNavigationProps;
  route: RouteProp<PatientsScreenParamList, PatientsScreenName.ICDCRT>;
};

// History
type HistoryNavigationProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<
    PatientsScreenParamList,
    PatientsScreenName.HISTORY
  >,
  PatientNavigationProps
>;
type HistoryScreenProps = {
  navigation: HistoryNavigationProps;
  route: RouteProp<PatientsScreenParamList, PatientsScreenName.HISTORY>;
};

// Info
type PatientInfoNavigationProps = CompositeNavigationProp<
  MaterialTopTabNavigationProp<
    PatientsScreenParamList,
    PatientsScreenName.INFO
  >,
  PatientNavigationProps
>;
type InfoScreenProps = {
  navigation: PatientInfoNavigationProps;
  route: RouteProp<PatientsScreenParamList, PatientsScreenName.INFO>;
};
