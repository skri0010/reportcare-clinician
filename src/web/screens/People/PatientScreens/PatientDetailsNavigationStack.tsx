import React, { FC } from "react";
import { select, RootState } from "util/useRedux";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { PatientOverview } from "./PatientDetailsScreen/PatientOverview";
import { PatientParameter } from "./PatientDetailsScreen/PatientParameters";
import { PatientICDCRT } from "./PatientDetailsScreen/PatientIcdCrt";
import { PatientHistory } from "./PatientDetailsScreen/PatientHistory";
import { PatientInformation } from "./PatientDetailsScreen/PatientInformation";
import { PatientsScreenName, PatientsScreenParamList } from "web/screens";
import { PatientInfo } from "aws/API";
import i18n from "util/language/i18n";
import { MedicalRecords } from "mock/mockPatientDetails";
import { AlertInfo } from "rc_agents/model";

const Tab = createMaterialTopTabNavigator<PatientsScreenParamList>();

export interface PatientDetailsNavigationStackProps {
  patient: PatientInfo;
  setDisplayHistory: (state: AlertInfo) => void; // alert history details to be shown
  setModalAlertVisible: (state: boolean) => void; // alert modal visibility
  setViewMedicalModal: (state: boolean) => void; // medical record modal visibility
  setDisplayMedicalRecord: (state: MedicalRecords) => void; // medical record details to be shown
  setAddMedicalRecord: (state: boolean) => void; // add medical record modal visibility
}

export const PatientDetailsNavigationStack: FC<PatientDetailsNavigationStackProps> =
  ({
    patient,
    setDisplayHistory,
    setModalAlertVisible,
    setViewMedicalModal,
    setDisplayMedicalRecord,
    setAddMedicalRecord
  }) => {
    const { colors, fonts } = select((state: RootState) => ({
      colors: state.settings.colors,
      fonts: state.settings.fonts
    }));

    return (
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: {
            fontSize: fonts.h6Size
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
          name={PatientsScreenName.OVERVIEW}
          options={{ title: i18n.t("Patients.Overview") }}
          component={PatientOverview}
          initialParams={{ patient: patient }}
        />
        <Tab.Screen
          name={PatientsScreenName.PARAMETERS}
          options={{ title: i18n.t("Patients.Parameters") }}
          component={PatientParameter}
          initialParams={{ patient: patient }}
        />
        <Tab.Screen
          name={PatientsScreenName.ICDCRT}
          options={{ title: i18n.t("Patients.ICD/CRT") }}
          component={PatientICDCRT}
          initialParams={{ patient: patient }}
        />
        <Tab.Screen
          name={PatientsScreenName.HISTORY}
          options={{ title: i18n.t("Patients.History") }}
          component={PatientHistory}
          initialParams={{
            patient: patient,
            alertHistoryFunc: {
              setDisplayHistory: setDisplayHistory,
              setModalAlertVisible: setModalAlertVisible
            },
            medicalRecordFunc: {
              setViewMedicalModal: setViewMedicalModal,
              setDisplayMedicalRecord: setDisplayMedicalRecord,
              setAddMedicalRecord: setAddMedicalRecord
            }
          }}
        />
        <Tab.Screen
          name={PatientsScreenName.INFO}
          options={{ title: i18n.t("Patients.Info") }}
          component={PatientInformation}
          initialParams={{ patient: patient }}
        />
      </Tab.Navigator>
    );
  };
