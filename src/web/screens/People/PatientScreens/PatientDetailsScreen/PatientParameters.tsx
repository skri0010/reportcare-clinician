import React, { FC } from "react";
import { Dimensions, View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "../../../ScreenWrapper";
import { WeightParameterCard } from "./PatientParameterCards/WeightParameterCard";
import { DiastolicParameterCard } from "./PatientParameterCards/DiastolicParameterCard";
import { OxygenSaturationParameterCard } from "./PatientParameterCards/OxygenSaturationParameterCard";
import { SystolicParameterCard } from "./PatientParameterCards/SystolicParameterCard";
import { WithPatientsScreenProps, PatientsScreenName } from "web/screens";

export const PatientParameter: FC<
  WithPatientsScreenProps[PatientsScreenName.PARAMETERS]
> = ({ route }) => {
  const { patient } = route.params;
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
      </View>
      <View style={styles.container}>
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
    marginBottom: "10@ms",
    paddingHorizontal: "10@ms"
  }
});
