import React, { FC, useEffect } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "web/screens/ScreenWrapper";
import { Dimensions, View } from "react-native";
import { PatientAlertHistoryCard } from "./PatientHistoryComponents/PatientAlertHistoryCard";
import { PatientMedicalRecordCard } from "./PatientHistoryComponents/PatientMedicalRecordCard";
import { PatientDetailsTabProps } from "web/navigation/types";
import { MedicalRecord, PatientInfo } from "aws/API";
import { AlertInfo } from "rc_agents/model";
import { AgentTrigger } from "rc_agents/trigger";

interface PatientHistoryProps extends PatientDetailsTabProps.HistoryTabProps {
  info: PatientInfo;
  alertHistoryFunc: {
    setDisplayHistory: (state: AlertInfo) => void;
    setModalAlertVisible: (state: boolean) => void;
  };
  medicalRecordFunc: {
    setAddMedicalRecord: (state: boolean) => void;
    onViewMedicalRecord: (medicalRecord: MedicalRecord) => void;
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

  // Trigger the retrieval of alert history and medical records
  useEffect(() => {
    AgentTrigger.triggerRetrieveMedicalRecords(info.patientID);
    AgentTrigger.triggerGetHistoricalAlerts(info.patientID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScreenWrapper padding>
      <View style={styles.container}>
        {/* Alert Histories */}
        <PatientAlertHistoryCard
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
          onViewMedicalRecord={medicalRecordFunc.onViewMedicalRecord}
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
