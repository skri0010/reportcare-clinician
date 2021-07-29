import React, { FC } from "react";
import { Dimensions, View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "../../ScreenWrapper";
import { WeightParameterCard } from "./PatientParameterCards/WeightParameterCard";
import { DiastolicParameterCard } from "./PatientParameterCards/DiastolicParameterCard";
import { OxygenSaturationParameterCard } from "./PatientParameterCards/OxygenSaturationParameterCard";
import { SystolicParameterCard } from "./PatientParameterCards/SystolicParameterCard";
import { PatientParameterProps } from "./PatientHistory";

export const PatientParameter: FC<PatientParameterProps> = ({ patient }) => {
  const cardMaxHeight = Math.max(
    ms(200),
    Dimensions.get("window").height * 0.8
  );
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <SystolicParameterCard
          patientId={patient.patientID}
          maxHeight={cardMaxHeight}
        />
        <DiastolicParameterCard
          patientId={patient.patientID}
          maxHeight={cardMaxHeight}
        />
        <OxygenSaturationParameterCard
          patientId={patient.patientID}
          maxHeight={cardMaxHeight}
        />
        <WeightParameterCard
          patientId={patient.patientID}
          maxHeight={cardMaxHeight}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: "20@ms"
  }
});
