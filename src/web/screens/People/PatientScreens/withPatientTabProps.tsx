import { PatientScreenName, PatientTabsParamList } from ".";
import { MaterialTopTabNavigationProp } from "@react-navigation/material-top-tabs";
import { RouteProp } from "@react-navigation/native";
import { PatientInfo } from "aws/models";
import { AlertHistory, MedicalRecords } from "mock/mockPatientDetails";

export type WithPatientTabsProps = {
  [PatientScreenName.OVERVIEW]: OverviewScreenProps;
  [PatientScreenName.PARAMETERS]: ParameterScreenProps;
  [PatientScreenName.ICDCRT]: ICDCRTScreenProps;
  [PatientScreenName.HISTORY]: HistoryScreenProps;
  [PatientScreenName.INFO]: InfoScreenProps;
};

// Overview
type OverviewScreenProps = {
  navigation: MaterialTopTabNavigationProp<
    PatientTabsParamList,
    PatientScreenName.OVERVIEW
  >;
  route: RouteProp<PatientTabsParamList, PatientScreenName.OVERVIEW>;
  patient: PatientInfo;
};

// Parameter
type ParameterScreenProps = {
  navigation: MaterialTopTabNavigationProp<
    PatientTabsParamList,
    PatientScreenName.PARAMETERS
  >;
  route: RouteProp<PatientTabsParamList, PatientScreenName.PARAMETERS>;
  patient: PatientInfo;
};
// ICD/CRT
type ICDCRTScreenProps = {
  navigation: MaterialTopTabNavigationProp<
    PatientTabsParamList,
    PatientScreenName.ICDCRT
  >;
  route: RouteProp<PatientTabsParamList, PatientScreenName.ICDCRT>;
  patient: PatientInfo;
};

// History
type HistoryScreenProps = {
  navigation: MaterialTopTabNavigationProp<
    PatientTabsParamList,
    PatientScreenName.HISTORY
  >;
  route: RouteProp<PatientTabsParamList, PatientScreenName.HISTORY>;
  patient: PatientInfo;
  alertHistoryFunc: {
    setDisplayHistory: (state: AlertHistory) => void;
    setModalAlertVisible: (state: boolean) => void;
  };
  medicalRecordFunc: {
    setViewMedicalModal: (state: boolean) => void;
    setDisplayMedicalRecord: (state: MedicalRecords) => void;
    setAddMedicalRecord: (state: boolean) => void;
  };
};
// Info
type InfoScreenProps = {
  navigation: MaterialTopTabNavigationProp<
    PatientTabsParamList,
    PatientScreenName.INFO
  >;
  route: RouteProp<PatientTabsParamList, PatientScreenName.INFO>;
  patient: PatientInfo;
};
