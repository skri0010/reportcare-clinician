import React, { FC, useEffect } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "components/Wrappers/ScreenWrapper";
import { Dimensions, View } from "react-native";
import { PatientAlertHistoryCard } from "./PatientHistoryComponents/PatientAlertHistoryCard";
import { PatientMedicalRecordCard } from "./PatientHistoryComponents/PatientMedicalRecordCard";
import { PatientDetailsTabProps } from "web/navigation/types";
import { AlertInfo, PatientDetails } from "rc_agents/model";
import { AgentTrigger } from "rc_agents/trigger";

interface PatientHistoryProps extends PatientDetailsTabProps.HistoryTabProps {
  details: PatientDetails;
  alertHistoryFunc: {
    setDisplayHistory: (state: AlertInfo) => void;
    setModalAlertVisible: (state: boolean) => void;
  };
  medicalRecordFunc: {
    setAddMedicalRecord: (state: boolean) => void;
  };
}

export const PatientHistory: FC<PatientHistoryProps> = ({
  details,
  alertHistoryFunc,
  medicalRecordFunc
}) => {
  const cardMaxHeight = Math.max(
    ms(250),
    Dimensions.get("window").height * 0.65
  );

  // Trigger the retrieval of alert history
  useEffect(() => {
    AgentTrigger.triggerGetHistoricalAlerts(details.patientInfo.patientID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ScreenWrapper padding>
      <View style={styles.container}>
        {/* Alert Histories */}
        <PatientAlertHistoryCard
          maxHeight={cardMaxHeight}
          setDisplayHistory={alertHistoryFunc.setDisplayHistory}
          setModalAlertVisible={alertHistoryFunc.setModalAlertVisible}
        />
        {/* Medical Histories */}
        <PatientMedicalRecordCard
          medicalRecords={details.medicalRecords}
          maxHeight={cardMaxHeight}
          onAddPress={() => medicalRecordFunc.setAddMedicalRecord(true)}
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
