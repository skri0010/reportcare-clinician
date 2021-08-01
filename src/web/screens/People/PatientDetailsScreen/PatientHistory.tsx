import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import { ScreenWrapper } from "../../ScreenWrapper";
import { Dimensions } from "react-native";
import { PatientAlertHistoryCard } from "./PatientHistoryScreens/PatientAlertHistoryCard";
import { PatientMedicalRecordCard } from "./PatientHistoryScreens/PatientMedicalRecordCard";
import { PatientInfo } from "aws/models";
import { AlertHistory, MedicalRecords } from "mock/mockPatientDetails";

export interface PatientParameterProps {
  patient: PatientInfo;
}

interface PatientHistoryProps {
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
  // setDisplayHistory: (state: AlertHistory) => void;
  // setModalAlertVisible: (state: boolean) => void;

  // setViewMedicalModal: (state: boolean) => void;
  // setDisplayMedicalRecord: (state: MedicalRecords) => void;
  // setAddMedicalRecord: (state: boolean) => void;
}

export const PatientHistory: FC<PatientHistoryProps> = ({
  patient,
  alertHistoryFunc,
  medicalRecordFunc
  // setDisplayHistory,
  // setModalAlertVisible,
  // setViewMedicalModal,
  // setDisplayMedicalRecord,
  // setAddMedicalRecord
}) => {
  const cardMaxHeight = Math.max(
    ms(250),
    Dimensions.get("window").height * 0.5
  );
  // Query history data by patientId here or pass it into component for query

  return (
    <ScreenWrapper>
      <PatientAlertHistoryCard
        name={patient.name}
        patientId={patient.patientID}
        maxHeight={cardMaxHeight}
        setDisplayHistory={alertHistoryFunc.setDisplayHistory}
        setModalAlertVisible={alertHistoryFunc.setModalAlertVisible}
      />
      <PatientMedicalRecordCard
        patientId={patient.patientID}
        maxHeight={cardMaxHeight}
        onAddPress={() => medicalRecordFunc.setAddMedicalRecord(true)}
        setViewMedicalModal={medicalRecordFunc.setViewMedicalModal}
        setDisplayMedicalRecord={medicalRecordFunc.setDisplayMedicalRecord}
      />
    </ScreenWrapper>
  );
};
