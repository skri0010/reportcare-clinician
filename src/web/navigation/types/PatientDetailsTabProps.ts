import {
  PatientDetailsTabName,
  PatientDetailsTabParamList
} from "web/navigation/index";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { RouteProp, CompositeNavigationProp } from "@react-navigation/native";
import { PatientsScreenNavigation } from "web/navigation/types/MainScreenProps";

// Navigation and route for patient details tabs

export type OverviewTabProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      PatientDetailsTabParamList,
      PatientDetailsTabName.OVERVIEW
    >,
    PatientsScreenNavigation
  >;
  route: RouteProp<PatientDetailsTabParamList, PatientDetailsTabName.OVERVIEW>;
};

export type ParametersTabProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      PatientDetailsTabParamList,
      PatientDetailsTabName.PARAMETERS
    >,
    PatientsScreenNavigation
  >;
  route: RouteProp<
    PatientDetailsTabParamList,
    PatientDetailsTabName.PARAMETERS
  >;
};

export type ICDCRTTabProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      PatientDetailsTabParamList,
      PatientDetailsTabName.ICDCRT
    >,
    PatientsScreenNavigation
  >;
  route: RouteProp<PatientDetailsTabParamList, PatientDetailsTabName.ICDCRT>;
};

export type HistoryTabProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      PatientDetailsTabParamList,
      PatientDetailsTabName.HISTORY
    >,
    PatientsScreenNavigation
  >;
  route: RouteProp<PatientDetailsTabParamList, PatientDetailsTabName.HISTORY>;
};

export type InfoTabProps = {
  navigation: CompositeNavigationProp<
    MaterialTopTabNavigationProp<
      PatientDetailsTabParamList,
      PatientDetailsTabName.INFO
    >,
    PatientsScreenNavigation
  >;
  route: RouteProp<PatientDetailsTabParamList, PatientDetailsTabName.INFO>;
};
