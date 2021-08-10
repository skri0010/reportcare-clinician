export enum PatientScreenName {
  OVERVIEW = "Overview",
  PARAMETERS = "Parameters",
  ICDCRT = "ICD/CRT",
  HISTORY = "History",
  INFO = "Info"
}

// export type RootPatientParamList = {
//   [PatientScreenName.MAIN]: NavigatorScreenParams<PatientTabsParamList>;
// };

export type PatientTabsParamList = {
  [PatientScreenName.OVERVIEW]: undefined;
  [PatientScreenName.PARAMETERS]: undefined;
  [PatientScreenName.ICDCRT]: undefined;
  [PatientScreenName.HISTORY]: undefined;
  [PatientScreenName.INFO]: undefined;
};

export type { WithPatientTabsProps } from "web/screens/People/PatientScreens/withPatientTabProps";
