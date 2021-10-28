import React, { FC } from "react";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import { VitalSignsCard } from "./AlertDetailsCards/VitalSignsCard";
import { SymptomCard } from "./AlertDetailsCards/SymptomCard";
import { SummaryCard } from "./AlertDetailsCards/SummaryCard";
import { PatientBaselinesCard } from "./AlertDetailsCards/PatientBaselinesCard";
import { MedicationCard } from "./AlertDetailsCards/MedicationCard";

export const AlertDetails: FC = () => {
  const { alertInfo } = select((state: RootState) => ({
    alertInfo: state.alerts.alertInfo
  }));

  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        {/* Alert summary */}
        <SummaryCard alertInfo={alertInfo} />
        {/* Patient baselines */}
        <PatientBaselinesCard alertInfo={alertInfo} />
      </View>

      <View style={styles.rowContainer}>
        {/* Alert symptom */}
        <SymptomCard symptomReport={alertInfo?.symptomReport} />
        {/* Medication */}
        <MedicationCard medication={alertInfo?.medicineInfoList} />
      </View>

      {/* Alert vital signs */}
      <View style={styles.rowContainer}>
        {/* Alert vitals */}
        <VitalSignsCard vitalsReport={alertInfo?.vitalsReport} />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: { flexDirection: "column", paddingBottom: ms(20) },
  rowContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
