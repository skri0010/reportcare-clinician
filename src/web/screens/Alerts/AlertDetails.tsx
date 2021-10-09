import React, { FC } from "react";
import { View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { RootState, select } from "util/useRedux";
import {
  LeftVitalSignsCard,
  RightVitalSignsCard
} from "./AlertDetailsCards/VitalSignsCard";
import { SymptomCard } from "./AlertDetailsCards/SymptomCard";
import { SummaryCard } from "./AlertDetailsCards/SummaryCard";
import { PatientBaselinesCard } from "./AlertDetailsCards/PatientBaselinesCard";
import { MedicationCard } from "./AlertDetailsCards/MedicationCard";

export const AlertDetails: FC = () => {
  const { alertInfo } = select((state: RootState) => ({
    alertInfo: state.agents.alertInfo
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
        <MedicationCard medication={alertInfo?.lastMedication} />
      </View>

      {/* Alert vital signs */}
      <View style={styles.rowContainer}>
        {/* Alert vitals */}
        <LeftVitalSignsCard vitalsReport={alertInfo?.vitalsReport} />
        <RightVitalSignsCard vitalsReport={alertInfo?.vitalsReport} />
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
