import React, { FC } from "react";
import { ms } from "react-native-size-matters";
import { ScreenWrapper } from "../../ScreenWrapper";
import { Dimensions } from "react-native";
import { PatientAlertHistoryCard } from "./PatientHistoryScreens/PatientAlertHistoryCard";
import { PatientMedicalRecordCard } from "./PatientHistoryScreens/PatientMedicalRecordCard";
import { PatientInfo } from "aws/models";

export interface PatientParameterProps {
  patient: PatientInfo;
}

export const PatientHistory: FC<PatientParameterProps> = ({ patient }) => {
  const cardMaxHeight = Math.max(
    ms(250),
    Dimensions.get("window").height * 0.5
  );
  // Query history data by patientId here or pass it into component for query

  return (
    <ScreenWrapper>
      <PatientAlertHistoryCard
        patientId={patient.patientID}
        maxHeight={cardMaxHeight}
      />
      <PatientMedicalRecordCard
        patientId={patient.patientID}
        maxHeight={cardMaxHeight}
        onAddPress={() => null}
      />
    </ScreenWrapper>
  );
};
