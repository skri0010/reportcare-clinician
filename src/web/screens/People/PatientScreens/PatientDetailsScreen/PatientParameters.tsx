import React, { FC } from "react";
import { Dimensions, View } from "react-native";
import { ms, ScaledSheet } from "react-native-size-matters";
import { ScreenWrapper } from "../../../ScreenWrapper";
import { WeightParameterCard } from "./PatientParameterCards/WeightParameterCard";
import { DiastolicParameterCard } from "./PatientParameterCards/DiastolicParameterCard";
import { OxygenSaturationParameterCard } from "./PatientParameterCards/OxygenSaturationParameterCard";
import { SystolicParameterCard } from "./PatientParameterCards/SystolicParameterCard";
import { PatientDetailsTabProps } from "web/screens";
import { PatientDetails } from "rc_agents/model";

interface PatientParametersProps
  extends PatientDetailsTabProps.ParametersTabProps {
  details: PatientDetails;
}

export const PatientParameters: FC<PatientParametersProps> = ({ details }) => {
  const cardMaxHeight = Math.max(
    ms(200),
    Dimensions.get("window").height * 0.8
  );

  return (
    <ScreenWrapper padding>
      <View style={styles.container}>
        {/* Systolic Blood Graph */}
        <SystolicParameterCard
          patientId={details.patientInfo.patientID}
          maxHeight={cardMaxHeight}
        />
        {/* Diastolic Blood Graph */}
        <DiastolicParameterCard
          patientId={details.patientInfo.patientID}
          maxHeight={cardMaxHeight}
        />
      </View>
      <View style={styles.container}>
        {/* Oxygen Saturation graph */}
        <OxygenSaturationParameterCard
          patientId={details.patientInfo.patientID}
          maxHeight={cardMaxHeight}
        />
        {/* Weight Graph */}
        <WeightParameterCard
          patientId={details.patientInfo.patientID}
          maxHeight={cardMaxHeight}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap"
  }
});
