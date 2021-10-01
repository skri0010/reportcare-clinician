/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from "react";
import { select, RootState } from "util/useRedux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PatientOverview } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientOverview";
import { PatientParameters } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientParameters";
import { PatientICDCRT } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientIcdCrt";
import { PatientHistory } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientHistory";
import { PatientInformation } from "web/screens/Patients/PatientScreens/PatientDetailsScreen/PatientInformation";
import { PatientDetailsTabProps } from "web/navigation/types";
import {
  PatientDetailsTabName,
  PatientDetailsTabParamList
} from "web/navigation";
import i18n from "util/language/i18n";
import { AlertInfo, PatientDetails } from "rc_agents/model";
import { getTopTabBarOptions } from "util/getStyles";
import { IcdCrtRecord, MedicalRecord } from "aws/API";

const Tab = createMaterialTopTabNavigator<PatientDetailsTabParamList>();

export interface PatientDetailsTabNavigatorProps {
  details: PatientDetails;
  selectedTab?: PatientDetailsTabName;
  setDisplayHistory: (state: AlertInfo) => void; // alert history details to be shown
  setModalAlertVisible: (state: boolean) => void; // alert modal visibility
  setAddMedicalRecord: (state: boolean) => void; // add medical record modal visibility
  onViewMedicalRecord: (medicalRecord: MedicalRecord) => void; // when content of medical content is to be shown
  setAddIcdCrtRecord: (state: boolean) => void; // add ICD/CRT record modal visibility
  onViewIcdCrtRecord: (icdCrtRecord: IcdCrtRecord) => void; // when content of ICD/CRT content is to be shown
}

export const PatientDetailsTabNavigator: FC<PatientDetailsTabNavigatorProps> =
  ({
    details,
    selectedTab,
    setDisplayHistory,
    setModalAlertVisible,
    setAddMedicalRecord,
    onViewMedicalRecord,
    setAddIcdCrtRecord,
    onViewIcdCrtRecord
  }) => {
    const { colors, fonts } = select((state: RootState) => ({
      colors: state.settings.colors,
      fonts: state.settings.fonts
    }));

    // Type check params list. Required because initialParams is insufficient due to Partial<>
    // Remove eslint check if needed
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const initialParamsList: PatientDetailsTabParamList = {
      [PatientDetailsTabName.OVERVIEW]: undefined,
      [PatientDetailsTabName.PARAMETERS]: undefined,
      [PatientDetailsTabName.ICDCRT]: undefined,
      [PatientDetailsTabName.HISTORY]: undefined,
      [PatientDetailsTabName.INFO]: undefined
    };

    return (
      <Tab.Navigator
        screenOptions={getTopTabBarOptions({ colors: colors, fonts: fonts })}
        initialRouteName={selectedTab || PatientDetailsTabName.OVERVIEW}
      >
        <Tab.Screen
          name={PatientDetailsTabName.OVERVIEW}
          options={{ title: i18n.t("Patients.Overview") }}
        >
          {(props) => <PatientOverview {...props} details={details} />}
        </Tab.Screen>
        <Tab.Screen
          name={PatientDetailsTabName.PARAMETERS}
          options={{ title: i18n.t("Patients.Parameters") }}
        >
          {(props) => <PatientParameters {...props} details={details} />}
        </Tab.Screen>
        <Tab.Screen
          name={PatientDetailsTabName.ICDCRT}
          options={{ title: i18n.t("Patients.ICD/CRT") }}
        >
          {(props) => (
            <PatientICDCRT
              {...props}
              details={details}
              setAddIcdCrtRecord={setAddIcdCrtRecord}
              onViewIcdCrtRecord={onViewIcdCrtRecord}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name={PatientDetailsTabName.HISTORY}
          options={{ title: i18n.t("Patients.History") }}
        >
          {(props) => (
            <PatientHistory
              {...props}
              info={details.patientInfo}
              alertHistoryFunc={{
                setDisplayHistory: setDisplayHistory,
                setModalAlertVisible: setModalAlertVisible
              }}
              medicalRecordFunc={{
                setAddMedicalRecord: setAddMedicalRecord,
                onViewMedicalRecord: onViewMedicalRecord
              }}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name={PatientDetailsTabName.INFO}
          options={{ title: i18n.t("Patients.Info") }}
        >
          {(props: PatientDetailsTabProps.InfoTabProps) => (
            <PatientInformation {...props} info={details.patientInfo} />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    );
  };
