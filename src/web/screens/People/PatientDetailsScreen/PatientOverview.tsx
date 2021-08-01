import React, { FC } from "react";
// import { RootState, select } from "util/useRedux";
// import { View, TextStyle, FlatList } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
// import { mockPatientRowDetails } from "mock/mockTodoDetails";
// import { RiskLevel } from "models/RiskLevel";
// import { H3, H4 } from "components/Text/index";
import { ScreenWrapper } from "../../ScreenWrapper";
import { BloodPressureCard } from "./PatientOverviewCards/BloodPressureCard";
import { MedicationTakenCard } from "./PatientOverviewCards/MedicationCard";
import { OxygenSaturationCard } from "./PatientOverviewCards/OxygenSaturationCard";
import { WeightCard } from "./PatientOverviewCards/WeightCard";
import { SymptomsCard } from "./PatientOverviewCards/SymptomsCard";
import { View } from "react-native";
import { PatientParameterProps } from "./PatientHistory";

export const PatientOverview: FC<PatientParameterProps> = () => {
  // Query details for overview here

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BloodPressureCard systolic="23" dystolic="130" />
        <MedicationTakenCard medications={[]} />
        <OxygenSaturationCard oxySatValue="90" />
        <WeightCard weight="60" targetWeight="60" />
        <SymptomsCard symptoms={[]} />
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingBottom: "20@ms"
  }
});
