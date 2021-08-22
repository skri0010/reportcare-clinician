import React, { FC } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { Dimensions, View } from "react-native";
import { PatientAlertHistoryCard } from "./PatientHistoryComponents/PatientAlertHistoryCard";
import { PatientMedicalRecordCard } from "./PatientHistoryComponents/PatientMedicalRecordCard";
import { AlertHistory, MedicalRecords } from "mock/mockPatientDetails";
import { PatientDetailsTabProps } from "web/navigation/types";
import { PatientInfo } from "aws/API";

interface PatientHistoryProps extends PatientDetailsTabProps.HistoryTabProps {
  info: PatientInfo;
  alertHistoryFunc: {
    setDisplayHistory: (state: AlertHistory) => void;
    setModalAlertVisible: (state: boolean) => void;
  };
  medicalRecordFunc: {
    setViewMedicalModal: (state: boolean) => void;
    setDisplayMedicalRecord: (state: MedicalRecords) => void;
    setAddMedicalRecord: (state: boolean) => void;
  };
}

export const PatientHistory: FC<PatientHistoryProps> = ({
  info,
  alertHistoryFunc,
  medicalRecordFunc
}) => {
  const cardMaxHeight = Math.max(
    ms(250),
    Dimensions.get("window").height * 0.65
  );

  // Query history data by patientId here or pass it into component for query
  return (
    <ScreenWrapper padding>
      <View style={styles.container}>
        {/* Alert Histories */}
        <PatientAlertHistoryCard
          name={info.name}
          patientId={info.patientID}
          maxHeight={cardMaxHeight}
          setDisplayHistory={alertHistoryFunc.setDisplayHistory}
          setModalAlertVisible={alertHistoryFunc.setModalAlertVisible}
        />
        {/* Medical Histories */}
        <PatientMedicalRecordCard
          patientId={info.patientID}
          maxHeight={cardMaxHeight}
          onAddPress={() => medicalRecordFunc.setAddMedicalRecord(true)}
          setViewMedicalModal={medicalRecordFunc.setViewMedicalModal}
          setDisplayMedicalRecord={medicalRecordFunc.setDisplayMedicalRecord}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
