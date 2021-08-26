import React, { FC } from "react";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "../../../ScreenWrapper";
import { Dimensions, View } from "react-native";
import { PatientAlertHistoryCard } from "./PatientHistoryScreens/PatientAlertHistoryCard";
import { PatientMedicalRecordCard } from "./PatientHistoryScreens/PatientMedicalRecordCard";
import { WithPatientsScreenProps, PatientsScreenName } from "web/screens";

export const PatientHistory: FC<
  WithPatientsScreenProps[PatientsScreenName.HISTORY]
> = ({ route }) => {
  const { patient, alertHistoryFunc, medicalRecordFunc } = route.params;
  const cardMaxHeight = Math.max(
    ms(250),
    Dimensions.get("window").height * 0.65
  );
  // Query history data by patientId here or pass it into component for query

  // useEffect(() => {
  //   AgentTrigger.triggerGetHistoricalAlerts(patient.patientID);
  // });

  return (
    <ScreenWrapper padding>
      <View style={styles.container}>
        {/* Alert Histories */}
        <PatientAlertHistoryCard
          patientId={patient.patientID}
          maxHeight={cardMaxHeight}
          setDisplayHistory={alertHistoryFunc.setDisplayHistory}
          setModalAlertVisible={alertHistoryFunc.setModalAlertVisible}
        />
        {/* Medical Histories */}
        <PatientMedicalRecordCard
          patientId={patient.patientID}
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
