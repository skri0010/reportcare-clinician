import React, { FC } from "react";
import { select, RootState } from "util/useRedux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PatientOverview } from "./PatientDetailsScreen/PatientOverview";
import { PatientParameter } from "./PatientDetailsScreen/PatientParameters";
import { PatientIcdCrt } from "./PatientDetailsScreen/PatientIcdCrt";
import { PatientHistory } from "./PatientDetailsScreen/PatientHistory";
import { PatientInformation } from "./PatientDetailsScreen/PatientInformation";
import { PatientScreenName, PatientTabsParamList } from ".";
import { PatientInfo } from "aws/models";
import i18n from "util/language/i18n";
import { AlertHistory, MedicalRecords } from "mock/mockPatientDetails";

const Tab = createMaterialTopTabNavigator<PatientTabsParamList>();

export interface PatientTabNavigationBarProps {
  patient: PatientInfo;
  setDisplayHistory: (state: AlertHistory) => void;
  setModalAlertVisible: (state: boolean) => void;
  setViewMedicalModal: (state: boolean) => void;
  setDisplayMedicalRecord: (state: MedicalRecords) => void;
  setAddMedicalRecord: (state: boolean) => void;
}

export const PatientTabNavigationBar: FC<PatientTabNavigationBarProps> = ({
  patient,
  setAddMedicalRecord,
  setDisplayHistory,
  setDisplayMedicalRecord,
  setModalAlertVisible,
  setViewMedicalModal
}) => {
  const { colors, fonts } = select((state: RootState) => ({
    colors: state.settings.colors,
    fonts: state.settings.fonts
  }));

  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: fonts.h5Size
        },
        indicatorStyle: {
          backgroundColor: colors.primaryBarColor
        },
        style: {
          backgroundColor: colors.primaryContrastTextColor
        }
      }}
    >
      <Tab.Screen
        name={PatientScreenName.OVERVIEW}
        options={{ title: i18n.t("Patients.Overview") }}
      >
        {(screenProps) => (
          <PatientOverview
            navigation={screenProps.navigation}
            route={screenProps.route}
            patient={patient}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name={PatientScreenName.PARAMETERS}
        options={{ title: i18n.t("Patients.Parameters") }}
      >
        {(screenProps) => (
          <PatientParameter
            navigation={screenProps.navigation}
            route={screenProps.route}
            patient={patient}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name={PatientScreenName.ICDCRT}
        options={{ title: i18n.t("Patients.ICD/CRT") }}
      >
        {(screenProps) => (
          <PatientIcdCrt
            navigation={screenProps.navigation}
            route={screenProps.route}
            patient={patient}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name={PatientScreenName.HISTORY}>
        {(screenProps) => (
          <PatientHistory
            navigation={screenProps.navigation}
            route={screenProps.route}
            patient={patient}
            alertHistoryFunc={{
              setDisplayHistory: setDisplayHistory,
              setModalAlertVisible: setModalAlertVisible
            }}
            medicalRecordFunc={{
              setViewMedicalModal: setViewMedicalModal,
              setDisplayMedicalRecord: setDisplayMedicalRecord,
              setAddMedicalRecord: setAddMedicalRecord
            }}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name={PatientScreenName.INFO}
        options={{ title: i18n.t("Patients.Info") }}
      >
        {(screenProps) => (
          <PatientInformation
            navigation={screenProps.navigation}
            route={screenProps.route}
            patient={patient}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
